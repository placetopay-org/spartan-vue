export type TRounded = keyof typeof roundedStyle;

export const roundedStyle = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
    full: 'rounded-full',
};

export const inputStyle = {
    root: 'w-full outline-2 outline-offset-0 outline-transparent bg-white dark:bg-white/5 transition-[outline-offset,outline-color] duration-150',
    disabled: 'opacity-50 cursor-not-allowed',
    padding: 'px-3 py-1.5',
    text: 'text-gray-900 dark:text-gray-50 font-normal',
    placeholder: 'placeholder:text-gray-400',
    rounded: 'rounded-lg',
    border: {
        base: 'border border-gray-300 dark:border-white/10',
        error: 'border border-red-500',
    },
    ring: {
        base: 'focus-within:s-outline',
        error: 'focus-within:s-outline-error',
    },
};
