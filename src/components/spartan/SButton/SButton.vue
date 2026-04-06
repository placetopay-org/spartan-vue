<script lang="ts">
/**
 * A versatile button component with multiple styles and appearances.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SButton Github}.
 * @see {@link https://www.figma.com/design/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=146-240 Figma}.
 */
export default {
    name: 'SButton',
    inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { buttonStyles } from './styles';
import { usePassthrough } from '@/helpers';
import { computed, useSlots, useTemplateRef } from 'vue';
import type { TButtonProps } from './types';
import Spinner from './Spinner.vue';

// Props and Defaults
const {
    as = 'button',
    rounded = 'both',
    variant = 'primary',
    size = 'md',
    disabled,
    loading,
    outline,
    link,
    circular,
    type,
    icon,
    leftIcon,
    rightIcon,
    class: propClass,
} = defineProps<TButtonProps>();

// Composables
const slots = useSlots();
const refButton = useTemplateRef<HTMLButtonElement>('ref_button');

// Computed properties
const buttonType = computed(() => (as !== 'button' || type ? type : 'button'));
const rootClass = computed(() => {
    const hasText = !circular && slots.default?.()?.[0]?.children;
    return twMerge(
        buttonStyles({
            variant,
            rounded: circular ? 'full' : rounded,
            loading,
            disabled,
            outline: !link && outline,
            link,
            circular,
            [hasText ? 'size:text' : 'size:noText']: size,
        }),
        propClass,
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
    <div :class="loading ? 'relative inline-flex' : 'contents'">
        <!-- root -->
        <component
            :is="as"
            v-bind="$attrs"
            ref="ref_button"
            :type="buttonType"
            :disabled="disabled || loading"
            :class="rootClass"
        >
            <!-- icon or leftIcon -->
            <component
                v-bind="leftIconProps"
                :is="leftIcon || icon"
                data-s-left-icon
                :class="twMerge('h-5 w-5', !circular && $slots.default?.()?.[0]?.children && '-ml-0.5', leftIconClass)"
            />

            <!-- slot (suppressed in circular mode) -->
            <slot v-if="!circular" />

            <!-- rightIcon -->
            <component
                v-if="!circular"
                v-bind="rightIconProps"
                :is="rightIcon"
                data-s-right-icon
                :class="twMerge('h-5 w-5', $slots.default?.()?.[0]?.children && '-mr-0.5', rightIconClass)"
            />
        </component>

        <!-- loading overlay + spinner -->
        <Spinner v-if="loading" :variant :outline :link />
    </div>
</template>
