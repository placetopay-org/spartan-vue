import type { SourceProps } from '@storybook/blocks';
import { ref, computed } from 'vue';

export const buildExampleLink = (example: string, name: string) => `/iframe.html?args=buttonPreviewMode:false&id=examples-${example}--${name}&viewMode=story`

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
        subcategory?: string;
        name: string;
        description: string;
        control?: boolean;
    }[];
    props?: {
        subcategory?: string;
        name: string;
        description: string;
        type?: string;
        default?: string;
        control?: string | null;
        options?: string[];
    }[];
    events?: {
        name: string;
        description: string;
        type?: string;
    }[];
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
                table: {
                    type: { summary: 'VNode | VNode Array' },
                    category: 'Slots',
                    subcategory: curr.subcategory ?? undefined,
                },
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
                table: {
                    type: { summary: curr.type },
                    defaultValue: { summary: curr.default },
                    category: 'Props',
                    subcategory: curr.subcategory ?? undefined,
                },
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

export const createBlockWrapperHistory = (blockOf: string) =>
    createHistory({
        description: `A ${blockOf} wrapped in a form block with a label, help text and error text.`,
        props: [
            {
                name: 'errorText',
                description: 'The error message to be displayed when the block has an error.',
                type: 'string',
            },
            {
                name: 'helpText',
                description: 'The help message to be displayed below the block.',
                type: 'string',
            },
            {
                name: 'label',
                description: 'The label of the block.',
                type: 'string',
            },
        ],
    });

export const createDefault = ({
    components,
    design,
    setup,
    args,
    transform,
    template,
    containerClass,
    title,
}: {
    template: string;
    setup?: () => any;
    design?: string;
    args: Record<string, any>;
    transform?: (args: any) => string;
    components?: Record<string, any>;
    containerClass?: string;
    title?: string;
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
        title,
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
