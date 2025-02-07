<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// テーマのセットアップ
function planningjoy_setup() {
    // タイトルタグのサポート
    add_theme_support( 'title-tag' );
    
    // アイキャッチ画像のサポート
    add_theme_support( 'post-thumbnails' );
    
    // HTML5マークアップのサポート
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ) );

    // メニューの登録
    register_nav_menus( array(
        'primary' => 'メインメニュー',
    ) );
}
add_action( 'after_setup_theme', 'planningjoy_setup' );

// スタイルシートとスクリプトの読み込み
function planningjoy_scripts() {
    // Tailwind CSS
    wp_enqueue_style( 'tailwindcss', get_template_directory_uri() . '/dist/output.css', array(), '1.0.0' );
    
    // テーマのスタイル
    wp_enqueue_style( 'planningjoy-style', get_stylesheet_uri(), array(), '1.0.0' );
    
    // JavaScript
    wp_enqueue_script( 'planningjoy-script', get_template_directory_uri() . '/js/script.js', array(), '1.0.0', true );
}
add_action( 'wp_enqueue_scripts', 'planningjoy_scripts' );

// ショートコードの登録
function company_info_shortcode( $atts, $content = null ) {
    ob_start();
    get_template_part( 'template-parts/company-profile' );
    return ob_get_clean();
}
add_shortcode( 'company_info', 'company_info_shortcode' );