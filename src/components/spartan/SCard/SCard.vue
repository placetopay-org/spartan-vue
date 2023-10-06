<script setup lang="ts">
import { computed } from 'vue';
import { hasSlotContent } from '@/helpers';
import type { TCardProps } from './types';

const props = withDefaults(defineProps<TCardProps>(), {
    size: 'md',
    bodyAccent: false,
    headerAccent: false,
    footerAccent: false,
});

const roundedStyle = computed(() => (props.size === 'md' ? 'rounded-xl' : 'rounded-md'));
const paddingMainStyle = computed(() => (props.size === 'md' ? 'px-4 py-5 sm:p-6' : 'px-2 py-1 sm:px-4 sm:py-2'));
const paddingAddonStyle = computed(() => (props.size === 'md' ? 'p-4 sm:px-6 sm:py-5' : 'px-2 py-1 sm:px-4 sm:py-1'));

const accentStyle = computed(() => {
    const accentClass = 'bg-gray-50';

    return {
        header: props.headerAccent ? accentClass : '',
        body: props.bodyAccent ? accentClass : '',
        footer: props.footerAccent ? accentClass : '',
    };
});
</script>
<template>
    <div :class="['flex flex-col overflow-hidden bg-white shadow duration-200 hover:shadow-md', roundedStyle]">
        <template v-if="hasSlotContent($slots.header)">
            <div :class="[paddingAddonStyle, accentStyle.header]"><slot name="header" /></div>
            <hr class="border-gray-200" />
        </template>
        <div :class="['h-full', paddingMainStyle, accentStyle.body]"><slot /></div>

        <template v-if="hasSlotContent($slots.footer)">
            <hr class="border-gray-200" />
            <div :class="[paddingAddonStyle, accentStyle.footer]"><slot name="footer" /></div>
        </template>
    </div>
</template>