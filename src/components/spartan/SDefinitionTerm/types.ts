import type { ClassNameValue } from 'tailwind-merge';

export type TDefinitionTermProps = {
    /**
     * @en Additional classes applied to the root element.
     * @es Clases adicionales aplicadas al elemento raíz.
     */
    class?: ClassNameValue;

    /**
     * @en The label (or labels) rendered as `<dt>` element(s). Pass a string for a single label or an array of strings for multiple labels. Ignored when the `default` slot or numbered slots are used.
     * @es La etiqueta (o etiquetas) renderizadas como elemento(s) `<dt>`. Pasa un string para una sola etiqueta o un array de strings para varias etiquetas. Se ignora cuando se usa el slot `default` o los slots numerados.
     */
    labels?: string | string[];

    /**
     * @en The content rendered as the `<dd>` description element. Ignored when the `description` slot is used.
     * @es El contenido renderizado como el elemento `<dd>` de descripción. Se ignora cuando se usa el slot `description`.
     */
    description?: string;

    /**
     * @en When `true`, removes the wrapping `<div>` so the `<dt>` and `<dd>` elements render directly in the parent — useful when grouping several `SDefinitionTerm` inside a shared `<dl>`.
     * @es Cuando es `true`, elimina el `<div>` envolvente para que los elementos `<dt>` y `<dd>` se rendericen directamente en el contenedor padre — útil cuando se agrupan varios `SDefinitionTerm` dentro de un `<dl>` compartido.
     * @default false
     */
    oneline?: boolean;
};
