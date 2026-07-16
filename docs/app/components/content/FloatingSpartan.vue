<template>
    <div class="flex flex-1 items-center justify-center">
        <!-- UColorModeImage swaps the variants with CSS (dark:hidden), so the server
             does not need to guess the theme — the previous colorMode branch rendered
             the dark logo on the server and hydration-mismatched for light-mode visitors.
             It also joins app.baseURL, which a bare <NuxtImg src="/landing/..."> misses. -->
        <UColorModeImage
            light="/landing/light/spartan.svg"
            dark="/landing/dark/spartan.svg"
            class="floating-logo h-42"
            alt="Spartan Colored Logo"
        />
    </div>
</template>

<style>
.floating-logo {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.group:hover .floating-logo {
    transform: translateY(-20px);
}
</style>
