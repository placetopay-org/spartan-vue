<script setup lang="ts">
import { SButton } from '@/components/spartan/SButton'; 
import { Link2Icon } from '@placetopay/iconsax-vue/twotone';

defineProps<{ mode: boolean; example: string, name: string }>();
</script>

<template>
    <SButton v-if="mode" as="a" target="_blank" :leftIcon="Link2Icon" :href="`/iframe.html?args=buttonPreviewMode:false&id=examples-${example}--${name}&viewMode=story`">Open example</SButton>
    <slot v-else />
</template>
