<script setup lang="ts">
import { computed } from 'vue';

defineEmits(['removed']);

const props = withDefaults(
    defineProps<
        Partial<{
            color: keyof typeof colorOption;
            dot: boolean;
            outline: boolean;
            pill: boolean;
            removable: boolean;
            size: keyof typeof sizeOptions;
        }>
    >(),
    {
        color: 'gray',
        dot: false,
        outline: false,
        pill: false,
        removable: false,
        size: 'md',
    },
);

const colorOption = {
    primary: {
        textClass: 'text-primary-800',
        dotClass: 'fill-primary-400',
        styleClass: {
            solid: 'bg-primary-100',
            outline: 'outline-primary-800',
        },
    },
    gray: {
        textClass: 'text-gray-800',
        dotClass: 'fill-gray-400',
        styleClass: {
            solid: 'bg-gray-100',
            outline: 'outline-gray-800',
        },
    },
    red: {
        textClass: 'text-red-800',
        dotClass: 'fill-red-400',
        styleClass: {
            solid: 'bg-red-100',
            outline: 'outline-red-800',
        },
    },
    blue: {
        textClass: 'text-blue-800',
        dotClass: 'fill-blue-400',
        styleClass: {
            solid: 'bg-blue-100',
            outline: 'outline-blue-800',
        },
    },
    green: {
        textClass: 'text-green-800',
        dotClass: 'fill-green-400',
        styleClass: {
            solid: 'bg-green-100',
            outline: 'outline-green-800',
        },
    },
    yellow: {
        textClass: 'text-yellow-800',
        dotClass: 'fill-yellow-400',
        styleClass: {
            solid: 'bg-yellow-100',
            outline: 'outline-yellow-800',
        },
    },
    indigo: {
        textClass: 'text-indigo-800',
        dotClass: 'fill-indigo-400',
        styleClass: {
            solid: 'bg-indigo-100',
            outline: 'outline-indigo-800',
        },
    },
};

const sizeOptions = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-0.5 text-sm',
    lg: 'px-3 py-1.5 text-sm',
};

const classes = computed(() => [
    'inline-flex items-center font-medium',
    props.pill ? 'rounded-xl' : 'rounded',
    props.outline
        ? 'outline outline-1 -outline-offset-1' + colorOption[props.color].styleClass.outline
        : colorOption[props.color].styleClass.solid,
    sizeOptions[props.size],
    colorOption[props.color].textClass,
]);
</script>

<template>
    <span :class="classes">
        <svg
            v-if="dot"
            class="mr-1.5 h-2 w-2"
            :class="colorOption[props.color].dotClass"
            viewBox="0 0 8 8"
            aria-hidden="true"
        >
            <circle cx="4" cy="4" r="4" />
        </svg>
        <slot />
        <button
            v-if="removable"
            type="button"
            class="group relative -mr-1 ml-0.5 h-4 w-4 rounded-sm hover:bg-gray-500/20"
            @click="$emit('removed')"
        >
            <span class="sr-only">Remove</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                <path
                    d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
            </svg>
        </button>
    </span>
</template>
