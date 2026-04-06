import { brandName } from './constants';

export type TCardBrandProps = {
    /**
     * @en The payment brand identifier to display.
     * @es El identificador de la marca de pago a mostrar.
     */
    name: (typeof brandName)[number];

    /**
     * @en Additional CSS classes for the brand icon.
     * @es Clases CSS adicionales para el icono de la marca.
     */
    class?: string;

    /**
     * @en Width and height of the brand icon in pixels.
     * @es Ancho y alto del icono de la marca en pixeles.
     */
    size?: number;
};
