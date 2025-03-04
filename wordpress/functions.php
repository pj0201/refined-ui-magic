
<?php
if (!defined('ABSPATH')) {
    exit;
}

function planningjoy_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // ナビゲーションメニューの登録
    register_nav_menus(array(
        'primary' => 'メインメニュー',
    ));
}
add_action('after_setup_theme', 'planningjoy_setup');

// バージョン管理改善のためのヘルパー関数
function planningjoy_file_version($file_path) {
    $full_path = get_template_directory() . $file_path;
    $default_version = wp_get_theme()->get('Version') . '.' . time();
    
    if (!file_exists($full_path)) {
        error_log("File not found for versioning: {$full_path}");
        return $default_version;
    }
    
    try {
        return filemtime($full_path);
    } catch (Exception $e) {
        error_log("Error getting file modification time: " . $e->getMessage());
        return $default_version;
    }
}

// キャッシュバスティングのためのカスタムバージョン生成
function planningjoy_cache_buster() {
    $theme_version = wp_get_theme()->get('Version');
    if (defined('WP_DEBUG') && WP_DEBUG) {
        return $theme_version . '.' . time();
    }
    return $theme_version;
}

function planningjoy_scripts() {
    // メインのスタイルシート
    wp_enqueue_style(
        'planningjoy-style', 
        get_stylesheet_uri(), 
        array(), 
        planningjoy_cache_buster()
    );
    
    // ReactアプリのCSS - より堅牢なバージョン管理
    $css_path = '/assets/dist/css/style.css';
    if (file_exists(get_template_directory() . $css_path)) {
        $css_version = planningjoy_file_version($css_path);
        wp_enqueue_style(
            'planningjoy-react', 
            get_template_directory_uri() . $css_path, 
            array(), 
            $css_version
        );
    } else {
        error_log("React CSS file not found: {$css_path}");
    }
    
    // カスタムCSS（上書き用）
    $custom_css_path = '/assets/css/style.css';
    if (file_exists(get_template_directory() . $custom_css_path)) {
        $custom_css_version = planningjoy_file_version($custom_css_path);
        wp_enqueue_style(
            'planningjoy-custom', 
            get_template_directory_uri() . $custom_css_path, 
            array(), 
            $custom_css_version
        );
    }
    
    // ReactアプリのJS - より堅牢なバージョン管理とエラーハンドリング
    $js_path = '/assets/dist/js/main.js';
    if (file_exists(get_template_directory() . $js_path)) {
        $js_version = planningjoy_file_version($js_path);
        wp_enqueue_script(
            'planningjoy-react', 
            get_template_directory_uri() . $js_path, 
            array(), 
            $js_version, 
            true
        );
        
        // WordPressデータをJavaScriptに渡す
        wp_localize_script('planningjoy-react', 'planningJoyData', array(
            'ajaxUrl' => admin_url('admin-ajax.php'),
            'homeUrl' => home_url(),
            'isHome' => is_front_page() || is_home(),
            'version' => $js_version,
            'nonce' => wp_create_nonce('planningjoy-nonce'),
            'timestamp' => time(),
            'environment' => wp_get_environment_type(),
            'debug' => defined('WP_DEBUG') && WP_DEBUG
        ));
    } else {
        error_log("React JS file not found: {$js_path}");
    }
    
    // カスタムJavaScript - エラーハンドリング改善
    $custom_js_path = '/assets/js/main.js';
    if (file_exists(get_template_directory() . $custom_js_path)) {
        $custom_js_version = planningjoy_file_version($custom_js_path);
        wp_enqueue_script(
            'planningjoy-main', 
            get_template_directory_uri() . $custom_js_path, 
            array('planningjoy-react'), 
            $custom_js_version, 
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'planningjoy_scripts');

// 画像URLを取得するためのヘルパー関数
function get_theme_image_url($image) {
    return get_template_directory_uri() . '/assets/images/' . $image;
}

// TailwindCSSのクラスを許可
function planningjoy_allow_tailwind_classes($kses_allowed_protocols) {
    global $allowedposttags;
    
    $tailwind_attrs = array(
        'class' => true,
        'style' => true,
    );
    
    foreach($allowedposttags as $tag => &$attrs) {
        $attrs = array_merge($attrs, $tailwind_attrs);
    }
    
    return $kses_allowed_protocols;
}
add_filter('kses_allowed_protocols', 'planningjoy_allow_tailwind_classes');

// エラーハンドリングを強化
function planningjoy_error_handling() {
    if (!WP_DEBUG) {
        return;
    }
    
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    
    // エラーログの有効化
    @ini_set('log_errors', 1);
    @ini_set('error_log', WP_CONTENT_DIR . '/debug.log');
}
add_action('after_setup_theme', 'planningjoy_error_handling');

// React アプリケーションとの互換性を確保するためのカスタム REST API エンドポイント
function planningjoy_register_rest_routes() {
    register_rest_route('planningjoy/v1', '/config', array(
        'methods' => 'GET',
        'callback' => function() {
            return array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'homeUrl' => home_url(),
                'isHome' => is_front_page() || is_home(),
                'themePath' => get_template_directory_uri(),
                'version' => planningjoy_cache_buster(),
                'nonce' => wp_create_nonce('planningjoy-nonce'),
                'timestamp' => time(),
            );
        },
        'permission_callback' => '__return_true',
    ));
    
    // アセットバージョンを取得するためのエンドポイント
    register_rest_route('planningjoy/v1', '/asset-versions', array(
        'methods' => 'GET',
        'callback' => function() {
            return array(
                'js' => planningjoy_file_version('/assets/dist/index.js'),
                'css' => planningjoy_file_version('/assets/dist/style.css'),
                'timestamp' => time(),
            );
        },
        'permission_callback' => '__return_true',
    ));
}
add_action('rest_api_init', 'planningjoy_register_rest_routes');

// ビルドバージョンを自動更新するためのアクション
function planningjoy_update_theme_version() {
    set_theme_mod('planningjoy_theme_version', time() . '.' . rand(100, 999));
}
add_action('after_switch_theme', 'planningjoy_update_theme_version');
add_action('customize_save_after', 'planningjoy_update_theme_version');
