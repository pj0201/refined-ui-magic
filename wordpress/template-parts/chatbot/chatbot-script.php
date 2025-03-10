
<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<script>
// Supabase Edge Functions の URL
const SUPABASE_URL = '<?php echo getenv("SUPABASE_URL"); ?>';
const CHAT_FUNCTION_URL = SUPABASE_URL ? `${SUPABASE_URL}/functions/v1/chat` : null;
const ANON_KEY = '<?php echo getenv("SUPABASE_ANON_KEY"); ?>';

// Chat functions
<?php require_once get_template_directory() . '/template-parts/chatbot/functions/generate-response.php'; ?>
<?php require_once get_template_directory() . '/template-parts/chatbot/functions/message-handling.php'; ?>
<?php require_once get_template_directory() . '/template-parts/chatbot/functions/file-upload.php'; ?>
<?php require_once get_template_directory() . '/template-parts/chatbot/functions/init-chatbot.php'; ?>
</script>
