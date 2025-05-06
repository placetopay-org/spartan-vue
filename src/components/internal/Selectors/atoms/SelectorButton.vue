<script setup lang="ts">
import { useTemplateRef, type ShallowRef } from 'vue';
import { Loader } from '@internal';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/vue/20/solid';
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from '../styles';
import type { TRounded } from '@/constants';

defineProps<{
    class?: string;
    disabled?: boolean;
    error?: boolean;
    rounded?: TRounded;
    loading?: boolean;
    showClearButton?: boolean;
}>();

const $button = useTemplateRef<HTMLButtonElement>('button')

defineExpose<{
    $button: ShallowRef<HTMLButtonElement | null>;
}>({ $button });
</script>

<template>
    <button
        :disabled="disabled"
        type="button"
        ref="button"
        :class="twMerge(buttonStyles({ disabled, error, rounded }), 'flex items-center', $props.class)"
    >
        <slot />

        <div class="-mr-1 ml-auto flex gap-1 text-gray-400">
            <button @click.stop="$emit('clear')" v-if="showClearButton" class="group">
                <XMarkIcon class="h-5 w-5 shrink-0 group-hover:text-gray-600" />
            </button>
            <Loader v-if="loading" variant="simple" class="h-5 w-5 shrink-0" />
            <ChevronDownIcon v-else class="h-5 w-5 shrink-0" />
        </div>
    </button>
</template>
