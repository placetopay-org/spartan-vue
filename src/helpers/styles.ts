export type TRounded = keyof typeof roundedClass;

export const roundedClass = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
};

export const getRoundedClass = (rounded: TRounded) => roundedClass[rounded];

export const getDisabledClass = (disabled: boolean) => (disabled ? 'opacity-50 cursor-not-allowed' : '');

export const createBooleanVariation = (style: string) => ({ true: style });
