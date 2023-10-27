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
import { buttonStyles, type TButtonStyles } from './styles';
import { twMerge } from 'tailwind-merge';
import { type FunctionalComponent } from 'vue';

const props = withDefaults(
    defineProps<
        Partial<{
            as: string;
            disabled: boolean;
            endIcon: boolean;
            icon: FunctionalComponent;
            loading: boolean;
            rounded: TButtonStyles['rounded'];
            size: TButtonStyles['size'];
            type: 'button' | 'submit';
            variant: TButtonStyles['variant'];
        }>
    >(),
    {
        as: 'button',
        disabled: false,
        endIcon: false,
        icon: undefined,
        loading: false,
        rounded: 'both',
        size: 'md',
        type: 'button',
        variant: 'primary',
    },
);
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
                    endIcon,
                }),
            )
        "
        :disabled="disabled"
    >
        <component
            :is="icon"
            :class="twMerge('h-5 w-5', $slots.default?.()[0].children && (props.endIcon ? '-mr-0.5' : '-ml-0.5'))"
        />
        <slot />
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
