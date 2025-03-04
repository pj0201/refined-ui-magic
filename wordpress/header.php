
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
    <!-- React Application Integration -->
    <script>
        // React アプリケーションのためのグローバル設定
        window.planningJoyConfig = {
            wpContent: <?php echo json_encode(array(
                'ajaxUrl' => admin_url('admin-ajax.php'),
                'homeUrl' => home_url(),
                'isHome' => is_front_page() || is_home(),
                'themePath' => get_template_directory_uri(),
            )); ?>
        };
    </script>
</head>
<body <?php body_class(); ?>>
    <!-- React アプリ用のルート要素 -->
    <div id="root"></div>
    <?php wp_body_open(); ?>
