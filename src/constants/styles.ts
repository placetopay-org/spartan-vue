export type TRounded = keyof typeof roundedStyle;

export const roundedStyle = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
    full: 'rounded-full',
};

export const inputStyle = {
    root: 'w-full outline-none focus:outline-none bg-white',
    disabled: 'opacity-50 cursor-not-allowed',
    padding: 'px-3 py-1.5',
    text: 'text-gray-900 font-normal',
    placeholder: 'placeholder:text-gray-400',
    rounded: 'rounded-lg',
    border: {
        base: 'border border-gray-300',
        error: 'border border-red-500',
    },
    ring: {
        base: 'focus-within:s-ring',
        error: 'focus-within:s-ring-error',
    },
};
