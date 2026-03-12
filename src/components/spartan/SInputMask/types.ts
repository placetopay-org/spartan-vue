import type { FactoryOpts } from 'imask';

export type TInputMaskProps = {
    /**
     * @en The IMask mask pattern or configuration to enforce on the input.
     * @es El patrón o configuración de máscara IMask a aplicar en el input.
     */
    mask: FactoryOpts['mask'];
};

export type TInputMaskEmits = {
    /**
     * @en Emitted when the masked input value changes.
     * @es Se emite cuando el valor del input enmascarado cambia.
     */
    (e: 'update:modelValue', value: string): void;

    /**
     * @en Emitted when the input value fully matches the mask pattern.
     * @es Se emite cuando el valor del input coincide completamente con el patrón de la máscara.
     */
    (e: 'complete'): void;
};
