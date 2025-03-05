import type { Component, FunctionalComponent, HTMLAttributes } from 'vue';
import type { TButtonStyles } from './styles';

export type TButtonProps = {
    as?: string | Component;
    disabled?: boolean;
    icon?: FunctionalComponent;
    leftIcon?: FunctionalComponent;
    rightIcon?: FunctionalComponent;
    loading?: boolean;
    rounded?: TButtonStyles['rounded'];
    size?: TButtonStyles['size'];
    type?: 'button' | 'submit';
    variant?: TButtonStyles['variant'];
    class?: HTMLAttributes['class'];
};
