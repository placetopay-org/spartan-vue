<script setup lang="ts">
import VForm from './VForm.vue';
import VFooter from './VFooter.vue';
</script>

<template>
    <main class="flex h-full w-full">
        <img class="w-full h-full" src="./bento-grid.png" alt="bento grid">

        <section class="relative px-16 flex flex-col justify-center items-center w-1/3 pb-10">
            <VForm />
            <VFooter class="absolute bottom-0" />
        </section>
    </main>
</template>
