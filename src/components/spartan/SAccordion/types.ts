export type TAccordionProps = {
    /**
     * @en Whether the accordion panel is expanded.
     * @es Si el panel del acordeón está expandido.
     */
    open: boolean;

    /**
     * @en Additional CSS classes for the accordion container.
     * @es Clases CSS adicionales para el contenedor del acordeón.
     */
    class?: string;

    /**
     * @en Enables vertical expand/collapse direction. When false, expands horizontally.
     * @es Habilita la dirección de expansión/colapso vertical. Cuando es false, se expande horizontalmente.
     * @default true
     */
    vertical?: boolean;
};
