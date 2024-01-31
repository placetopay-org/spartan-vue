import type { SourceProps } from '@storybook/blocks';
import { ref, computed, type Component } from 'vue';

export const buildDesign = (url: string) => ({
    type: 'figma',
    url,
});

type TBindings = {
    check?: string[];
    prop?: Record<string, string | boolean | undefined>;
    emit?: string[];
    custom?: Record<'icon', boolean>;
};

const getBinding = (binding: string, map?: string) =>
    map ? `${map}Prop${binding.charAt(0).toUpperCase() + binding.slice(1)}` : binding;

export const buildSourceBinding = (bindings: TBindings, map?: string) => (args: any) => {
    let result = '';

    if (bindings.prop) {
        Object.keys(bindings.prop).forEach((prop) => {
            if (args[prop] !== undefined && args[prop] !== '' && args[prop] !== bindings.prop![prop])
                result += `${prop}="${args[prop]}" `;
        });
    }

    if (bindings.custom?.icon) {
        if (args[getBinding('icon', map)]) result += `:icon="${args[getBinding('icon', map)]}" `;
    }

    if (bindings.check) {
        bindings.check.forEach((binding) => {
            if (args[getBinding(binding, map)]) result += `${binding} `;
        });
    }

    if (bindings.emit) {
        bindings.emit.forEach((emit) => {
            if (args[emit]) result += `@${emit}="${args[emit].replace(/ /g, '')}" `;
        });
    }

    return result.trim();
};

export const createHistory = ({
    description,
    slots,
    props,
    events,
}: {
    description: string;
    slots?: {
        name: string;
        description: string;
        control?: boolean;
    }[];
    props?: {
        name: string;
        description: string;
        type: string;
        default?: string;
        control?: string | null;
        options?: string[];
    }[];
    events?: {
        name: string;
        description: string;
        type?: string;
    }[]
}) => {
    const argTypesEvents = events?.reduce(
        (acc, curr) => {
            acc[curr.name] = {
                description: curr.description,
                table: { type: { summary: curr.type ?? 'undefined' }, category: 'Events' },
                control: { type: null },
            };
            return acc;
        },
        {} as Record<string, any>,
    );

    const argTypesSlots = slots?.reduce(
        (acc, curr) => {
            acc[curr.name] = {
                description: curr.description,
                table: { type: { summary: 'VNode | VNode Array' }, category: 'Slots' },
                control: { type: curr.control ? 'text' : null },
            };
            return acc;
        },
        {} as Record<string, any>,
    );

    const argTypesProps = props?.reduce(
        (acc, curr) => {
            acc[curr.name] = {
                description: curr.description,
                table: { type: { summary: curr.type }, defaultValue: { summary: curr.default } },
                control: { type: curr.control },
                options: curr.options,
            };
            return acc;
        },
        {} as Record<string, any>,
    );

    const argTypes = { ...argTypesSlots, ...argTypesProps, ...argTypesEvents };

    return {
        parameters: {
            docs: {
                description: {
                    component: description,
                },
            },
        },
        argTypes,
    };
};

export const createDefault = ({
    components,
    design,
    setup,
    args,
    transform,
    template,
    containerClass,
}: {
    template: string;
    setup?: () => any;
    design?: string;
    args: Record<string, any>;
    transform?: (args: any) => string;
    components?: Record<string, any>;
    containerClass?: string;
}) => ({
    decorators: [() => ({ template: `<div ${containerClass ? `class="${containerClass}"` : ''}><story/></div>` })],
    render: (args: any) => ({
        components,
        setup: () => {
            const argsWithoutSlots = computed(() => ({ ...args, default: undefined }));
            const value = ref();
            if (setup) return { ...setup(), args, argsWithoutSlots };
            return { args, argsWithoutSlots, value };
        },
        template,
    }),
    parameters: {
        design: design ? buildDesign(design) : undefined,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform:
                    transform && (((_, storyContext) => transform(storyContext.args)) as SourceProps['transform']),
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args,
});

export const createVariation = ({
    components,
    setup,
    template,
    design,
    focusVisible,
    containerClass,
}: {
    template: string;
    setup?: () => any;
    components?: Record<string, any>;
    design?: any;
    focusVisible?: boolean;
    containerClass?: string;
}) => ({
    decorators: [
        () => ({
            template: `<div class="${containerClass ?? 'flex gap-5'}"><story/></div>`,
        }),
    ],
    render: () => ({
        components,
        setup:
            setup ||
            (() => {
                const value = ref();
                return { value };
            }),
        template,
    }),
    parameters: {
        design,
        pseudo: { focusVisible },
        controls: { disable: true },
        actions: { disable: true },
        docs: {
            source: {
                code: template,
                language: 'html',
            },
        },
    },
});
