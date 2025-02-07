<?php get_header(); ?>

<main id="primary" class="site-main">
    <?php if ( have_posts() ) : ?>
        <?php while ( have_posts() ) : the_post(); ?>
            <!-- Hero Section -->
            <section class="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500" style="background-image: url('<?php echo get_theme_file_uri('images/hero-bg.jpg'); ?>'); filter: brightness(0.9);"></div>
                <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20 z-[1]"></div>
                <div class="relative z-10 text-center text-white space-y-12 px-4 -mt-20">
                    <h1 class="text-6xl font-bold tracking-tight">
                        創業から承継まで<br>
                        経営の羅針盤
                    </h1>
                    <div class="space-y-6 flex flex-col items-center">
                        <p class="text-xl font-medium tracking-wide fade-in backdrop-blur-sm bg-white/10 py-2 px-4 rounded-lg">
                            「生産性と資産に寄与する経営コンサルティング」
                        </p>
                        <p class="text-4xl font-medium tracking-wide fade-in delay-100 backdrop-blur-sm bg-white/10 py-3 px-6 rounded-lg">
                            PLANNINGJOY株式会社
                        </p>
                    </div>
                </div>
            </section>

            <!-- Message Section -->
            <section id="message" class="py-20 px-4" style="background: linear-gradient(109.6deg, #F1F0FB 11.2%, #eee 91.1%);">
                <div class="max-w-4xl mx-auto space-y-8">
                    <h2 class="text-3xl font-bold text-center mb-12 text-[#403E43]">メッセージ</h2>
                    <div class="p-8 bg-white/90 backdrop-blur-sm shadow-lg border-[#aaadb0]/20">
                        <div class="grid md:grid-cols-2 gap-12 items-start">
                            <div class="space-y-6 text-[#403E43] leading-relaxed">
                                <?php the_content(); ?>
                            </div>
                            <?php if ( has_post_thumbnail() ) : ?>
                                <div class="hidden md:block">
                                    <?php the_post_thumbnail( 'large', array( 'class' => 'rounded-xl shadow-2xl object-cover h-[400px] w-full' ) ); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </section>

            <?php 
            // Support Areas Section
            get_template_part('template-parts/support-area-card');
            
            // Company Profile Section
            get_template_part('template-parts/company-profile');
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

        <?php endwhile; ?>
    <?php endif; ?>
</main>

<?php get_footer(); ?>