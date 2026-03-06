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
     * @en Icon to display in the card header. Can be a Vue component or a predefined icon variant name.
     * @es Icono a mostrar en el encabezado de la tarjeta. Puede ser un componente Vue o un nombre de variante de icono predefinido.
     */
    icon?: FunctionalComponent | 'primary' | 'success' | 'danger' | 'warning' | 'info';

    /**
     * @en Color variant applied to the icon background and foreground.
     * @es Variante de color aplicada al fondo y primer plano del icono.
     */
    iconColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';

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
