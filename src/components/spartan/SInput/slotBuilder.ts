import type { TInputProps } from './types';
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
            if (props.icon) return { icon: props.icon };
            return undefined;
        },
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
            if (props.endIcon) return { icon: props.endIcon };
            return undefined;
        },
    },
    selector: {
        component: SelectorSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.options)
                return {
                    options: props.options,
                    rounded: Boolean(props.rounded === 'both' || props.rounded === 'right'),
                };
            return undefined;
        },
    },
};

export const buildSideContent = (side: 'left' | 'right', rawOrder: string, props: Partial<TInputProps>) => {
    const order = rawOrder.split(',');
    return order
        .map((slot) => {
            const component = side === 'left' ? leftComponents[slot] : rightComponents[slot];
            const componentProps = component?.getProps(props);
            console.log(slot, componentProps, props.options);
            if (componentProps) {
                return {
                    key: `${side}-${slot}`,
                    component: component.component,
                    props: componentProps,
                };
            }

            if (slot === 'slot') {
                return {
                    key: `${side}-${slot}`,
                    component: undefined,
                    props: undefined,
                };
            }

            return false;
        })
        .filter(Boolean) as { key: string; component: any; props: any }[];
};
