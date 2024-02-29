<script setup lang="ts">
import VForm from './VForm.vue';
import VFooter from './VFooter.vue';
</script>

<template>
    <div class="flex h-full w-full flex-1 bg-white">
        <div class="relative hidden flex-1 lg:grid bg-black rounded-3xl m-6 mr-0 grid-cols-3 gap-1.5 text-white">
            <div class="flex flex-col gap-1.5 relative overflow-auto">
                <div class="bg-red-500 rounded-2xl h-[calc(100% + )]">1</div>
                <div class="bg-red-500 rounded-2xl h-[calc(100% + )]">2</div>
                <div class="bg-red-500 rounded-2xl h-[calc(100% + )]">3</div>
                <div class="bg-red-500 rounded-2xl h-[calc(100% + )]">4</div>
            </div>
            <div class="bg-red-500">2</div>
            <div class="bg-red-500">3</div>
        </div>

        <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 lg:flex-none relative">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <VForm />
            </div>

            <VFooter class="absolute bottom-0 py-6" /> 
        </section>
    </div>
</template>
