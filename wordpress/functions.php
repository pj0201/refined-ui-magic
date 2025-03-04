
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
    wp_enqueue_style('planningjoy-react', get_template_directory_uri() . '/assets/dist/style.css');
    
    // カスタムCSS（上書き用）
    wp_enqueue_style('planningjoy-custom', get_template_directory_uri() . '/assets/css/style.css');
    
    // ReactアプリのJS
    wp_enqueue_script('planningjoy-react', get_template_directory_uri() . '/assets/dist/index.js', array(), '1.0.0', true);
    
    // カスタムJavaScript
    wp_enqueue_script('planningjoy-main', get_template_directory_uri() . '/assets/js/main.js', array('planningjoy-react'), '1.0.0', true);
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
