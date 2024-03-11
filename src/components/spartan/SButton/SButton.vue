<script lang="ts">
/**
 * A versatile button component with multiple styles and appearances.
 * @see {@link https://github.com/placetopay-org/spartan-vue Github}.
 */
export default {
    name: 'SButton',
};
</script>

<script setup lang="ts">
import { buttonStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import type { TButtonProps } from './types';
import { computed } from 'vue';

const props = withDefaults(defineProps<Partial<TButtonProps>>(), {
    as: 'button',
    disabled: false,
    loading: false,
    rounded: 'both',
    size: 'md',
    type: 'button',
    variant: 'primary',
});

// TODO: Remove icon prop in favor of leftIcon use
const finalLeftIcon = computed(() => {
    if (props.leftIcon) return props.leftIcon;
    return props.icon;
});
</script>

<template>
    <component
        :is="as || 'button'"
        :ref="$attrs.reference"
        :type="as && as === 'button' ? type : undefined"
        :class="
            twMerge(
                buttonStyles({
                    variant,
                    [$slots.default?.()[0].children ? 'size:text' : 'size:noText']: props.size,
                    rounded,
                    loading,
                }),
                $props.class
            )
        "
        :disabled="disabled"
    >
        <component
            :is="finalLeftIcon"
            :class="twMerge('h-5 w-5', $slots.default?.()[0].children && '-ml-0.5')"
        />
        <slot />
        <component
            :is="rightIcon"
            :class="twMerge('h-5 w-5', $slots.default?.()[0].children && '-mr-0.5' )"
        />
    </component>
</template>

<style>
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
