
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
    wp_enqueue_style('planningjoy-style', get_stylesheet_uri());
    wp_enqueue_script('planningjoy-script', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'planningjoy_scripts');
