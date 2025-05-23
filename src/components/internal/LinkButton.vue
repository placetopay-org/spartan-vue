<script setup lang="ts">
import { SButton } from '@/components/spartan/SButton';
import { Link2Icon } from '@placetopay/iconsax-vue/twotone';
import { buildExampleLink } from '@/helpers';

defineProps<{ mode: boolean; example: string; name: string }>();
</script>

<template>
    <SButton v-if="mode" as="a" target="_blank" :left-icon="Link2Icon" :href="buildExampleLink(example, name)"
        >Open example</SButton
    >
    <slot v-else />
</template>
