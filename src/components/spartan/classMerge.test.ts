import { test, describe, expect } from 'vitest';
import { render } from '@testing-library/vue';
import type { Component } from 'vue';

import SAvatar from './SAvatar/SAvatar.vue';
import SBreadcrumbs from './SBreadcrumbs/SBreadcrumbs.vue';
import SButtonGroup from './SButtonGroup/SButtonGroup.vue';
import SCaption from './SCaption/SCaption.vue';
import SCheckbox from './SCheckbox/SCheckbox.vue';
import SColorSwitch from './SColorSwitch/SColorSwitch.vue';
import SInputIncrement from './SInputIncrement/SInputIncrement.vue';
import SLink from './SLink/SLink.vue';
import SModal from './SModal/SModal.vue';
import SRadio from './SRadio/SRadio.vue';
import SRadioGroup from './SRadioGroup/SRadioGroup.vue';
import SStackedList from './SStackedList/SStackedList.vue';
import SSwitch from './SSwitch/SSwitch.vue';
import STemplateHeaderTable from './STemplateHeaderTable/STemplateHeaderTable.vue';
import STextArea from './STextArea/STextArea.vue';

/**
 * Every component must merge its own default Tailwind classes with the `class`
 * it receives as a property using `twMerge`, so the consumer's class always wins
 * a conflict instead of relying on CSS source order.
 *
 * The assertion is anchored to the element the class is meant to style: it is
 * not enough for the class to land *somewhere*, it must land on that element
 * and strip the conflicting default from it.
 */
type TCase = {
    name: string;
    component: Component;
    props?: Record<string, unknown>;
    /** Prop carrying the classes. Defaults to `class`. */
    classProp?: string;
    /** Class the consumer passes. */
    wins: string;
    /** Conflicting default that `twMerge` must remove from the same element. */
    loses: string;
    /** Resolves the element the class is meant to style. Defaults to the root. */
    target?: (container: Element) => Element | null;
};

const cases: TCase[] = [
    {
        name: 'SAvatar',
        component: SAvatar,
        props: { name: 'AB' },
        wins: 'bg-red-500',
        loses: 'bg-gray-100',
        // The class styles the avatar body, not the positioning wrapper.
        target: (container) => container.querySelector('[data-s-avatar] > *'),
    },
    { name: 'SBreadcrumbs', component: SBreadcrumbs, wins: 'grid', loses: 'flex' },
    { name: 'SButtonGroup', component: SButtonGroup, wins: 'grid', loses: 'inline-flex' },
    { name: 'SCaption', component: SCaption, props: { text: 'caption' }, wins: 'text-lg', loses: 'text-xs' },
    {
        name: 'SCheckbox',
        component: SCheckbox,
        wins: 'rounded-full',
        loses: 'rounded',
        // `class` styles the input; the container is not the relevant element here.
        target: (container) => container.querySelector('input'),
    },
    { name: 'SColorSwitch', component: SColorSwitch, wins: 'bg-red-500', loses: 'bg-gray-200' },
    {
        name: 'SInputIncrement',
        component: SInputIncrement,
        props: { modelValue: 0 },
        wins: 'text-left',
        loses: 'text-center',
        // `class` styles the inner field; `containerClass` is the container's channel.
        target: (container) => container.querySelector('input'),
    },
    {
        name: 'SInputIncrement (containerClass)',
        component: SInputIncrement,
        props: { modelValue: 0 },
        classProp: 'containerClass',
        wins: 'rounded-none',
        loses: 'rounded-lg',
    },
    { name: 'SLink', component: SLink, props: { href: '#' }, wins: 'font-bold', loses: 'font-medium' },
    {
        name: 'SModal',
        component: SModal,
        props: { open: true },
        wins: 'justify-start',
        loses: 'justify-center',
        // SModal teleports to body.
        target: () => document.body.querySelector('[data-s-container]'),
    },
    {
        name: 'SRadio',
        component: SRadio,
        props: { modelValue: false, value: 'a' },
        wins: 'rounded-none',
        loses: 'rounded-full',
        // `class` styles the input; the container is not the relevant element here.
        target: (container) => container.querySelector('input'),
    },
    { name: 'SRadioGroup', component: SRadioGroup, props: { modelValue: 'a' }, wins: 'flex-row', loses: 'flex-col' },
    { name: 'SStackedList', component: SStackedList, wins: 'bg-red-500', loses: 'bg-white' },
    { name: 'SSwitch', component: SSwitch, props: { modelValue: false }, wins: 'gap-8', loses: 'gap-3' },
    {
        name: 'STemplateHeaderTable',
        component: STemplateHeaderTable,
        props: { title: 'Title' },
        wins: 'gap-8',
        loses: 'gap-4',
    },
    { name: 'STextArea', component: STextArea, props: { modelValue: '' }, wins: 'rounded-none', loses: 'rounded-lg' },
];

describe('class prop merging', () => {
    test.each(cases)(
        '$name merges the class prop into its defaults',
        ({ component, props, classProp = 'class', wins, loses, target }) => {
            const { container } = render(component, { props: { ...props, [classProp]: wins } });

            const el = target ? target(container) : container.firstElementChild;

            expect(el, 'could not resolve the element the class should style').not.toBeNull();
            expect(el!.classList.contains(wins), `the "${wins}" class never reached this element`).toBe(true);
            expect(
                el!.classList.contains(loses),
                `"${loses}" should have been removed by twMerge but is still present`,
            ).toBe(false);
        },
    );

    test('SStackedList forwards non-class attributes to its root', () => {
        const { container } = render(SStackedList, { props: { id: 'my-list' } });

        expect(container.firstElementChild!.getAttribute('id')).toBe('my-list');
    });
});
