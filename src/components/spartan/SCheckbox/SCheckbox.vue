<script setup lang="ts">
import { computed } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { hasSlotContent } from '@/helpers';
import { checkboxContainerStyles, checkboxInputStyles, checkboxLabelStyles, checkboxDescriptionStyles } from './styles';
import type { TCheckboxProps } from './types';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean | string[]): void;
}>();

const { disabled, id, inline, modelValue, name, reverse, value } = defineProps<TCheckboxProps>();
const computedId = computed(() => id ?? uuidv4());
const isChecked = computed(() => {
    if (Array.isArray(modelValue)) return modelValue.includes(value as string);
    return modelValue;
});

const updateModelValue = (event: Event) => {
    let isChecked = (event.target as HTMLInputElement).checked;
    let value = (event.target as HTMLInputElement).value;

    if (modelValue instanceof Array) {
        let newValue = [...modelValue];
        if (isChecked) newValue.push(value);
        else newValue.splice(newValue.indexOf(value), 1);
        emit('update:modelValue', newValue);
    } else {
        emit('update:modelValue', isChecked);
    }
};
</script>

<template>
    <div :class="checkboxContainerStyles({ reverse, disabled })">
        <input
            :id="computedId"
            v-bind="$attrs"
            :checked="isChecked"
            :class="checkboxInputStyles()"
            type="checkbox"
            :disabled
            :name
            :value
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
            <label v-if="hasSlotContent($slots.default) && !inline" :for="computedId" :class="checkboxLabelStyles()">
                <slot />
            </label>
            <p v-if="hasSlotContent($slots.description)" :class="checkboxDescriptionStyles()">
                <label
                    v-if="hasSlotContent($slots.default) && inline"
                    :for="computedId"
                    :class="[checkboxLabelStyles(), 'mr-1']"
                >
                    <slot />
                </label>
                <slot name="description" />
            </p>
        </div>
    </div>
</template>
