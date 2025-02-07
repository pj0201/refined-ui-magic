<?php
/**
 * @param array $args {
 *     @type string $title
 *     @type array  $items
 * }
 */
?>
<div class="bg-white/80 border-gray-200/20 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 p-6 rounded-lg">
    <div class="mb-4">
        <h3 class="text-[#403E43] text-center text-xl font-bold"><?php echo esc_html($args['title']); ?></h3>
    </div>
    <div class="content">
        <ul class="list-disc list-inside text-[#403E43] space-y-2">
            <?php foreach ($args['items'] as $item): ?>
                <li><?php echo esc_html($item); ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
</div>