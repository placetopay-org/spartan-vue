export type TRounded = keyof typeof roundedClass;

export const roundedClass = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
};

export const createBooleanVariation = (trueStyle: string | string[], falseStyle?: string | string[]) => ({
    true: trueStyle,
    false: falseStyle,
});
