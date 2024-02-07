import type { FunctionalComponent, HTMLAttributes } from 'vue';
import type { TButtonStyles } from './styles';

export type TButtonProps = {
    as: string;
    disabled: boolean;
    leftIcon: FunctionalComponent;
    rightIcon: FunctionalComponent;
    loading: boolean;
    rounded: TButtonStyles['rounded'];
    size: TButtonStyles['size'];
    type: 'button' | 'submit';
    variant: TButtonStyles['variant'];
    class?: HTMLAttributes['class'];
};
