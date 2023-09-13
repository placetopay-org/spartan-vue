import SInput from './SInput.vue';
import { ref } from 'vue';
import { SButton, SDropdown, SDropdownItem } from '@spartan';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '@/helpers';
import {
    ArrowLeftOnRectangleIcon,
    InformationCircleIcon,
    CurrencyDollarIcon,
    MapPinIcon,
    MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline';
import { EnvelopeIcon, KeyIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/vue/24/solid';

export default {
    component: SInput,
    title: 'new/Input',
    parameters: {
        docs: {
            description: {
                component: 'DOC',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'DOC',
        },

        // Props
        disabled: {
            description: 'DOC',
            table: { type: { summary: 'boolean' } },
        },
        endIcon: {
            control: 'select',
            options: [
                'EnvelopeIcon',
                'MagnifyingGlassIcon',
                'MapPinIcon',
                'InformationCircleIcon',
                'CurrencyDollarIcon',
                'ChatBubbleLeftEllipsisIcon',
            ],
            description: `A Vue functional component to be used as the input's icon.`,
            table: { type: { summary: 'FunctionalComponent' } },
        },
        error: {
            description: 'DOC',
            table: { type: { summary: 'boolean' } },
        },
        icon: {
            control: 'select',
            options: [
                'EnvelopeIcon',
                'MagnifyingGlassIcon',
                'MapPinIcon',
                'InformationCircleIcon',
                'CurrencyDollarIcon',
                'ChatBubbleLeftEllipsisIcon',
            ],
            description: `A Vue functional component to be used as the input's icon.`,
            table: { type: { summary: 'FunctionalComponent' } },
        },
        id: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' } },
        },
        modelValue: {
            control: { type: null },
            description: 'DOC',
            table: { type: { summary: 'Ref<string>' } },
        },
        name: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' } },
        },
        rounded: {
            control: 'inline-radio',
            options: ['left', 'right', 'both', 'none'],
            description: `Specifies which corners should be rounded.`,
            table: { type: { summary: 'left | right | both | none | full' } },
        },
        placeholder: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' } },
        },
        prefix: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' } },
        },
        suffix: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' } },
        },
        type: {
            control: 'text',
            description: 'DOC',
            table: { type: { summary: 'string' } },
        },
    },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({
    prop: {
        rounded: 'both',
        id: undefined,
        name: undefined,
        placeholder: undefined,
        prefix: undefined,
        suffix: undefined,
        type: 'text',
    },
    check: ['disabled', 'error'],
    custom: { icon: true },
});

export const Default = {
    render: (args: any) => ({
        components: {
            SInput,
            EnvelopeIcon,
            MagnifyingGlassIcon,
            MapPinIcon,
            InformationCircleIcon,
            CurrencyDollarIcon,
            ChatBubbleLeftEllipsisIcon,
        },
        setup() {
            const value = ref('');
            const getIcon = (
                icon:
                    | 'EnvelopeIcon'
                    | 'MagnifyingGlassIcon'
                    | 'MapPinIcon'
                    | 'InformationCircleIcon'
                    | 'CurrencyDollarIcon'
                    | 'ChatBubbleLeftEllipsisIcon',
            ) => {
                if (icon === 'EnvelopeIcon') return EnvelopeIcon;
                if (icon === 'MagnifyingGlassIcon') return MagnifyingGlassIcon;
                if (icon === 'MapPinIcon') return MapPinIcon;
                if (icon === 'InformationCircleIcon') return InformationCircleIcon;
                if (icon === 'CurrencyDollarIcon') return CurrencyDollarIcon;
                if (icon === 'ChatBubbleLeftEllipsisIcon') return ChatBubbleLeftEllipsisIcon;
            };

            return {
                args,
                getIcon,
                value,
                EnvelopeIcon,
                MagnifyingGlassIcon,
                MapPinIcon,
                InformationCircleIcon,
                CurrencyDollarIcon,
                ChatBubbleLeftEllipsisIcon,
            };
        },
        template:
            '<SInput v-bind="args" :icon="getIcon(args.icon)" :endIcon="getIcon(args.endIcon)" v-model="value" />',
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                transform: ((_, storyContext) => `
        <SInput ${sourceBinding(storyContext.args)} />
        `) as SourceProps['transform'],
                type: 'dynamic',
                language: 'html',
            },
        },
    },
    args: {
        disabled: false,
        error: false,
        id: 'test-id',
        name: 'test-name',
        placeholder: 'Placeholder',
        prefix: '',
        suffix: '',
        rounded: 'both',
        type: 'text',
    },
};

const createVariation = (
    template: string,
    options?: {
        focusVisible?: boolean;
        containerClass?: string;
    },
) => ({
    decorators: [
        () => ({
            template: `<div style="${options?.containerClass ?? 'gap: 20px; display: flex;'}"><story/></div>`,
        }),
    ],
    render: () => ({
        components: {
            SInput,
            SButton,
            SDropdown,
            SDropdownItem,
            ArrowLeftOnRectangleIcon,
            EnvelopeIcon,
            KeyIcon,
            InformationCircleIcon,
            ChatBubbleLeftEllipsisIcon,
            CurrencyDollarIcon,
            MapPinIcon,
        },
        setup() {
            const email = ref('');

            return {
                email,
                SButton,
                ArrowLeftOnRectangleIcon,
                EnvelopeIcon,
                KeyIcon,
                InformationCircleIcon,
                ChatBubbleLeftEllipsisIcon,
                CurrencyDollarIcon,
                MapPinIcon,
            };
        },
        template,
    }),
    parameters: {
        design,
        pseudo: { focusVisible: options?.focusVisible },
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

export const Disabled = createVariation(`<SInput disabled placeholder="placeholder" />`, {
    containerClass: 'width: 200px',
});

export const Error = createVariation(`<SInput error placeholder="placeholder" />`, {
    containerClass: 'width: 200px',
});

export const Rounded = createVariation(`
<SInput placeholder="both (default)" />
<SInput rounded="left" placeholder="left" />
<SInput rounded="none" placeholder="none" />
<SInput rounded="right" placeholder="right" />
`);

export const WithIcon = createVariation(`
<SInput :icon="EnvelopeIcon" placeholder="Email" />
<SInput :icon="KeyIcon" placeholder="Password" />
<SInput :icon="InformationCircleIcon" />
`);

export const WithEndIcon = createVariation(`
<SInput :endIcon="ChatBubbleLeftEllipsisIcon" placeholder="Comment" />
<SInput :endIcon="CurrencyDollarIcon" placeholder="Amount" />
<SInput :endIcon="MapPinIcon" placeholder="Location" />
`);

export const WithPrefix = createVariation(`
<SInput prefix="$" type="number" placeholder="100.000" />
<SInput prefix="https://" />
<SInput prefix="name" />
`);

export const WithSuffix = createVariation(`
<SInput suffix=".com" />
<SInput suffix="USD" />
<SInput suffix="optional" />
`);

export const WithOptionsEmbedded = createVariation(`
<SInput>
  <template #options :name="currency">
    <option value="usd">USD</option>
    <option value="cop">COP</option>
    <option value="eur">EUR</option>
  </template>
</SInput>
`);

/* 


export const TextAreaInput = Template.bind({});
TextAreaInput.args = {
  ...defaultArgs,
  label: "Description",
  placeholder: null,
  as: "textarea",
  rows: 4,
};

export const WithButtonRight = Template.bind({});
WithButtonRight.args = {
  ...defaultArgs,
  label: undefined,
  button: {
    enabled: true,
    label: "Search",
    icon: MagnifyingGlassIcon,
  },
};

export const WithDropdownRight = TemplateWithDropdown.bind({});
WithDropdownRight.args = {
  label: "Tipo de documento",
  type: "text",
  id: "field_document_type",
  name: "field_document_type",
  component: "input",
  rows: [
    {label: 'Cedula de ciudadania', value: 'cc'},
    {label: 'Cedula de extranjeria', value: 'ce'},
  ],
};
 */
