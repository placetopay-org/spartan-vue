<script setup lang="ts">
import VForm from './VForm.vue';
import VFooter from './VFooter.vue';
import Bento from './Bento.vue';

defineProps<{ route: string, bentoVariant: boolean }>();
</script>

<template>
    <div class="h-screen w-screen bg-white">
        <div class="container mx-auto flex h-full justify-center">
            <Bento v-if="bentoVariant" />
            <section v-else class="p-6 pr-0 hidden lg:flex">
                <div class="rounded-2xl overflow-hidden bg-black h-full w-full">
                    <img class="h-full w-full object-cover opacity-50" src="./assets/bento-2.jpg" />
                </div>
            </section>
    
            <section class="relative flex flex-1 flex-col items-center justify-center bg-white px-4 sm:px-16 lg:flex-none">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm :route-param="route" />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" />
            </section>
        </div>
    </div>
</template>
