<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { hasSlotContent } from '@/helpers';
import type { TToastProps, TToastEmits } from './types';
import { twMerge } from 'tailwind-merge';

defineEmits<TToastEmits>();

const { type = 'success', leftBorder } = defineProps<TToastProps>();

const typeStyles = {
    success: {
        leftBarColor: 'border-green-400',
        iconColor: 'text-green-500',
        icon: CheckCircleIcon,
    },
    warning: {
        leftBarColor: 'border-yellow-400',
        iconColor: 'text-yellow-500',
        icon: ExclamationCircleIcon,
    },
    error: {
        leftBarColor: 'border-red-400',
        iconColor: 'text-red-500',
        icon: XCircleIcon,
    },
};

const typeStyle = computed(() => typeStyles[type]);
</script>

<template>
    <div
        aria-live="assertive"
        :class="
            twMerge(
                'flex min-w-96 justify-between gap-3 overflow-hidden rounded-lg bg-white p-4 pl-3 shadow-md ring-1 ring-gray-200',
                leftBorder ? 'border-l-4' : '',
                typeStyle.leftBarColor,
            )
        "
    >
        <div class="flex flex-col justify-center">
            <div class="flex items-center gap-1.5">
                <component :is="typeStyle.icon" class="h-6 w-6 shrink-0" :class="[typeStyle.iconColor]" aria-hidden="true" />
                <span class="text-sm font-medium text-gray-900">
                    <slot v-if="hasSlotContent($slots.default)" />
                    <span v-else v-html="title" />
                </span>
            </div>
            <p v-if="description || hasSlotContent($slots.description)" class="text-sm font-normal text-gray-400 ml-[26px]">
                <slot v-if="hasSlotContent($slots.description)" name="description" />
                <span v-else v-html="description" />
            </p>
        </div>

        <div class="flex shrink-0 items-start" v-if="closeable">
            <button
                class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-0"
                @click="$emit('closeToast')"
            >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5 text-gray-900" aria-hidden="true" />
            </button>
        </div>
    </div>
</template>
