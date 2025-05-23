//TODO: Move to style constants
export type TRounded = keyof typeof roundedClass;

//TODO: Move to style constants
export const roundedClass = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
    full: 'rounded-full',
};

export const createBooleanVariation = (trueStyle?: string | string[], falseStyle?: string | string[]) => ({
    true: trueStyle,
    false: falseStyle,
    undefined: falseStyle,
});

export const cbv = createBooleanVariation;
