<script setup lang="ts">
import { computed, ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { hasSlotContent } from '@/helpers';
import { radioContainerStyles, radioInputStyles, radioLabelStyles, radioDescriptionStyles } from './styles';
import type { TRadioProps } from './types';

defineOptions({ inheritAttrs: false });

const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean | string): void;
}>();

const { disabled, id, inline, name, reverse, value } = defineProps<TRadioProps>();

const internalValue = ref<boolean | string>('');
const model = computed({
    get() {
        return internalValue.value;
    },
    set(newValue) {
        internalValue.value = newValue;
        emit('update:modelValue', newValue);
    },
});

const computedId = computed(() => id ?? uuidv4());
</script>

<template>
    <div :class="radioContainerStyles({ reverse, disabled })">
        <input
            :id="computedId"
            v-bind="$attrs"
            v-model="model"
            :class="radioInputStyles()"
            type="radio"
            :disabled
            :name
            :value
        />
        <div
            v-if="hasSlotContent($slots.default) || hasSlotContent($slots.description)"
            :class="[
                'flex flex-col justify-center',
                $slots.default && $slots.description && 'gap-1',
                hasSlotContent($slots.description) ? '-mt-1' : '-mt-0.5',
            ]"
        >
            <label v-if="hasSlotContent($slots.default) && !inline" :for="computedId" :class="radioLabelStyles()">
                <slot />
            </label>
            <p v-if="hasSlotContent($slots.description)" :class="radioDescriptionStyles()">
                <label
                    v-if="hasSlotContent($slots.default) && inline"
                    :for="computedId"
                    :class="[radioLabelStyles(), 'mr-1']"
                >
                    <slot />
                </label>
                <slot name="description" />
            </p>
        </div>
    </div>
</template>
