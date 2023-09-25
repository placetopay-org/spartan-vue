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
            if (props.leftIcon) return { icon: props.leftIcon };
            return undefined;
        },
    },
    selector: {
        component: SelectorSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.leftOptions) return { options: props.leftOptions };
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
            if (props.rightIcon) return { icon: props.rightIcon };
            return undefined;
        },
    },
    selector: {
        component: SelectorSlot,
        getProps: (props: Partial<TInputProps>) => {
            if (props.rightOptions) return { options: props.rightOptions };
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
