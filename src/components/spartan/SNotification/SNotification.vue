<script setup lang="ts">
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        type: 'success' | 'danger';
    }>(),
    {
        type: 'success',
    },
);

const options = {
    success: {
        wrapperClasses: 'border-green-400',
        classes: 'text-green-400',
        icon: CheckCircleIcon,
    },
    danger: {
        wrapperClasses: 'border-red-400',
        classes: 'text-red-400',
        icon: XCircleIcon,
    },
};

const wrapperClasses = computed(() => options[props.type].wrapperClasses);
const classes = computed(() => options[props.type].classes);
const icon = computed(() => options[props.type].icon);
</script>

<template>
    <div aria-live="assertive" class="pointer-events-none flex items-end px-4 py-6 sm:items-start sm:p-6">
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <div
                class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5"
            >
                <div :class="['border-l-4 p-4', wrapperClasses]">
                    <div class="flex items-start">
                        <div class="flex-shrink-0">
                            <component :is="icon" class="h-6 w-6" :class="[classes]" aria-hidden="true" />
                        </div>
                        <div class="ml-3 w-0 flex-1 pt-0.5">
                            <p class="text-sm font-medium text-gray-900">
                                <slot />
                            </p>
                        </div>
                        <div class="ml-4 mt-0.5 flex flex-shrink-0">
                            <button
                                class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2"
                            >
                                <span class="sr-only">Close</span>
                                <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
