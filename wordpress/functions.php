
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
}
add_action('after_setup_theme', 'planningjoy_setup');

function planningjoy_enqueue_assets() {
    // スタイルシートの読み込み
    wp_enqueue_style('planningjoy-style', get_stylesheet_uri());
    wp_enqueue_style('planningjoy-main', get_template_directory_uri() . '/assets/css/style.css');
    
    // JavaScriptの読み込み
    wp_enqueue_script('planningjoy-main', get_template_directory_uri() . '/assets/js/main.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'planningjoy_enqueue_assets');

// 画像ディレクトリのURL取得用関数
function get_theme_image_url($image) {
    return get_template_directory_uri() . '/assets/images/' . $image;
}
