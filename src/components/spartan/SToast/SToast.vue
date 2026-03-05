<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { hasSlotContent } from '@/helpers';
import type { TToastProps, TToastEmits } from './types';
import { toastStyles, toastIconStyles } from './styles';
import { twMerge } from 'tailwind-merge';

defineEmits<TToastEmits>();

const { type = 'success', leftBorder, class: className } = defineProps<TToastProps>();

const typeIcons = {
    success: CheckCircleIcon,
    warning: ExclamationCircleIcon,
    error: XCircleIcon,
};

const icon = computed(() => typeIcons[type]);
</script>

<template>
    <div aria-live="assertive" :class="twMerge(toastStyles({ type, leftBorder: leftBorder ?? false }), className)">
        <div class="flex flex-col justify-center">
            <div class="flex items-center gap-1.5">
                <component :is="icon" :class="toastIconStyles({ type })" aria-hidden="true" />
                <span class="text-sm font-medium text-gray-900 dark:text-gray-50">
                    <slot v-if="hasSlotContent($slots.default)" />
                    <span v-else v-html="title" />
                </span>
            </div>
            <p
                v-if="description || hasSlotContent($slots.description)"
                class="ml-[26px] text-sm font-normal text-gray-400"
            >
                <slot v-if="hasSlotContent($slots.description)" name="description" />
                <span v-else v-html="description" />
            </p>
        </div>

        <div v-if="closeable" class="flex shrink-0 items-start">
            <button
                class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:ring-0 focus:outline-none dark:text-gray-500 dark:hover:text-gray-300"
                @click="$emit('closeToast')"
            >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5 text-gray-900 dark:text-gray-400" aria-hidden="true" />
            </button>
        </div>
    </div>
</template>
