import type { FunctionalComponent } from 'vue';

export type TSwitchEmits = {
    (event: 'update:modelValue', value: boolean): void;
};

export type TSwitchProps = {
    icon?: boolean | FunctionalComponent;
    iconOff?: FunctionalComponent;
    iconOn?: FunctionalComponent;
    modelValue: boolean;
    passive?: boolean;
    reverse?: boolean;
};
