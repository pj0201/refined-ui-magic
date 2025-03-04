
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
    <!-- React Application Integration -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script>
        // React アプリケーションのためのグローバル設定 - バージョン管理を改善
        window.planningJoyConfig = {
            wpContent: <?php echo json_encode(array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'homeUrl' => home_url(),
                'isHome' => is_front_page() || is_home(),
                'themePath' => get_template_directory_uri(),
                'nonce' => wp_create_nonce('planningjoy-nonce'),
                'timestamp' => time(),
                'version' => wp_get_theme()->get('Version'),
                'environment' => wp_get_environment_type(),
                'isDev' => defined('WP_DEBUG') && WP_DEBUG,
            )); ?>
        };
    </script>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <!-- React アプリのルート要素 - 単一の一貫したID -->
    <div id="wp-react-app"></div>
