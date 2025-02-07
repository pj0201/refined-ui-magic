<?php get_header(); ?>

<div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
            class="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
            style="background-image: url('<?php echo get_theme_file_uri('images/hero-bg.jpg'); ?>'); filter: brightness(0.9);"
        ></div>
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
            <div class="p-8 bg-white/90 backdrop-blur-sm shadow-lg border-[#aaadb0]/20" style="font-family: 'Hiragino Mincho ProN', serif;">
                <div class="grid md:grid-cols-2 gap-12 items-start">
                    <div class="space-y-6 text-[#403E43] leading-relaxed">
                        <p>
                            時代の変化により人・金・物を経営資源とした時代から、情報や時消費・事消費と消費者がお金を使う領域は変化して来ました。
                        </p>
                        <p>
                            思いもよらなかったビジネスや経営モデル・働き方が生まれ、そのサイクルも早まっているのが特徴です。
                        </p>
                        <p>
                            これらは、業種・業態だけに限らず、世界中で起こっている事実です。それらの中軸にあるのは、AIの進化。今後の未来はAIの活用からAIとの共存へ向かっていくものと考えられます。
                        </p>
                        <p>
                            外部専門家として知見と経験のみならず、新たな知識やトレンドにアンテナを張り巡らせ、経営資源の効率化・最大化をサポートいたします。クライアント様の目指す方向や目的地、かけがえのない思いを大切に、ミッション達成に向けて弊社は全力を尽くします。
                        </p>
                    </div>
                    <div class="hidden md:block">
                        <img 
                            src="<?php echo get_theme_file_uri('images/message-image.jpg'); ?>" 
                            alt="Modern office interior" 
                            class="rounded-xl shadow-2xl object-cover h-[400px] w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Support Areas Section -->
    <?php get_template_part('template-parts/support-area-card'); ?>

    <!-- Company Profile Section -->
    <?php get_template_part('template-parts/company-profile'); ?>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-4" style="background: linear-gradient(to right, #243949 0%, #517fa4 100%);">
        <div class="max-w-4xl mx-auto text-center fade-in">
            <h2 class="text-3xl font-bold mb-8 text-white">お問い合わせ</h2>
            <p class="mb-8 text-white">下記フォームに必要事項をご記入のうえ、お気軽にご相談ください。</p>
            <a href="mailto:hori@planjoy.net" class="inline-block px-6 py-3 text-white border border-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                メールでのお問い合わせ
            </a>
        </div>
    </section>

    <footer class="py-8 px-4 bg-gray-900 text-white text-center">
        <p>&copy; <?php echo date('Y'); ?> PLANNINGJOY株式会社</p>
    </footer>
</div>

<?php get_footer(); ?>