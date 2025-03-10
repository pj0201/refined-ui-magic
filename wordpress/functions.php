
<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * PlanningJoy Theme Functions
 * 
 * This file includes all the core functionality files to keep the codebase organized
 * and maintainable.
 */

// Core theme setup
require_once get_template_directory() . '/includes/theme-setup.php';

// Asset management (scripts and styles)
require_once get_template_directory() . '/includes/assets.php';

// Helper functions
require_once get_template_directory() . '/includes/helpers.php';

// REST API endpoints
require_once get_template_directory() . '/includes/rest-api.php';

/**
 * Ensure template parts directory exists
 */
function planningjoy_ensure_template_dirs_exist() {
    $dirs = [
        get_template_directory() . '/template-parts/chatbot',
        get_template_directory() . '/template-parts/chatbot/functions',
    ];
    
    foreach ($dirs as $dir) {
        if (!file_exists($dir)) {
            wp_mkdir_p($dir);
        }
    }
}
add_action('after_setup_theme', 'planningjoy_ensure_template_dirs_exist');
