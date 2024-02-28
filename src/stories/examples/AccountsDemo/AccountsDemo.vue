<script setup lang="ts">
import VForm from './VForm.vue';
import VFooter from './VFooter.vue';
</script>

<template>
    <div class="flex h-full w-full flex-1">
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 h-full w-full object-cover" src="./bento-grid.png" alt="bento grid">
        </div>

        <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <VForm />
            </div>

            <VFooter class="absolute bottom-0 py-6" /> 
        </section>
    </div>
</template>
