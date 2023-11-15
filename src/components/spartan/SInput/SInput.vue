<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import { getRoundedClass, getDisabledClass } from '@/helpers';
import { buildSideContent } from './slotBuilder';
import type { TInputProps, TInputEmits } from './types';
import { twMerge } from 'tailwind-merge';

defineOptions({ inheritAttrs: false });
const emit = defineEmits<TInputEmits>();

const props = withDefaults(defineProps<Partial<TInputProps>>(), {
    class: undefined,
    disabled: false,
    leftIcon: undefined,
    rightIcon: undefined,
    error: false,
    id: undefined,
    leftOption: undefined,
    leftOptions: undefined,
    rightOption: undefined,
    rightOptions: undefined,
    inputClass: undefined,
    modelValue: undefined,
    name: undefined,
    leftOrderSlots: 'selector,text,icon,slot',
    rightOrderSlots: 'slot,icon,text,selector',
    placeholder: undefined,
    prefix: undefined,
    rounded: 'both',
    suffix: undefined,
    type: 'text',
});

const roundedClass = computed(() => getRoundedClass(props.rounded));
const disabledClass = computed(() => getDisabledClass(props.disabled));

const leftContent = computed(() => buildSideContent('left', props.leftOrderSlots, props, emit));
const rightContent = computed(() => buildSideContent('right', props.rightOrderSlots, props, emit));

const message = (component: string, type: string) => {
    return `The <${component} /> component should be used instead of the <SInput type="${type}"/>`;
};

watchEffect(() => {
    if (props.type === 'checkbox' || props.type === 'radio') {
        console.error(message(`S${props.type.charAt(0).toUpperCase() + props.type.slice(1)}`, props.type));
    }
});
</script>

<template>
    <div
        :class="[
            'relative flex gap-2 border border-gray-300 bg-white placeholder:text-gray-400',
            error ? 'border-red-500 focus-within:s-ring-error' : 'border-gray-300 focus-within:s-ring',
            rightOptions ? 'pr-0' : 'pr-3',
            leftOptions ? 'pl-0' : 'pl-3',
            roundedClass,
            disabledClass,
            props.class,
        ]"
    >
        <template v-for="item in leftContent">
            <component
                :is="item.component"
                v-if="item.component"
                :key="item.key"
                v-bind="item.props"
                v-on="item.emits"
            />
            <slot v-else name="left" />
        </template>
        <input
            :id="id"
            :value="modelValue"
            :class="twMerge('w-full border-none px-0 py-2 text-gray-900 focus:ring-0', roundedClass, inputClass)"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            :type="type"
            v-bind="$attrs"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
        <template v-for="item in rightContent">
            <component
                :is="item.component"
                v-if="item.component"
                :key="item.key"
                v-bind="item.props"
                v-on="item.emits"
            />
            <slot v-else name="right" />
        </template>
    </div>
</template>

<style scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
    -webkit-text-fill-color: #111827;
    -webkit-box-shadow: 0 0 0px 40rem #ffff inset;
}
</style>
