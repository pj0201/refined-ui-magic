
<?php get_header(); ?>

<div class="min-h-screen bg-background">
    <!-- Hero Section -->
    <section class="relative h-screen bg-blue-900 text-white overflow-hidden">
        <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/75"></div>
        </div>
        <div class="relative max-w-4xl mx-auto h-full flex flex-col justify-center items-center px-4 text-center">
            <h1 class="text-4xl md:text-5xl font-bold mb-6 fade-in">
                経営者の良き理解者として<br>
                お客様と共に歩む
            </h1>
            <p class="text-xl mb-8 fade-in">
                経営に関する様々なお悩み・ご相談に<br class="md:hidden">ワンストップで対応いたします
            </p>
        </div>
    </section>

    <!-- Message Section -->
    <section class="py-20 px-4">
        <div class="max-w-4xl mx-auto text-center fade-in">
            <h2 class="text-3xl font-bold mb-8">経営者の皆様へ</h2>
            <p class="mb-6">
                日々の経営において、様々な課題に直面されていることと存じます。<br>
                私たちは、そんな経営者の皆様に寄り添い、共に解決策を見出していきます。
            </p>
            <p class="mb-6">
                会社の未来を左右する重要な経営判断から、日々の業務改善まで。<br>
                経営者様の良き理解者として、実践的なアドバイスと具体的な解決策を提供いたします。
            </p>
        </div>
    </section>

    <!-- Support Areas Section -->
    <section class="py-20 px-4 bg-gray-50">
        <div class="max-w-4xl mx-auto fade-in">
            <h2 class="text-3xl font-bold text-center mb-12">主な支援領域</h2>
            <div class="grid md:grid-cols-2 gap-8">
                <!-- 創業期支援 -->
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold mb-4">創業期支援</h3>
                    <ul class="list-disc list-inside space-y-2">
                        <li>事業計画策定サポート</li>
                        <li>資金調達支援</li>
                        <li>許認可取得支援</li>
                        <li>什器・機器・ツール導入の助言</li>
                    </ul>
                </div>
                <!-- その他の支援領域 ... -->
                <?php include(get_template_directory() . '/template-parts/support-areas.php'); ?>
            </div>
        </div>
    </section>

    <!-- 相談の流れ -->
    <section id="flow" class="py-20 px-4 bg-blue-900 text-white">
        <div class="max-w-4xl mx-auto fade-in">
            <h2 class="text-3xl font-bold text-center mb-8">相談の流れ</h2>
            <!-- ... 相談フローの内容 ... -->
        </div>
    </section>

    <!-- FAQ Section -->
    <section id="faq" class="py-20 px-4 bg-white">
        <div class="max-w-4xl mx-auto fade-in">
            <h2 class="text-3xl font-bold text-center mb-8">よくあるご質問</h2>
            <!-- ... FAQの内容 ... -->
        </div>
    </section>

    <!-- Company Profile Section -->
    <?php get_template_part('template-parts/company-profile'); ?>

    <!-- Contact Section -->
    <section id="contact" class="py-20 px-4" style="background: linear-gradient(to right, #243949 0%, #517fa4 100%)">
        <div class="max-w-4xl mx-auto text-center fade-in">
            <h2 class="text-3xl font-bold mb-8 text-white">お問い合わせ</h2>
            <p class="mb-8 text-white">下記フォームに必要事項をご記入のうえ、お気軽にご相談ください。</p>
            <a href="mailto:hori@planjoy.net" class="inline-block px-6 py-3 text-white border border-white hover:bg-white hover:text-gray-900 transition-colors rounded">
                メールでのお問い合わせ
            </a>
        </div>
    </section>
</div>

<?php get_footer(); ?>
