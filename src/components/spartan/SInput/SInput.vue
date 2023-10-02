<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { getRoundedClass, getDisabledClass } from '@/helpers';
import { buildSideContent } from './slotBuilder';
import type { TInputProps } from './types';

defineOptions({ inheritAttrs: false });
const emit = defineEmits<{
    (event: 'update:modelValue', value: string | number | undefined): void;
}>();

const props = withDefaults(defineProps<Partial<TInputProps>>(), {
    class: undefined,
    disabled: false,
    leftIcon: undefined,
    rightIcon: undefined,
    error: false,
    id: undefined,
    leftOptions: undefined,
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

const value = ref(props.modelValue);
const model = computed({
    get() {
        return props.modelValue ?? value.value;
    },
    set(newValue) {
        value.value = newValue;
        emit('update:modelValue', newValue);
    },
});

const inputHasFocus = ref(false);

const borderClass = computed(() => {
    return props.error
        ? `border-red-500 ${inputHasFocus.value ? 's-ring-error' : ''}`
        : `border-gray-300 ${inputHasFocus.value ? 's-ring' : ''}`;
});

const roundedClass = computed(() => getRoundedClass(props.rounded));
const disabledClass = computed(() => getDisabledClass(props.disabled));

const leftContent = computed(() => buildSideContent('left', props.leftOrderSlots, props));
const rightContent = computed(() => buildSideContent('right', props.rightOrderSlots, props));

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
            'relative flex w-full gap-2 border border-gray-300 bg-white placeholder:text-gray-400',
            rightOptions ? 'pr-0' : 'pr-3',
            leftOptions ? 'pl-0' : 'pl-3',
            borderClass,
            roundedClass,
            disabledClass,
            props.class,
        ]"
    >
        <template v-for="item in leftContent">
            <component :is="item.component" v-if="item.component" :key="item.key" v-bind="item.props" />
            <slot v-else name="left" />
        </template>
        <input
            :id="id"
            v-model="model"
            :class="['w-full border-none px-0 py-2 focus:ring-0', roundedClass, inputClass]"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            :type="type"
            v-bind="$attrs"
            @focus="inputHasFocus = true"
            @blur="inputHasFocus = false"
        />
        <template v-for="item in rightContent">
            <component :is="item.component" v-if="item.component" :key="item.key" v-bind="item.props" />
            <slot v-else name="right" />
        </template>
    </div>
</template>
