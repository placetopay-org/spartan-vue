import type { FunctionalComponent } from 'vue';

type TAction = {
    /**
     * @en Icon component displayed alongside the action text.
     * @es Componente de icono que se muestra junto al texto de la accion.
     */
    icon: FunctionalComponent;

    /**
     * @en Callback function executed when the action is clicked.
     * @es Funcion callback que se ejecuta al hacer clic en la accion.
     */
    onClick: () => void;

    /**
     * @en Label text for the action button.
     * @es Texto de la etiqueta del boton de accion.
     */
    text: string;
};

export type TCardProps = {
    /**
     * @en Additional CSS classes for the card container.
     * @es Clases CSS adicionales para el contenedor de la tarjeta.
     */
    class?: string;

    /**
     * @en Title text displayed in the card body.
     * @es Texto del titulo que se muestra en el cuerpo de la tarjeta.
     */
    title?: string;

    /**
     * @en Size variant of the card, affecting padding and border radius.
     * @es Variante de tamano de la tarjeta, afectando el padding y el radio de borde.
     * @default 'md'
     */
    size?: 'sm' | 'md';

    /**
     * @en Icon glyph to display in the card header. Can be a Vue component or one of the four status presets (`'success'`, `'danger'`, `'warning'`, `'info'`), each of which ships with a matching default glyph and color. For non-status visuals (e.g., a brand-colored card), pass a custom component and use `iconColor` to set the palette.
     * @es Icono a mostrar en el encabezado de la tarjeta. Puede ser un componente Vue o uno de los cuatro presets de estado (`'success'`, `'danger'`, `'warning'`, `'info'`), cada uno con su glifo y color por defecto. Para visuales no asociados a un estado (p. ej. una tarjeta con color de marca), pasa un componente personalizado y usa `iconColor` para definir la paleta.
     */
    icon?: FunctionalComponent | 'success' | 'danger' | 'warning' | 'info';

    /**
     * @en Color palette applied to the icon container background, glyph foreground, and (in ping mode) the radial gradient. Accepts any of the six design-system colors. Overrides the color from a status preset and is the only way to apply `'primary'` or `'secondary'` to a card icon (those are colors, not glyphs).
     * @es Paleta de color aplicada al fondo del contenedor, color del glifo y (en modo ping) el gradiente radial. Acepta cualquiera de los seis colores del design system. Sobreescribe el color de un preset de estado y es la unica forma de aplicar `'primary'` o `'secondary'` al icono de una tarjeta (esos son colores, no glifos).
     */
    iconColor?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

    /**
     * @en Rendering style of the icon: solid circle or animated ping rings.
     * @es Estilo de renderizado del icono: circulo solido o anillos animados tipo ping.
     * @default 'solid'
     */
    iconType?: 'solid' | 'ping';

    /**
     * @en Shows a close button in the card header when true.
     * @es Muestra un boton de cerrar en el encabezado de la tarjeta cuando es true.
     */
    closable?: boolean;

    /**
     * @en Array of action buttons displayed in the card footer.
     * @es Array de botones de accion que se muestran en el pie de la tarjeta.
     */
    actions?: TAction[];
};
