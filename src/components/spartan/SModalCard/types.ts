import type { TCardProps } from "../SCard";
import type { TModalProps } from "../SModal";

export type TModalCardEmits = {
    (event: 'close'): void;
};

export type TModalCardProps = Partial<TModalProps> & Partial<TCardProps>