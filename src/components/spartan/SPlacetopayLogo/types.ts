export type TPlacetopayLogoProps = {
    /**
     * @en Custom width of the logo in pixels.
     * @es Ancho personalizado del logo en pixeles.
     */
    width: number;

    /**
     * @en Custom height of the logo in pixels.
     * @es Alto personalizado del logo en pixeles.
     */
    height: number;

    /**
     * @en Predefined size preset. When set to 'md', the width defaults to 202px.
     * @es Tamano predefinido. Cuando es 'md', el ancho por defecto es 202px.
     */
    size: 'md';

    /**
     * @en Color mode of the logo: base (colored), dark (for dark backgrounds), or blackAndWhite.
     * @es Modo de color del logo: base (coloreado), dark (para fondos oscuros) o blackAndWhite.
     * @default 'base'
     */
    mode: 'base' | 'dark' | 'blackAndWhite';

    /**
     * @en Additional CSS classes for the logo.
     * @es Clases CSS adicionales para el logo.
     */
    class: string;
};
