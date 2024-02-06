<script setup lang="ts">
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { hasSlotContent } from '@/helpers';
import type { TCheckboxProps } from './types';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean | string[]): void;
}>();

const props = defineProps<TCheckboxProps>();
const computedId = computed(() => props.id ?? uuidv4());
const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) return props.modelValue.includes(props.value as string);
    return props.modelValue;
});

const updateModelValue = (event: Event) => {
    let isChecked = (event.target as HTMLInputElement).checked;
    let value = (event.target as HTMLInputElement).value;

    if (props.modelValue instanceof Array) {
        let newValue = [...props.modelValue];
        if (isChecked) newValue.push(value);
        else newValue.splice(newValue.indexOf(value), 1);
        emit('update:modelValue', newValue);
    } else {
        emit('update:modelValue', isChecked);
    }
};
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
            :checked="isChecked"
            class="cursor-pointer rounded border border-gray-300 bg-white text-primary-600 accent-primary-600 focus:ring-offset-0 focus:s-ring"
            type="checkbox"
            :disabled="disabled"
            :name="name"
            :value="value"
            @change="updateModelValue"
        />
        <div
            v-if="hasSlotContent($slots.default) || hasSlotContent($slots.description)"
            :class="[
                'flex flex-col justify-center',
                $slots.default && $slots.description && 'gap-1',
                hasSlotContent($slots.description) ? '-mt-1' : '-mt-0.5',
            ]"
        >
            <label v-if="hasSlotContent($slots.default) && !inline" :for="computedId" class="text-sm font-semibold text-gray-900">
                <slot />
            </label>
            <p v-if="hasSlotContent($slots.description)" :class="['text-sm font-normal text-gray-500', inline && '']">
                <label v-if="hasSlotContent($slots.default) && inline" :for="computedId" class="text-sm font-semibold text-gray-900">
                    <slot />
                </label>
                <slot name="description" />
            </p>
        </div>
    </div>
</template>