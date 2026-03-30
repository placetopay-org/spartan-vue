<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { buildSideContent } from './slotBuilder';
import type { TInputProps, TInputEmits } from './types';
import { twMerge } from 'tailwind-merge';
import { containerStyles, inputStyles } from './styles';

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
    borderless: false,
});

const leftContent = computed(() => buildSideContent('left', props.leftOrderSlots, props, emit));
const rightContent = computed(() => buildSideContent('right', props.rightOrderSlots, props, emit));

const hasLeftAddon = computed(() => !!(props.leftIcon || props.prefix || props.leftOptions));
const hasRightAddon = computed(() => !!(props.rightIcon || props.suffix || props.rightOptions));

const message = (component: string, type: string) => {
    return `The <${component} /> component should be used instead of the <SInput type="${type}"/>`;
};

watchEffect(() => {
    if (props.type === 'checkbox' || props.type === 'radio') {
        console.error(message(`S${props.type.charAt(0).toUpperCase() + props.type.slice(1)}`, props.type));
    }
});

const inputElement = ref<HTMLInputElement>();

defineExpose({ inputElement });
</script>

<template>
    <div
        :class="
            twMerge(
                containerStyles({
                    error,
                    disabled,
                    rounded,
                    hasLeftAddon: hasLeftAddon,
                    hasRightAddon: hasRightAddon,
                    borderless,
                }),
                type === 'hidden' && 'hidden',
                $props.class,
            )
        "
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
            :id
            ref="inputElement"
            :value="modelValue"
            :class="twMerge(inputStyles({ rounded, hasLeftAddon, hasRightAddon }), $props.inputClass)"
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

@media (prefers-color-scheme: dark) {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        -webkit-text-fill-color: #f3f4f6;
        -webkit-box-shadow: 0 0 0px 40rem #111827 inset;
    }
}

:is(.dark) input:-webkit-autofill,
:is(.dark) input:-webkit-autofill:hover,
:is(.dark) input:-webkit-autofill:focus {
    -webkit-text-fill-color: #f3f4f6;
    -webkit-box-shadow: 0 0 0px 40rem #111827 inset;
}
</style>
