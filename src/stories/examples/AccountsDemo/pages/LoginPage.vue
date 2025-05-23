<script setup lang="ts">
import VForm from '../components/VForm.vue';
import VFooter from '../components/VFooter.vue';
import Bento from '../components/Bento.vue';
import { computed } from 'vue';

const props = defineProps<{
    route: string;
    variant?: 'bento' | 'uw';
}>();

const isBentoVariant = computed(() => props.variant === 'bento');
const isUWVariant = computed(() => props.variant === 'uw');
</script>

<template>
    <div class="h-screen w-screen bg-white">
        <div class="flex h-full" :class="!isUWVariant && 'container mx-auto justify-center'">
            <Bento v-if="isBentoVariant" />
            <section v-else class="hidden p-6 pr-0 lg:flex" :class="isUWVariant && 'flex-1'">
                <div class="h-full w-full overflow-hidden rounded-2xl bg-black">
                    <img class="h-full w-full object-cover opacity-50" src="../assets/bento-2.jpg" />
                </div>
            </section>

            <section
                class="relative flex flex-1 flex-col items-center justify-center bg-white px-4 sm:px-16 lg:flex-none"
            >
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm :route-param="route" />
                </div>

                <VFooter class="absolute bottom-0 py-6" />
            </section>
        </div>
    </div>
</template>
