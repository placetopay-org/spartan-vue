import type { FactoryOpts } from 'imask';

export type TInputMaskProps = {
    mask: FactoryOpts['mask'];
};

export type TInputMaskEmits = {
    (e: 'update:modelValue', value: string): void;
    (e: 'complete'): void;
};
