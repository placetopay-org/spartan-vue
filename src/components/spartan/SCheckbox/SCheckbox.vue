<script setup lang="ts">
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { hasSlotContent } from '@/helpers';
import type { TCheckboxProps } from './type';

defineOptions({ inheritAttrs: false });

defineEmits<{
    (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<Partial<TCheckboxProps>>();
const computedId = computed(() => props.id ?? uuidv4());
</script>

<template>
    <div
        :class="[
            'flex w-full gap-3',
            reverse && 'flex-row-reverse justify-between',
            disabled && 'pointer-events-none opacity-50',
        ]"
    >
        <input
            :id="computedId"
            v-bind="$attrs"
            :checked="modelValue"
            class="cursor-pointer rounded border border-gray-300 bg-white text-primary-600 accent-primary-600 focus:ring-offset-0 focus:s-ring"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :value="value"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <div
            v-if="hasSlotContent($slots.default) || hasSlotContent($slots.description)"
            :class="[
                'flex flex-col justify-center',
                $slots.default && $slots.description && 'gap-1',
                hasSlotContent($slots.description) ? '-mt-1' : '-mt-0.5',
            ]"
        >
            <label v-if="hasSlotContent($slots.default) && !inline" :for="computedId" class="label">
                <slot />
            </label>
            <p v-if="hasSlotContent($slots.description)" :class="['text-sm font-normal text-gray-500', inline && '']">
                <label v-if="hasSlotContent($slots.default) && inline" :for="computedId" class="label">
                    <slot />
                </label>
                <slot name="description" />
            </p>
        </div>
    </div>
</template>

<style>
.label {
    @apply text-sm font-semibold text-gray-900;
}
</style>
