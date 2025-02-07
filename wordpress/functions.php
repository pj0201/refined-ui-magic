<?php
// テーマのセットアップ
function planningjoy_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    
    // メニューの登録
    register_nav_menus(array(
        'primary' => 'メインメニュー',
    ));
}
add_action('after_setup_theme', 'planningjoy_setup');

// スタイルシートとスクリプトの読み込み
function planningjoy_scripts() {
    // Tailwind CSS
    wp_enqueue_style('tailwindcss', get_template_directory_uri() . '/dist/output.css');
    
    // テーマのスタイル
    wp_enqueue_style('planningjoy-style', get_stylesheet_uri());
    
    // JavaScript
    wp_enqueue_script('planningjoy-script', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'planningjoy_scripts');

// ショートコードの登録
function company_info_shortcode($atts, $content = null) {
    ob_start();
    get_template_part('template-parts/company-profile');
    return ob_get_clean();
}
add_shortcode('company_info', 'company_info_shortcode');