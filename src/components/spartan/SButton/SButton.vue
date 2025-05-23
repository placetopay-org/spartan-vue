<script lang="ts">
/**
 * A versatile button component with multiple styles and appearances.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SButton Github}.
 * @see {@link https://develop--646e732a14dfaa707ad59b33.chromatic.com/?path=/docs/buttons-button--docs Storybook}.
 */
export default {
    name: 'SButton',
};
</script>

<script setup lang="ts">
import { buttonStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import { computed, useSlots, useTemplateRef } from 'vue';
import type { TButtonProps } from './types';
import { usePassthrough } from '@/helpers';

// Props and Defaults
const props = withDefaults(defineProps<TButtonProps>(), {
    as: 'button',
    rounded: 'both',
    variant: 'primary',
    size: 'md',
});

// Composables
const slots = useSlots();
const refButton = useTemplateRef<HTMLButtonElement>('ref_button');

// Computed properties
const buttonType = computed(() => (props.as !== 'button' || props.type ? props.type : 'button'));
const rootClass = computed(() => {
    const hasText = slots.default?.()[0].children;
    return twMerge(
        buttonStyles({
            variant: props.variant,
            rounded: props.rounded,
            loading: props.loading,
            disabled: props.disabled,
            [hasText ? 'size:text' : 'size:noText']: props.size,
        }),
        props.class,
    );
});

// Passthrough
const { pt, extractor } = usePassthrough();
const [leftIconClass, leftIconProps] = extractor(pt.value.icon || pt.value.leftIcon);
const [rightIconClass, rightIconProps] = extractor(pt.value.rightIcon);

// Expose
defineExpose({ refButton });
</script>

<template>
    <!-- root -->
    <component :is="as" ref="ref_button" :type="buttonType" :disabled="disabled" :class="rootClass">
        <!-- icon or leftIcon -->
        <component
            v-bind="leftIconProps"
            :is="leftIcon || icon"
            data-s-icon
            :class="twMerge('h-5 w-5', $slots.default?.()[0].children && '-ml-0.5', leftIconClass)"
        />

        <!-- slot -->
        <slot />

        <!-- rightIcon -->
        <component
            v-bind="rightIconProps"
            :is="rightIcon"
            data-s-icon
            :class="twMerge('h-5 w-5', $slots.default?.()[0].children && '-mr-0.5', rightIconClass)"
        />
    </component>
</template>

<style scoped>
.loading {
    color: transparent !important;
    position: relative;
    pointer-events: none;
}

.loading::after {
    animation: spinAround 500ms infinite linear;
    border: 2px solid #dbdbdb;
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: '';
    display: block;
    height: 1em;
    width: 1em;
    position: absolute;
    left: calc(50% - (1em / 2));
    top: calc(50% - (1em / 2));
}

@keyframes spinAround {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
</style>
