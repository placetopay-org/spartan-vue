export type ComponentSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * @en Value accepted by Spartan `class` props: Tailwind class strings, or nested arrays of them.
 *     These props are merged with the component's own classes via `twMerge`, which ignores the
 *     object syntax (`{ 'foo': true }`) at runtime — so objects are excluded from the type on purpose.
 * @es Valor aceptado por las props `class` de Spartan: cadenas de clases de Tailwind, o arreglos anidados de ellas.
 *     Estas props se combinan con las clases propias del componente vía `twMerge`, que ignora la
 *     sintaxis de objeto (`{ 'foo': true }`) en tiempo de ejecución — por eso el tipo excluye objetos.
 */
export type TClassProp = string | false | null | undefined | TClassProp[];
