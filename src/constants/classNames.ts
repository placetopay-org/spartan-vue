import { twMerge } from 'tailwind-merge';

const ringPrimary = 'duration-150 ring ring-spartan-primary-100 border-spartan-primary-300 z-10';
const ringSecondary = twMerge(ringPrimary, 'ring-gray-100 border-gray-300');
const ringDanger = twMerge(ringPrimary, 'ring-red-100 border-red-300');

const focusRingPrimary =
    'focus:duration-150 focus:ring focus:ring-spartan-primary-100 focus:border-spartan-primary-300 focus:z-10';
const focusRingSecondary = twMerge(focusRingPrimary, 'focus:ring-gray-100 focus:border-gray-300');
const focusRingDanger = twMerge(focusRingPrimary, 'focus:ring-red-100 focus:border-red-300');

const focusWithinRingPrimary =
    'focus-within:duration-150 focus-within:ring focus-within:ring-spartan-primary-100 focus-within:border-spartan-primary-300 focus-within:z-10';

const focusWithinRingSecondary = twMerge(
    focusWithinRingPrimary,
    'focus-within:ring-gray-100 focus-within:border-gray-300',
);
const focusWithinRingDanger = twMerge(focusWithinRingPrimary, 'focus-within:ring-red-100 focus-within:border-red-300');

export const SCN = {
    ringPrimary,
    ringSecondary,
    ringDanger,
    focusRingPrimary,
    focusRingSecondary,
    focusRingDanger,
    focusWithinRingPrimary,
    focusWithinRingSecondary,
    focusWithinRingDanger,
};
