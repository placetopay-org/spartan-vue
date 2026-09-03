import type { HTMLAttributes } from 'vue';

export type ComponentSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

/**
 * @en Value accepted by Vue's special `class` attribute.
 * @es Valor aceptado por el atributo especial `class` de Vue.
 */
export type TClassProp = HTMLAttributes['class'];

/**
 * @en Value accepted by custom class props passed directly to `twMerge`.
 * @es Valor aceptado por props de clase personalizadas que se pasan directamente a `twMerge`.
 */
export type TClassMergeProp = string | false | null | (TClassMergeProp | undefined)[];
