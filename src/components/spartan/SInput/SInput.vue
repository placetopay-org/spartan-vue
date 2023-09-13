<script setup lang="ts">
import { computed, type FunctionalComponent, useSlots, ref, watchEffect } from 'vue';

export type TInputProps = {
    disabled: boolean;
    endIcon: FunctionalComponent;
    error: boolean;
    id: string;
    icon: FunctionalComponent;
    modelValue: string | number;
    name: string;
    placeholder: string;
    prefix: string;
    rounded: keyof typeof roundedClass;
    suffix: string;
    type: string;
};

defineOptions({ inheritAttrs: false });

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Partial<TInputProps>>(), {
    disabled: false,
    endIcon: undefined,
    error: false,
    id: undefined,
    icon: undefined,
    modelValue: undefined,
    name: undefined,
    placeholder: undefined,
    prefix: undefined,
    rounded: 'both',
    suffix: undefined,
    type: 'text',
});

const slots = useSlots();

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

const roundedClass = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
};

const errorClass = computed(() => {
    return props.error
        ? `border-red-500 ${inputHasFocus.value && 's-ring-error'}`
        : `border-gray-300 ${inputHasFocus.value && 's-ring'}`;
});

const isRightRounded = computed(() => {
    return props.rounded === 'right' || props.rounded === 'both';
});

const isLeftRounded = computed(() => {
    return props.rounded === 'left' || props.rounded === 'both';
});

const leftContent = computed(() => Boolean(props.icon || props.prefix));
const rightContent = computed(() => Boolean(props.endIcon || props.suffix || slots.options));

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
            'relative flex w-full border bg-white placeholder:text-gray-400',
            errorClass,
            roundedClass[rounded],
            disabled && 'pointer-events-none opacity-50',
        ]"
    >
        <div v-if="leftContent" :class="['flex items-center', isLeftRounded && 'rounded-l-lg']">
            <span v-if="prefix" class="ml-3 text-gray-500">{{ prefix }}</span>
            <component :is="icon" v-else-if="icon" class="ml-3 h-6 w-6 text-gray-500" />
        </div>
        <input
            :id="id"
            v-model="model"
            :class="[
                'w-full border-none focus:ring-0',
                leftContent && 'pl-2',
                rightContent && 'pr-2',
                roundedClass[rounded],
            ]"
            :disabled="disabled"
            :name="name"
            :placeholder="placeholder"
            :type="type"
            v-bind="$attrs"
            @focus="inputHasFocus = true"
            @blur="inputHasFocus = false"
        />
        <div
            v-if="rightContent"
            :class="[
                '-m-px flex items-center border border-transparent focus-within:s-ring',
                isRightRounded && 'rounded-r-lg',
            ]"
        >
            <select v-if="$slots.options" class="rounded-lg border-none text-sm text-gray-500 focus:ring-0">
                <slot name="options" />
            </select>
            <span v-else-if="suffix" class="mr-3 text-gray-500">{{ suffix }}</span>
            <component :is="endIcon" v-else-if="endIcon" class="mr-3 h-6 w-6 text-gray-500" />
        </div>
    </div>
</template>
