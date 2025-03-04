
<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Helper function for generating file versions based on modified time
 */
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

/**
 * Generate version string for cache busting
 */
function planningjoy_cache_buster() {
    $theme_version = wp_get_theme()->get('Version');
    if (defined('WP_DEBUG') && WP_DEBUG) {
        return $theme_version . '.' . time();
    }
    return $theme_version;
}

/**
 * Enqueue scripts and styles for the theme
 */
function planningjoy_scripts() {
    // Lovable互換スクリプトを優先読み込み
    wp_enqueue_script(
        'lovable-compat',
        'https://cdn.gpteng.co/gptengineer.js',
        array(),
        null,
        false
    );
    
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

/**
 * Update theme version automatically
 */
function planningjoy_update_theme_version() {
    set_theme_mod('planningjoy_theme_version', time() . '.' . rand(100, 999));
}
add_action('after_switch_theme', 'planningjoy_update_theme_version');
add_action('customize_save_after', 'planningjoy_update_theme_version');
