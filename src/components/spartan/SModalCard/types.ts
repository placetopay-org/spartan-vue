import type { TCardProps } from "../SCard";
import type { TModalProps } from "../SModal";

export type TModalCardEmits = {
    (event: 'close'): boolean;
};

export type TModalCardProps = Partial<TModalProps> & Partial<TCardProps>