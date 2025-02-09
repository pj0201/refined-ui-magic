<?php
$hero_image = get_theme_image_url('hero-bg.jpg');
?>
<section class="relative h-[600px] flex items-center justify-center overflow-hidden">
    <div 
        class="absolute inset-0 bg-cover bg-center z-0 transition-opacity duration-500"
        style="background-image: url('<?php echo esc_url($hero_image); ?>'); filter: brightness(0.9);"
    >
    </div>
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20 z-[1]"></div>
    <div class="relative z-10 text-center text-white space-y-12 px-4 -mt-20">
        <h1 class="text-6xl font-bold tracking-tight">
            創業から承継まで<br />
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
