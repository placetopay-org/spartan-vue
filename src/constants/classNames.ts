import { twMerge } from 'tailwind-merge';

const outlinePrimary = 'outline-2 outline-offset-2 outline-spartan-primary-600 z-10';
const outlineSecondary = twMerge(outlinePrimary, 'outline-gray-500');
const outlineDanger = twMerge(outlinePrimary, 'outline-red-500');

const focusOutlinePrimary = 'focus:outline-2 focus:outline-offset-2 focus:outline-spartan-primary-600 focus:z-10';
const focusOutlineSecondary = twMerge(focusOutlinePrimary, 'focus:outline-gray-500');
const focusOutlineDanger = twMerge(focusOutlinePrimary, 'focus:outline-red-500');

const focusWithinOutlinePrimary =
    'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-spartan-primary-600 focus-within:z-10';

const focusWithinOutlineSecondary = twMerge(focusWithinOutlinePrimary, 'focus-within:outline-gray-500');
const focusWithinOutlineDanger = twMerge(focusWithinOutlinePrimary, 'focus-within:outline-red-500');

export const SCN = {
    ringPrimary: outlinePrimary,
    ringSecondary: outlineSecondary,
    ringDanger: outlineDanger,
    focusRingPrimary: focusOutlinePrimary,
    focusRingSecondary: focusOutlineSecondary,
    focusRingDanger: focusOutlineDanger,
    focusWithinRingPrimary: focusWithinOutlinePrimary,
    focusWithinRingSecondary: focusWithinOutlineSecondary,
    focusWithinRingDanger: focusWithinOutlineDanger,
};
