<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, type FunctionalComponent } from 'vue';
import { hasSlotContent, usePassthrough } from '@/helpers';
import type { TCardProps } from './types';
import {
    SquaresPlusIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/vue/24/outline';
import {
    SquaresPlusIcon as SquaresPlusIconSolid,
    CheckCircleIcon as CheckCircleIconSolid,
    ExclamationCircleIcon as ExclamationCircleIconSolid,
    ExclamationTriangleIcon as ExclamationTriangleIconSolid,
    InformationCircleIcon as InformationCircleIconSolid,
} from '@heroicons/vue/24/solid';
import { Warning2Icon, DangerIcon, InformationIcon } from '@placetopay/iconsax-vue/bold';
import { bodyStyles, cardStyles } from './styles';

const { size = 'md', iconType = 'solid', icon } = defineProps<TCardProps>();

const { pt, extractor } = usePassthrough();

const [headerClass, headerProps] = extractor(pt.value.header);
const [bodyClass, bodyProps] = extractor(pt.value.body);
const [footerClass, footerProps] = extractor(pt.value.footer);
const [actionsClass, actionsProps] = extractor(pt.value.actions);
const [iconClass, iconProps] = extractor(pt.value.icon);
const [iconContainerClass, iconContainerProps] = extractor(pt.value.iconContainer);

const availableVariants = ['primary', 'success', 'danger', 'warning', 'info'];

const iconData = {
    primary: {
        icon: {
            normal: SquaresPlusIcon,
            ping: SquaresPlusIconSolid,
        },
        background: 'bg-spartan-primary-100',
        color: 'text-spartan-primary-600',
        radial: 'radial-gradient-primary'
    },
    success: {
        icon: {
            normal: CheckCircleIcon,
            ping: CheckCircleIconSolid,
        },
        background: 'bg-green-100',
        color: 'text-green-600',
        radial: 'radial-gradient-green'
    },
    danger: {
        icon: {
            normal: ExclamationCircleIcon,
            ping: Warning2Icon,
        },
        background: 'bg-red-100',
        color: 'text-red-600',
        radial: 'radial-gradient-red'
    },
    warning: {
        icon: {
            normal: ExclamationTriangleIcon,
            ping: DangerIcon,
        },
        background: 'bg-yellow-100',
        color: 'text-yellow-600',
        radial: 'radial-gradient-yellow'
    },
    info: {
        icon: {
            normal: InformationCircleIcon,
            ping: InformationIcon,
        },
        background: 'bg-cyan-100',
        color: 'text-cyan-600',
        radial: 'radial-gradient-cyan'
    },
};

const computedIcon = computed(() => {
    if (typeof icon !== 'string' || !availableVariants.includes(icon)) return null;

    return {
        background: iconData[icon].background,
        icon: iconData[icon].icon,
        color: iconData[icon].color,
        radial: iconData[icon].radial
    };
});
</script>

<template>
    <article :class="twMerge(cardStyles({ size }), $props.class)">
        <template v-if="hasSlotContent($slots.header)">
            <header data-s-header v-bind="headerProps" :class="twMerge(headerClass)"><slot name="header" /></header>
            <hr class="border-gray-200" />
        </template>

        <main :class="twMerge(bodyStyles({ size }), bodyClass)" data-s-body v-bind="bodyProps">
            <template v-if="icon">
                <div v-if="iconType === 'solid'" data-s-iconContainer v-bind="iconContainerProps"
                    :class="
                        twMerge(
                            'mx-auto mb-4 flex justify-center rounded-full bg-gray-100 p-3',
                            computedIcon?.background,
                            iconContainerClass
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
                </div>

                <div v-if="iconType === 'ping'" data-s-iconContainer v-bind="iconContainerProps" :class="twMerge('relative mt-3 mb-11', computedIcon?.radial, iconContainerClass)">
                    <div class="absolute h-[156px] w-[156px] right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border border-opacity-20" />
                    <div class="absolute h-[120px] w-[120px] right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border border-opacity-40" />
                    <div class="absolute h-[84px] w-[84px] right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border border-opacity-60" />
                    <div class="absolute h-[48px] w-[48px] right-1/2 translate-x-1/2 top-1/2 -translate-y-1/2 rounded-full border border-opacity-100" />
                    <component
                        data-s-icon
                        v-bind="iconProps"
                        :is="computedIcon ? computedIcon?.icon.ping : icon"
                        :class="twMerge('h-6 w-6 text-gray-600 mx-auto relative', computedIcon?.color, iconClass)"
                        aria-hidden="true"
                    />
                </div>
            </template>

            <h3 v-if="hasSlotContent($slots.title)" class="text-center text-lg font-semibold text-gray-900">
                <slot name="title" />
            </h3>

            <p v-if="hasSlotContent($slots.description)" class="mt-2 text-center text-sm font-medium text-gray-500">
                <slot name="description" />
            </p>

            <template v-if="hasSlotContent($slots.default)"><slot /></template>

            <div
                v-if="hasSlotContent($slots.actions)"
                data-s-actions
                v-bind="actionsProps"
                :class="twMerge('mt-6 flex flex-col gap-3 sm:flex-row-reverse', actionsClass)"
            >
                <slot name="actions" />
            </div>
        </main>

        <template v-if="hasSlotContent($slots.footer)">
            <hr class="border-gray-200" />
            <footer data-s-footer v-bind="footerProps" :class="twMerge(footerClass)"><slot name="footer" /></footer>
        </template>

        <template v-if="actions && actions.length">
            <hr class="border-gray-200" />
            <section class="flex divide-x divide-gray-200">
                <button
                    v-for="action in actions"
                    :key="action.text"
                    class="flex w-full items-center justify-center gap-2 px-8 py-4 font-medium text-gray-400 hover:bg-gray-50 focus:outline-none"
                    @click="action.onClick"
                >
                    <component :is="action.icon" class="h-5 w-5" />
                    <span>{{ action.text }}</span>
                </button>
            </section>
        </template>
    </article>
</template>

<style>
.radial-gradient-primary > div {
    border-color: rgb(var(--color-spartan-primary-200) / var(--tw-border-opacity));
}
.radial-gradient-primary > div:first-of-type {
    background: var(--color-spartan-primary-200);
    background: radial-gradient(circle, rgb(var(--color-spartan-primary-200) / 0.2) 0%, rgba(0,0,0,0) 50%);
}

.radial-gradient-green > div {
    border-color: rgb(187 247 208 / var(--tw-border-opacity));
}
.radial-gradient-green > div:first-of-type {
    background: rgb(187, 247, 208);
    background: radial-gradient(circle, rgba(187, 247, 208, 0.6) 0%, rgba(0,0,0,0) 50%);
}

.radial-gradient-red > div {
    border-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.radial-gradient-red > div:first-of-type {
    background: rgb(254, 202, 202);
    background: radial-gradient(circle, rgba(254, 202, 202, 0.6) 0%, rgba(0,0,0,0) 50%);
}

.radial-gradient-yellow > div {
    border-color: rgb(254 240 138 / var(--tw-border-opacity));
}
.radial-gradient-yellow > div:first-of-type {
    background: rgb(254, 240, 138);
    background: radial-gradient(circle, rgba(254, 240, 138, 0.2) 0%, rgba(0,0,0,0) 50%);
}

.radial-gradient-cyan > div {
    border-color: rgb(165 243 252 / var(--tw-border-opacity));
}
.radial-gradient-cyan > div:first-of-type {
    background: rgb(165, 243, 252);
    background: radial-gradient(circle, rgba(165, 243, 252, 0.2) 0%, rgba(0,0,0,0) 50%);
}
</style>