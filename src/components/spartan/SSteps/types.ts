type TVariant = 'simple' | 'circlesWithText';

export type TStepsItemsProps = {
    /**
     * @en Current state of the step (complete, current or upcoming).
     * @es Estado actual del paso (completado, actual o pendiente).
     */
    status: 'complete' | 'current' | 'upcoming';

    /**
     * @en The URL the step links to.
     * @es La URL a la que enlaza el paso.
     */
    href: string;

    /**
     * @en Name of the step. Ignored when content is provided through the default slot.
     * @es Nombre del paso. Se ignora cuando se proporciona contenido a través del slot por defecto.
     */
    name?: string;

    /**
     * @en Description of the step, displayed below the name. Ignored when the `description` slot is used.
     * @es Descripción del paso, mostrada debajo del nombre. Se ignora cuando se usa el slot `description`.
     */
    description?: string;

    /**
     * @en Marks the step as the last one, hiding the connector line in the `circlesWithText` variant.
     * @es Marca el paso como el último, ocultando la línea conectora en la variante `circlesWithText`.
     */
    last?: boolean;
};

export type TStepsProps = {
    /**
     * @en Defines the visual variant of the steps.
     * @es Define la variante visual de los pasos.
     * @default 'circlesWithText'
     */
    variant?: TVariant;

    /**
     * @en Array of steps to render declaratively, as an alternative to using `SStepsItem` children.
     * @es Arreglo de pasos para renderizar de forma declarativa, como alternativa a usar hijos `SStepsItem`.
     */
    steps?: TStepsItemsProps[];
};

export type TApiState = {
    variant: TVariant;
};

export type TStepItemData = TStepsItemsProps & {
    isComplete: boolean;
    isCurrent: boolean;
    isUpcoming: boolean;
    ariaCurrent: { 'aria-current': 'step' } | undefined;
    hasName: false | { slot: boolean };
    hasDescription: false | { slot: boolean };
    hasOnlyOneSlot: boolean | { slot: boolean };
};
