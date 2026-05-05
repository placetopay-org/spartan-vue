<script setup lang="ts">
import {
    VerifyIcon as VerifyIconBulk,
    Warning2Icon as Warning2IconBulk,
    DangerIcon as DangerIconBulk,
    InformationIcon as InformationIconBulk,
} from '@placetopay/iconsax-vue/bulk';
import { VerifyIcon, Warning2Icon, DangerIcon, InformationIcon } from '@placetopay/iconsax-vue/outline';
import { computed } from 'vue';
import type { TCardProps } from '../types';
import { twMerge } from 'tailwind-merge';

const {
    icon,
    iconColor,
    size = 'md',
    ptIcon,
    ptIconContainer,
} = defineProps<{
    icon?: TCardProps['icon'];
    iconColor?: TCardProps['iconColor'];
    iconType: TCardProps['iconType'];
    size?: TCardProps['size'];
    ptIcon: any[];
    ptIconContainer: any[];
}>();

const [iconClass, iconProps] = ptIcon;
const [iconContainerClass, iconContainerProps] = ptIconContainer;

const iconGlyphs = {
    success: { normal: VerifyIcon, ping: VerifyIconBulk },
    danger: { normal: Warning2Icon, ping: Warning2IconBulk },
    warning: { normal: DangerIcon, ping: DangerIconBulk },
    info: { normal: InformationIcon, ping: InformationIconBulk },
};

const colorPalette = {
    primary: {
        background: 'bg-spartan-primary-100 dark:bg-spartan-primary-500/10',
        color: 'text-spartan-primary-600 dark:text-spartan-primary-400',
        radial: 'radial-gradient-primary',
    },
    secondary: {
        background: 'bg-gray-100 dark:bg-white/10',
        color: 'text-gray-500 dark:text-gray-400',
        radial: 'radial-gradient-gray',
    },
    success: {
        background: 'bg-green-100 dark:bg-green-500/10',
        color: 'text-green-600 dark:text-green-400',
        radial: 'radial-gradient-green',
    },
    danger: {
        background: 'bg-red-100 dark:bg-red-500/10',
        color: 'text-red-600 dark:text-red-400',
        radial: 'radial-gradient-red',
    },
    warning: {
        background: 'bg-yellow-100 dark:bg-yellow-500/10',
        color: 'text-yellow-600 dark:text-yellow-400',
        radial: 'radial-gradient-yellow',
    },
    info: {
        background: 'bg-cyan-100 dark:bg-cyan-500/10',
        color: 'text-cyan-600 dark:text-cyan-400',
        radial: 'radial-gradient-cyan',
    },
};

const ringConfig = computed(() => {
    const dimensions =
        size === 'sm'
            ? ['h-[120px] w-[120px]', 'h-[84px] w-[84px]', 'h-[48px] w-[48px]']
            : ['h-[156px] w-[156px]', 'h-[120px] w-[120px]', 'h-[84px] w-[84px]', 'h-[48px] w-[48px]'];
    const count = dimensions.length;
    return dimensions.map((d, i) => ({
        dimensions: d,
        alpha: count === 1 ? 0.8 : 0.1 + (0.7 * i) / (count - 1),
    }));
});

const computedIcon = computed(() => {
    if (!icon) return null;

    const stringIcon = typeof icon === 'string' ? icon : null;
    const colorKey = iconColor ?? stringIcon;

    return {
        background: colorKey ? colorPalette[colorKey].background : undefined,
        color: colorKey ? colorPalette[colorKey].color : undefined,
        radial: colorKey ? colorPalette[colorKey].radial : undefined,
        glyph: stringIcon ? iconGlyphs[stringIcon] : null,
    };
});
</script>

<template>
    <template v-if="icon">
        <div
            v-if="iconType === 'solid'"
            data-s-iconContainer
            v-bind="iconContainerProps"
            :class="
                twMerge(
                    'flex justify-center rounded-full bg-gray-100 p-3 dark:bg-white/10',
                    computedIcon?.background,
                    iconContainerClass,
                )
            "
        >
            <component
                v-bind="iconProps"
                :is="computedIcon?.glyph?.normal ?? icon"
                data-s-icon
                :class="twMerge('h-6 w-6 text-gray-600 dark:text-gray-400', computedIcon?.color, iconClass)"
                aria-hidden="true"
            />
        </div>

        <div
            v-if="iconType === 'ping'"
            data-s-iconContainer
            v-bind="iconContainerProps"
            :class="twMerge('relative -mb-1', computedIcon?.radial, iconContainerClass)"
        >
            <div
                v-for="(ring, index) in ringConfig"
                :key="index"
                :class="[
                    'absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-full border',
                    ring.dimensions,
                ]"
                :style="{ '--ring-alpha': ring.alpha }"
            />
            <component
                v-bind="iconProps"
                :is="computedIcon?.glyph?.ping ?? icon"
                data-s-icon
                :class="
                    twMerge('relative mx-auto h-6 w-6 text-gray-600 dark:text-gray-400', computedIcon?.color, iconClass)
                "
                aria-hidden="true"
            />
        </div>
    </template>
</template>

<style>
/* Ring border colors are literal RGB values matching these palette tokens:
   primary → spartan-primary-200, gray → gray-200, green → green-200,
   red → red-200, yellow → yellow-200, cyan → cyan-200.
   Per-ring alpha is supplied via --ring-alpha inline style, computed in JS so the
   fade curve adapts to ring count (4 in md, 3 in sm). */
.radial-gradient-primary > div {
    border-color: rgb(255 204 141 / var(--ring-alpha, 1));
}
.radial-gradient-primary > div:first-of-type {
    background: radial-gradient(circle, rgb(255 204 141 / 0.2) 0%, transparent 50%);
}

.radial-gradient-gray > div {
    border-color: rgb(229 231 235 / var(--ring-alpha, 1));
}
.radial-gradient-gray > div:first-of-type {
    background: radial-gradient(circle, rgb(229 231 235 / 0.6) 0%, transparent 50%);
}

.radial-gradient-green > div {
    border-color: rgb(187 247 208 / var(--ring-alpha, 1));
}
.radial-gradient-green > div:first-of-type {
    background: radial-gradient(circle, rgb(187 247 208 / 0.6) 0%, transparent 50%);
}

.radial-gradient-red > div {
    border-color: rgb(254 202 202 / var(--ring-alpha, 1));
}
.radial-gradient-red > div:first-of-type {
    background: radial-gradient(circle, rgb(254 202 202 / 0.6) 0%, transparent 50%);
}

.radial-gradient-yellow > div {
    border-color: rgb(254 240 138 / var(--ring-alpha, 1));
}
.radial-gradient-yellow > div:first-of-type {
    background: radial-gradient(circle, rgb(254 240 138 / 0.2) 0%, transparent 50%);
}

.radial-gradient-cyan > div {
    border-color: rgb(165 243 252 / var(--ring-alpha, 1));
}
.radial-gradient-cyan > div:first-of-type {
    background: radial-gradient(circle, rgb(165 243 252 / 0.2) 0%, transparent 50%);
}

/* Dark mode: -500 shade for ring borders (saturated tint visible on bg-gray-800)
   and roughly half the central gradient alpha to avoid blow-out. */
.dark .radial-gradient-primary > div {
    border-color: rgb(255 126 41 / var(--ring-alpha, 1));
}
.dark .radial-gradient-primary > div:first-of-type {
    background: radial-gradient(circle, rgb(255 126 41 / 0.1) 0%, transparent 50%);
}

.dark .radial-gradient-gray > div {
    border-color: rgb(156 163 175 / var(--ring-alpha, 1));
}
.dark .radial-gradient-gray > div:first-of-type {
    background: radial-gradient(circle, rgb(156 163 175 / 0.25) 0%, transparent 50%);
}

.dark .radial-gradient-green > div {
    border-color: rgb(34 197 94 / var(--ring-alpha, 1));
}
.dark .radial-gradient-green > div:first-of-type {
    background: radial-gradient(circle, rgb(34 197 94 / 0.25) 0%, transparent 50%);
}

.dark .radial-gradient-red > div {
    border-color: rgb(239 68 68 / var(--ring-alpha, 1));
}
.dark .radial-gradient-red > div:first-of-type {
    background: radial-gradient(circle, rgb(239 68 68 / 0.25) 0%, transparent 50%);
}

.dark .radial-gradient-yellow > div {
    border-color: rgb(234 179 8 / var(--ring-alpha, 1));
}
.dark .radial-gradient-yellow > div:first-of-type {
    background: radial-gradient(circle, rgb(234 179 8 / 0.1) 0%, transparent 50%);
}

.dark .radial-gradient-cyan > div {
    border-color: rgb(6 182 212 / var(--ring-alpha, 1));
}
.dark .radial-gradient-cyan > div:first-of-type {
    background: radial-gradient(circle, rgb(6 182 212 / 0.1) 0%, transparent 50%);
}
</style>
