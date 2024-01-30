import { type FunctionalComponent } from 'vue';
import type { TButtonStyles } from './styles';

export type TButtonProps = {
    as: string;
    disabled: boolean;
    endIcon: boolean;
    icon: FunctionalComponent;
    loading: boolean;
    rounded: TButtonStyles['rounded'];
    size: TButtonStyles['size'];
    type: 'button' | 'submit';
    variant: TButtonStyles['variant'];
};
