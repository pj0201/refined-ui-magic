
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/dist/index.css">
</head>
<body <?php body_class(); ?>>
    <div id="root"></div>
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/dist/index.js"></script>
    <?php wp_body_open(); ?>
