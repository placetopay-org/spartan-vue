<template>
    <Button
        unstyled
        :pt="theme"
        :ptOptions="{
            mergeProps: ptViewMerge,
        }"
    >
        <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
            <slot :name="slotName" v-bind="slotProps ?? {}" />
        </template>
    </Button>
</template>

<script setup lang="ts">
import Button, { type ButtonPassThroughOptions, type ButtonProps } from 'primevue/button';
import { ref } from 'vue';
import { ptViewMerge } from './utils';

interface Props extends /* @vue-ignore */ ButtonProps {}
defineProps<Props>();

const theme = ref<ButtonPassThroughOptions>({
    root: `inline-flex cursor-pointer select-none items-center justify-center overflow-hidden relative
        px-3 py-2 gap-2 rounded-md disabled:pointer-events-none disabled:opacity-60 transition-colors duration-200
        bg-gray-100 enabled:hover:bg-gray-200 enabled:active:bg-gray-300
        border border-gray-100 enabled:hover:border-gray-200 enabled:active:border-gray-300
        text-gray-600 enabled:hover:text-gray-700 enabled:active:text-gray-800
        dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:enabled:active:bg-gray-600
        dark:border-gray-800 dark:enabled:hover:border-gray-700 dark:enabled:active:border-gray-600
        dark:text-gray-300 dark:enabled:hover:text-gray-200 dark:enabled:active:text-gray-100
        focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2
        focus-visible:outline-gray-600 dark:focus-visible:outline-gray-300
        data-[p-vertical=true]:flex-col data-[p-fluid=true]:w-full data-[p-fluid=true]:data-[p-icon-only=true]:w-10
        data-[p-icon-only=true]:w-10 data-[p-icon-only=true]:px-0 data-[p-icon-only=true]:gap-0
        data-[p-icon-only=true]:data-[p-rounded=true]:rounded-full data-[p-icon-only=true]:data-[p-rounded=true]:h-10
        data-[p-small=true]:text-sm data-[p-small=true]:px-[0.625rem] data-[p-small=true]:py-[0.375rem]
        data-[p-large=true]:text-[1.125rem] data-[p-large=true]:px-[0.875rem] data-[p-large=true]:py-[0.625rem]
        data-[p-raised=true]:shadow-sm data-[p-rounded=true]:rounded-[2rem]
        data-[p-outlined=true]:bg-transparent enabled:hover:data-[p-outlined=true]:bg-gray-50 enabled:active:data-[p-outlined=true]:bg-gray-100
        data-[p-outlined=true]:border-gray-200 enabled:hover:data-[p-outlined=true]:border-gray-200 enabled:active:data-[p-outlined=true]:border-gray-200
        data-[p-outlined=true]:text-gray-500 enabled:hover:data-[p-outlined=true]:text-gray-500 enabled:active:data-[p-outlined=true]:text-gray-500
        dark:data-[p-outlined=true]:bg-transparent dark:enabled:hover:data-[p-outlined=true]:bg-white/5 dark:enabled:active:data-[p-outlined=true]:bg-white/15
        dark:data-[p-outlined=true]:border-gray-700 dark:enabled:hover:data-[p-outlined=true]:border-gray-700 dark:enabled:active:data-[p-outlined=true]:border-gray-700
        dark:data-[p-outlined=true]:text-gray-400 dark:enabled:hover:data-[p-outlined=true]:text-gray-400 dark:enabled:active:data-[p-outlined=true]:text-gray-400
        data-[p-text=true]:bg-transparent enabled:hover:data-[p-text=true]:bg-gray-50 enabled:active:data-[p-text=true]:bg-gray-100
        data-[p-text=true]:border-transparent enabled:hover:data-[p-text=true]:border-transparent enabled:active:data-[p-text=true]:border-transparent
        data-[p-text=true]:text-gray-500 enabled:hover:data-[p-text=true]:text-gray-500 enabled:active:data-[p-text=true]:text-gray-500
        dark:data-[p-text=true]:bg-transparent dark:enabled:hover:data-[p-text=true]:bg-gray-800 dark:enabled:active:data-[p-text=true]:bg-gray-700
        dark:data-[p-text=true]:border-transparent dark:enabled:hover:data-[p-text=true]:border-transparent dark:enabled:active:data-[p-text=true]:border-transparent
        dark:data-[p-text=true]:text-gray-400 dark:enabled:hover:data-[p-text=true]:text-gray-400 dark:enabled:active:data-[p-text=true]:text-gray-400
    `,
    loadingIcon: ``,
    icon: `data-[p-right=true]:order-1 data-[p-bottom=true]:order-2`,
    label: `font-medium data-[p-icon-only=true]:invisible data-[p-icon-only=true]:w-0
        data-[p-small=true]:text-sm data-[p-large=true]:text-[1.125rem]`,
    pcBadge: {
        root: `min-w-4 h-4 leading-4`,
    },
});
</script>
