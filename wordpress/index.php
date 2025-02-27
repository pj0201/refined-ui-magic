
<?php get_header(); ?>

<main id="primary" class="site-main">
    <?php 
    get_template_part('template-parts/hero-section');
    get_template_part('template-parts/topic-section');
    get_template_part('template-parts/message-section');
    get_template_part('template-parts/support-area-card');
    get_template_part('template-parts/consultation-flow');
    get_template_part('template-parts/faq-section');
    get_template_part('template-parts/company-profile');
    get_template_part('template-parts/chatbot');
    ?>
    
    <!-- Contact Section -->
    <section id="contact" class="py-20 px-4" style="background: linear-gradient(to right, #243949 0%, #517fa4 100%);">
        <div class="max-w-4xl mx-auto text-center fade-in">
            <h2 class="text-3xl font-bold mb-8 text-white">お問い合わせ</h2>
            <p class="mb-8 text-white">下記フォームに必要事項をご記入のうえ、お気軽にご相談ください。</p>
            <a href="mailto:<?php echo antispambot('hori@planjoy.net'); ?>" class="inline-block px-6 py-3 text-white border border-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                メールでのお問い合わせ
            </a>
        </div>
    </section>
</main>

<?php get_footer(); ?>
