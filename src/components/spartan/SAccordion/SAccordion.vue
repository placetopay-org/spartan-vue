<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
    class?: string;
    open: boolean;
    vertical?: boolean;
}>();

const accordionBody = ref<HTMLDivElement | null>(null);

watch(
    () => props.open,
    (open) => {
        if (open) {
            accordionBody.value!.style.gridTemplateRows = '1fr';
        } else {
            accordionBody.value!.style.gridTemplateRows = '0fr';
        }
    },
);

onMounted(() => {
    if (props.open) accordionBody.value!.style.gridTemplateRows = '1fr';
});
</script>

<template>
    <div class="accordion">
        <div ref="accordionBody" class="transition-accordion grid grid-rows-[0fr]">
            <div class="overflow-hidden"><slot /></div>
        </div>
    </div>
</template>

<style scoped>
.transition-accordion {
    transition: 250ms grid-template-rows ease;
}
</style>
