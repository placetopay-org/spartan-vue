<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';
import { hasSlotContent } from '@/helpers';

defineEmits(['close']);

const props = withDefaults(
    defineProps<{
        type?: 'success' | 'danger';
        leftBorder?: boolean;
    }>(),
    {
        type: 'success',
        leftBorder: false,
    },
);

const typeStyles = {
    success: {
        leftBarColor: 'border-green-400',
        iconColor: 'text-green-400',
        textColor: 'text-green-500',
        icon: CheckCircleIcon,
    },
    warning: {
        leftBarColor: 'border-yellow-400',
        iconColor: 'text-yellow-400',
        textColor: 'text-yellow-500',
        icon: ExclamationCircleIcon,
    },
    danger: {
        leftBarColor: 'border-red-400',
        textColor: 'text-red-500',
        iconColor: 'text-red-400',
        icon: XCircleIcon,
    },
};

const typeStyle = computed(() => typeStyles[props.type]);
</script>

<template>
    <div
        aria-live="assertive"
        :class="[
            'flex justify-between gap-3 overflow-hidden rounded-2xl bg-white p-4 shadow-md',
            leftBorder ? 'border-l-4' : '',
            typeStyle.leftBarColor,
        ]"
    >
        <div class="flex flex-col justify-center">
            <div class="flex items-center gap-1.5">
                <component
                    :is="typeStyle.icon"
                    class="h-5 w-5 stroke-2"
                    :class="[typeStyle.iconColor]"
                    aria-hidden="true"
                />
                <span :class="['text-sm font-semibold', typeStyle.textColor]"><slot /></span>
            </div>
            <p v-if="hasSlotContent($slots.description)" class="text-xs font-normal text-black">
                <slot name="description" />
            </p>
        </div>

        <div class="flex shrink-0">
            <button
                class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                @click="$emit('close')"
            >
                <span class="sr-only">Close</span>
                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
            </button>
        </div>
    </div>
</template>
