<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { ref, computed } from 'vue';
import { hasSlotContent } from '@/helpers';

const emit = defineEmits<{
    (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<{
    disabled?: boolean;
    id?: string;
    inline?: boolean;
    modelValue: boolean;
    name?: string;
    reverse?: boolean;
    value: string;
}>();

const internalValue = ref(props.modelValue);
const model = computed({
    get() {
        return props.modelValue ?? internalValue.value;
    },
    set(newValue) {
        internalValue.value = newValue;
        emit('update:modelValue', newValue);
    },
});

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
            v-model="model"
            class="cursor-pointer rounded-full border border-gray-300 bg-white text-primary-600 accent-primary-600 focus:ring-offset-0 focus:s-ring"
            type="radio"
            :disabled="disabled"
            :name="name"
            :value="value"
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
