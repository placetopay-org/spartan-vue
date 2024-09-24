<script setup lang="ts">
import { twMerge } from 'tailwind-merge';
import { computed, type FunctionalComponent } from 'vue';
import { hasSlotContent } from '@/helpers';
import type { TCardProps } from './types';
import {
    SquaresPlusIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/vue/24/outline';

const props = withDefaults(defineProps<Partial<TCardProps>>(), {
    class: '',
    size: 'md',
    bodyAccent: false,
    headerAccent: false,
    footerAccent: false,
    bodyClass: '',
    headerClass: '',
    footerClass: '',
    iconClass: '',
    iconVariant: undefined,
    iconContainerClass: '',
    icon: undefined,
    actions: undefined,
});

const roundedStyle = computed(() => (props.size === 'md' ? 'rounded-xl' : 'rounded-md'));
const paddingMainStyle = computed(() => (props.size === 'md' ? 'px-4 py-5 sm:p-6' : 'px-2 py-1 sm:px-4 sm:py-2'));
const iconData = {
    primary: {
        background: 'bg-spartan-primary-100',
        icon: SquaresPlusIcon,
        color: 'text-spartan-primary-600',
    },
    success: {
        background: 'bg-green-100',
        icon: CheckCircleIcon,
        color: 'text-green-600',
    },
    danger: {
        background: 'bg-red-100',
        icon: ExclamationCircleIcon,
        color: 'text-red-600',
    },
    warning: {
        background: 'bg-yellow-100',
        icon: ExclamationTriangleIcon,
        color: 'text-yellow-600',
    },
    info: {
        background: 'bg-cyan-100',
        icon: InformationCircleIcon,
        color: 'text-cyan-600',
    },
};

const iconStyles = computed(() => {
    const styles = {
        background: '',
        icon: undefined as FunctionalComponent | undefined,
        color: '',
    };

    if (props.iconVariant) {
        styles.background = iconData[props.iconVariant].background;
        styles.icon = iconData[props.iconVariant].icon;
        styles.color = iconData[props.iconVariant].color;
    }

    return styles;
});

const accentStyle = computed(() => {
    const accentClass = 'bg-gray-50';

    return {
        header: props.headerAccent ? accentClass : '',
        body: props.bodyAccent ? accentClass : '',
        footer: props.footerAccent ? accentClass : '',
    };
});
</script>

<template>
    <article :class="twMerge('flex flex-col overflow-hidden bg-white shadow duration-200', roundedStyle, props.class)">
        <template v-if="hasSlotContent($slots.header)">
            <header :class="[accentStyle.header, headerClass]"><slot name="header" /></header>
            <hr class="border-gray-200" />
        </template>

        <section :class="['flex h-full flex-col', paddingMainStyle, accentStyle.body]">
            <div
                v-if="icon || iconStyles.icon"
                :class="
                    twMerge(
                        'mx-auto mb-4 flex justify-center rounded-full bg-gray-100 p-3',
                        iconStyles.background,
                        iconContainerClass,
                    )
                "
            >
                <component
                    :is="icon ? icon : iconStyles.icon"
                    :class="twMerge('h-6 w-6 text-gray-600', iconStyles.color, iconClass)"
                    aria-hidden="true"
                />
            </div>

            <h3 v-if="hasSlotContent($slots.title)" class="mb-2 text-center text-lg font-semibold text-gray-900">
                <slot name="title" />
            </h3>

            <p v-if="hasSlotContent($slots.description)" class="text-center text-base text-gray-500">
                <slot name="description" />
            </p>
            <div v-if="hasSlotContent($slots.default)" :class="bodyClass"><slot /></div>

            <div v-if="hasSlotContent($slots.actions)" class="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
                <slot name="actions" />
            </div>
        </section>

        <template v-if="hasSlotContent($slots.footer)">
            <hr class="border-gray-200" />
            <footer :class="[accentStyle.footer, footerClass]"><slot name="footer" /></footer>
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
