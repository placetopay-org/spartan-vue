import type { TClassProp } from '@/constants';

export type TLinkProps = {
    /**
     * @en Additional CSS classes for the link element.
     * @es Clases CSS adicionales para el elemento del enlace.
     */
    class?: TClassProp;

    /**
     * @en The URL that the link points to.
     * @es La URL a la que apunta el enlace.
     */
    href: string;

    /**
     * @en Specifies where to open the linked document.
     * @es Especifica dónde abrir el documento vinculado.
     */
    target?: '_blank' | '_self' | '_parent' | '_top';
};
