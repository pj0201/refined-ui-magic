
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
            
            <!-- Google Form統合 - WordPressでの実装（iframeバージョン） -->
            <div class="text-center">
                <p class="mb-4 text-white">お問い合わせには、セキュアなGoogleフォームを使用しております。</p>
                <button id="show-contact-form" 
                   class="inline-block px-6 py-3 text-white border border-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline-block mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    お問い合わせフォームを表示
                </button>
                
                <div id="contact-form-container" class="hidden mt-8">
                    <iframe 
                        id="google-form-iframe"
                        src="https://docs.google.com/forms/d/e/1FAIpQLSfGctjmssSGu73JcGfPeECrLstNGZF5w_36ePFOZLw7s-1HPg/viewform?embedded=true"
                        width="100%" 
                        height="1200" 
                        frameborder="0" 
                        marginheight="0" 
                        marginwidth="0"
                        class="bg-white rounded-lg shadow-xl">
                        読み込んでいます...
                    </iframe>
                </div>
                
                <script>
                    document.getElementById('show-contact-form').addEventListener('click', function() {
                        document.getElementById('contact-form-container').classList.remove('hidden');
                        document.getElementById('show-contact-form').classList.add('hidden');
                    });
                </script>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
