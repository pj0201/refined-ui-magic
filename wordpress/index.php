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
            <p class="mb-6" style="color: var(--text-color)">
                日々の経営において、様々な課題に直面されていることと存じます。<br>
                私たちは、そんな経営者の皆様に寄り添い、共に解決策を見出していきます。
            </p>
            <p class="mb-6" style="color: var(--text-color)">
                会社の未来を左右する重要な経営判断から、日々の業務改善まで。<br>
                経営者様の良き理解者として、実践的なアドバイスと具体的な解決策を提供いたします。
            </p>
        </div>
    </section>

    <!-- Support Areas Section -->
    <section class="py-20 px-4 bg-gray-50">
        <div class="max-w-4xl mx-auto fade-in">
            <h2 class="text-3xl font-bold text-center mb-12" style="color: var(--text-color)">主な支援領域</h2>
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <h3 class="text-xl font-bold mb-4" style="color: var(--text-color)">創業期支援</h3>
                    <ul class="list-disc list-inside space-y-2" style="color: var(--text-color)">
                        <li>事業計画策定サポート</li>
                        <li>資金調達支援</li>
                        <li>許認可取得支援</li>
                        <li>什器・機器・ツール導入の助言</li>
                    </ul>
                </div>
                <?php include(get_template_directory() . '/template-parts/support-areas.php'); ?>
            </div>
        </div>
    </section>

    <!-- Company Profile Section -->
    <section class="py-20 px-4 bg-gray-50">
        <div class="max-w-4xl mx-auto fade-in">
            <h2 class="text-3xl font-bold text-center mb-12" style="color: var(--text-color)">会社概要</h2>
            <div class="space-y-6 bg-white/80 p-8 rounded-lg">
                <p class="flex items-center gap-4" style="color: var(--text-color)">
                    <strong>法人名：</strong>
                    <span>PLANNINGJOY株式会社</span>
                </p>
                <p class="flex items-center gap-4" style="color: var(--text-color)">
                    <strong>代表者：</strong>
                    <span>堀上 亮（経済産業省認定 経営革新等支援機関）</span>
                </p>
                <p class="flex items-center gap-4" style="color: var(--text-color)">
                    <strong>所在地：</strong>
                    <span>〒651-0084 兵庫県神戸市中央区磯辺通1-1-18 カサベラ国際プラザビル707号室</span>
                </p>
                <div class="flex items-start gap-4">
                    <strong>連絡先：</strong>
                    <div class="space-y-2">
                        <p>TEL/FAX　078-600-0611</p>
                        <p class="flex items-center gap-2">
                            <i class="fas fa-envelope"></i>
                            <span>MAIL hori@planjoy.net（代表者直通）</span>
                        </p>
                    </div>
                </div>
                <div class="flex items-start gap-4">
                    <strong>業務内容：</strong>
                    <div class="grid grid-cols-2 gap-x-8 gap-y-2">
                        <span>経営コンサルティング</span>
                        <span>業務改善全般</span>
                        <span>資金調達サポート</span>
                        <span>キャッシュフロー改善</span>
                        <span>補助金申請サポート</span>
                        <span>各種計画策定サポート</span>
                        <span>事業承継サポート</span>
                        <span>業務ツール開発（AIを使った駆動開発）</span>
                        <span>M&Aサポート</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

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
