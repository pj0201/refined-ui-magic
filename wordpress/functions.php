
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

function planningjoy_scripts() {
    // メインのスタイルシート
    wp_enqueue_style('planningjoy-style', get_stylesheet_uri());
    
    // ReactアプリのCSS
    wp_enqueue_style('planningjoy-react', get_template_directory_uri() . '/assets/dist/style.css', array(), filemtime(get_template_directory() . '/assets/dist/style.css'));
    
    // カスタムCSS（上書き用）
    wp_enqueue_style('planningjoy-custom', get_template_directory_uri() . '/assets/css/style.css', array(), filemtime(get_template_directory() . '/assets/css/style.css'));
    
    // ReactアプリのJS - キャッシュ対策としてファイルの更新時間をバージョンに使用
    wp_enqueue_script('planningjoy-react', get_template_directory_uri() . '/assets/dist/index.js', array(), filemtime(get_template_directory() . '/assets/dist/index.js'), true);
    
    // カスタムJavaScript
    wp_enqueue_script('planningjoy-main', get_template_directory_uri() . '/assets/js/main.js', array('planningjoy-react'), filemtime(get_template_directory() . '/assets/js/main.js'), true);
    
    // ページ情報をJavaScriptに渡す
    wp_localize_script('planningjoy-react', 'planningJoyData', array(
        'ajaxUrl' => admin_url('admin-ajax.php'),
        'homeUrl' => home_url(),
        'isHome' => is_front_page() || is_home(),
    ));
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

// キャッシュクリア用のバージョン番号
function planningjoy_resource_version() {
    return '1.0.' . wp_rand(1, 1000);
}

// エラーハンドリング - 開発環境でのみエラーを表示
function planningjoy_error_handling() {
    if (!WP_DEBUG) {
        return;
    }
    
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
}
add_action('after_setup_theme', 'planningjoy_error_handling');
