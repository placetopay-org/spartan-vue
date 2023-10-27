<script setup lang="ts">
import { hasSlotContent } from '@/helpers';
import { RadioGroupOption, RadioGroupLabel, RadioGroupDescription } from '@headlessui/vue';
import { CheckCircleIcon } from '@heroicons/vue/20/solid';

defineProps<{
    value: string;
}>();
</script>

<template>
    <RadioGroupOption v-slot="{ checked }" as="template" :value="value">
        <div
            :class="[
                checked
                    ? 'border-primary-600 outline outline-1 -outline-offset-2 outline-primary-600'
                    : 'border-gray-300',
                'relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:border-primary-300 focus:s-ring',
            ]"
        >
            <span class="flex flex-1">
                <span class="flex flex-col justify-between">
                    <div>
                        <RadioGroupLabel
                            v-if="hasSlotContent($slots.title)"
                            as="span"
                            class="block text-sm font-medium text-gray-900"
                        >
                            <slot name="title" />
                        </RadioGroupLabel>

                        <RadioGroupDescription
                            v-if="hasSlotContent($slots.description)"
                            as="span"
                            class="mt-1 flex items-center text-sm text-gray-500"
                        >
                            <slot name="description" />
                        </RadioGroupDescription>
                    </div>

                    <RadioGroupDescription
                        v-if="hasSlotContent($slots.footer)"
                        as="span"
                        class="mt-6 text-sm font-medium text-gray-900"
                    >
                        <slot name="footer" />
                    </RadioGroupDescription>
                </span>
            </span>
            <CheckCircleIcon :class="['h-5 w-5 text-primary-600', !checked && 'opacity-0']" :aria-hidden="!checked" />
        </div>
    </RadioGroupOption>
</template>
