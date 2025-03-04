
<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register custom REST API endpoints for the React application
 */
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
