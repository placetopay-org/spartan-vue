<script setup lang="ts">
import {
    SquaresPlusIcon,
    CheckCircleIcon,
} from '@heroicons/vue/24/outline';
import {
    SquaresPlusIcon as SquaresPlusIconSolid,
    CheckCircleIcon as CheckCircleIconSolid,
} from '@heroicons/vue/24/solid';
import { ElementPlusIcon as ElementPlusIconBulk, MessageSearchIcon as MessageSearchIconBulk, VerifyIcon as VerifyIconBulk, Warning2Icon as Warning2IconBulk, DangerIcon as DangerIconBulk, InformationIcon as InformationIconBulk } from '@placetopay/iconsax-vue/bulk';
import { ElementPlusIcon, MessageSearchIcon, VerifyIcon, Warning2Icon, DangerIcon, InformationIcon } from '@placetopay/iconsax-vue/outline';
import { computed } from 'vue';
import type { TCardProps } from '../types';
import { twMerge } from 'tailwind-merge';

const { icon, PtIcon, PtIconContainer } = defineProps<{
    icon: TCardProps['icon'];
    iconType: TCardProps['iconType'];
    PtIcon: any[];
    PtIconContainer: any[];
}>();

const [iconClass, iconProps] = PtIcon;
const [iconContainerClass, iconContainerProps] = PtIconContainer;

const availableVariants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];

const iconData = {
    primary: {
        icon: {
            normal: ElementPlusIcon,
            ping: ElementPlusIconBulk,
        },
        background: 'bg-spartan-primary-100',
        color: 'text-spartan-primary-600',
        radial: 'radial-gradient-primary',
    },
    secondary: {
        icon: {
            normal: MessageSearchIcon,
            ping: MessageSearchIconBulk,
        },
        background: 'bg-gray-100',
        color: 'text-gray-500',
        radial: 'radial-gradient-gray',
    },
    success: {
        icon: {
            normal: VerifyIcon,
            ping: VerifyIconBulk,
        },
        background: 'bg-green-100',
        color: 'text-green-600',
        radial: 'radial-gradient-green',
    },
    danger: {
        icon: {
            normal: Warning2Icon,
            ping: Warning2IconBulk,
        },
        background: 'bg-red-100',
        color: 'text-red-600',
        radial: 'radial-gradient-red',
    },
    warning: {
        icon: {
            normal: DangerIcon,
            ping: DangerIconBulk,
        },
        background: 'bg-yellow-100',
        color: 'text-yellow-600',
        radial: 'radial-gradient-yellow',
    },
    info: {
        icon: {
            normal: InformationIcon,
            ping: InformationIconBulk,
        },
        background: 'bg-cyan-100',
        color: 'text-cyan-600',
        radial: 'radial-gradient-cyan',
    },
};

const computedIcon = computed(() => {
    if (typeof icon !== 'string' || !availableVariants.includes(icon)) return null;

    return {
        background: iconData[icon].background,
        icon: iconData[icon].icon,
        color: iconData[icon].color,
        radial: iconData[icon].radial,
    };
});
</script>

<template>
    <template v-if="icon">
        <section
            v-if="iconType === 'solid'"
            data-s-iconContainer
            v-bind="iconContainerProps"
            :class="
                twMerge(
                    'mx-auto -mb-4 mt-[16px] flex justify-center rounded-full bg-gray-100 p-3',
                    computedIcon?.background,
                    iconContainerClass,
                )
            "
        >
            <component
                data-s-icon
                v-bind="iconProps"
                :is="computedIcon ? computedIcon?.icon.normal : icon"
                :class="twMerge('h-6 w-6 text-gray-600', computedIcon?.color, iconClass)"
                aria-hidden="true"
            />
        </section>

        <section
            v-if="iconType === 'ping'"
            data-s-iconContainer
            v-bind="iconContainerProps"
            :class="twMerge('relative -mb-1 mt-[28px]', computedIcon?.radial, iconContainerClass)"
        >
            <div
                class="absolute right-1/2 top-1/2 h-[156px] w-[156px] -translate-y-1/2 translate-x-1/2 rounded-full border border-opacity-20"
            />
            <div
                class="absolute right-1/2 top-1/2 h-[120px] w-[120px] -translate-y-1/2 translate-x-1/2 rounded-full border border-opacity-40"
            />
            <div
                class="absolute right-1/2 top-1/2 h-[84px] w-[84px] -translate-y-1/2 translate-x-1/2 rounded-full border border-opacity-60"
            />
            <div
                class="absolute right-1/2 top-1/2 h-[48px] w-[48px] -translate-y-1/2 translate-x-1/2 rounded-full border border-opacity-100"
            />
            <component
                data-s-icon
                v-bind="iconProps"
                :is="computedIcon ? computedIcon?.icon.ping : icon"
                :class="twMerge('relative mx-auto h-6 w-6 text-gray-600', computedIcon?.color, iconClass)"
                aria-hidden="true"
            />
        </section>
    </template>
</template>

<style>
.radial-gradient-primary > div {
    border-color: rgb(var(--color-spartan-primary-200) / var(--tw-border-opacity));
}
.radial-gradient-primary > div:first-of-type {
    background: var(--color-spartan-primary-200);
    background: radial-gradient(circle, rgb(var(--color-spartan-primary-200) / 0.2) 0%, rgba(0, 0, 0, 0) 50%);
}

.radial-gradient-gray > div {
    border-color: rgb(229 231 235 / var(--tw-border-opacity));
}
.radial-gradient-gray > div:first-of-type {
    background: rgb(229, 231, 235);
    background: radial-gradient(circle, rgba(229, 231, 235, 0.6) 0%, rgba(0, 0, 0, 0) 50%);
}

.radial-gradient-green > div {
    border-color: rgb(187 247 208 / var(--tw-border-opacity));
}
.radial-gradient-green > div:first-of-type {
    background: rgb(187, 247, 208);
    background: radial-gradient(circle, rgba(187, 247, 208, 0.6) 0%, rgba(0, 0, 0, 0) 50%);
}

.radial-gradient-red > div {
    border-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.radial-gradient-red > div:first-of-type {
    background: rgb(254, 202, 202);
    background: radial-gradient(circle, rgba(254, 202, 202, 0.6) 0%, rgba(0, 0, 0, 0) 50%);
}

.radial-gradient-yellow > div {
    border-color: rgb(254 240 138 / var(--tw-border-opacity));
}
.radial-gradient-yellow > div:first-of-type {
    background: rgb(254, 240, 138);
    background: radial-gradient(circle, rgba(254, 240, 138, 0.2) 0%, rgba(0, 0, 0, 0) 50%);
}

.radial-gradient-cyan > div {
    border-color: rgb(165 243 252 / var(--tw-border-opacity));
}
.radial-gradient-cyan > div:first-of-type {
    background: rgb(165, 243, 252);
    background: radial-gradient(circle, rgba(165, 243, 252, 0.2) 0%, rgba(0, 0, 0, 0) 50%);
}
</style>