import type { TInputProps, TInputEmits } from './types';
import { TextSlot, IconSlot, SelectorSlot } from './slots';

const leftComponents: Record<string, any> = {
    text: {
        component: TextSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.prefix) return { text: props.prefix };
            return undefined;
        },
    },
    icon: {
        component: IconSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.leftIcon) return { icon: props.leftIcon };
            return undefined;
        },
    },
    selector: {
        component: SelectorSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.leftOptions)
                return { options: props.leftOptions, modelValue: props.leftOption, ariaLabel: props.leftOptionsLabel };
            return undefined;
        },
        // Only invoked when getProps returned truthy (see buildSideContent), so the
        // options are guaranteed to exist here.
        getEmits: (emit: TInputEmits) => ({ 'update:modelValue': (value: string) => emit('update:leftOption', value) }),
    },
};

const rightComponents: Record<string, any> = {
    text: {
        component: TextSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.suffix) return { text: props.suffix };
            return undefined;
        },
    },
    icon: {
        component: IconSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.rightIcon) return { icon: props.rightIcon };
            return undefined;
        },
    },
    selector: {
        component: SelectorSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.rightOptions)
                return {
                    options: props.rightOptions,
                    modelValue: props.rightOption,
                    ariaLabel: props.rightOptionsLabel,
                };
            return undefined;
        },
        getEmits: (emit: TInputEmits) => ({
            'update:modelValue': (value: string) => emit('update:rightOption', value),
        }),
    },
};

export const buildSideContent = (
    side: 'left' | 'right',
    rawOrder: string,
    props: Partial<TInputProps>,
    emit: TInputEmits,
) => {
    const order = rawOrder.split(',');
    return order
        .map((slot) => {
            const component = side === 'left' ? leftComponents[slot] : rightComponents[slot];
            const componentProps = component?.getProps(props);
            if (componentProps) {
                return {
                    key: `${side}-${slot}`,
                    component: component.component,
                    props: componentProps,
                    emits: component.getEmits?.(emit) || {},
                };
            }

            if (slot === 'slot') {
                return {
                    key: `${side}-${slot}`,
                    component: undefined,
                    props: undefined,
                    emits: undefined,
                };
            }

            return false;
        })
        .filter(Boolean) as { key: string; component: any; props: any; emits: any }[];
};
