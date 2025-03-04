
<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Helper function to get image URL from theme directory
 */
function get_theme_image_url($image) {
    return get_template_directory_uri() . '/assets/images/' . $image;
}

/**
 * Allow TailwindCSS classes in WordPress content
 */
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

/**
 * Enable enhanced error handling in debug mode
 */
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
