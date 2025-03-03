
<?php get_header(); ?>

<main id="primary" class="site-main">
    <?php 
    get_template_part('template-parts/hero-section');
    get_template_part('template-parts/topic-section');
    get_template_part('template-parts/consulting-section');
    get_template_part('template-parts/support-area-card');
    get_template_part('template-parts/business-plans-section');
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
            
            <!-- Google Form統合 - WordPressでの実装 -->
            <div class="text-center">
                <p class="mb-4 text-white">お問い合わせには、セキュアなGoogleフォームを使用しております。</p>
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   class="inline-block px-6 py-3 text-white border border-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    お問い合わせフォームへ
                </a>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
