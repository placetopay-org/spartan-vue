import type { TCardProps } from '../SCard';
import type { TModalProps } from '../SModal';

export type TModalCardEmits = {
    (event: 'close'): void;
    (event: 'update:open', value: boolean): void;
};

export type TModalCardProps = TModalProps & TCardProps;
