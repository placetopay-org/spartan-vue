import SInput from './SInput.vue';
import { SDropdown, SDropdownItem } from '../SDropdown';
import type { SourceProps } from '@storybook/blocks';
import { buildDesign, buildSourceBinding } from '../../helpers';
import {
  ArrowLeftOnRectangleIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  MapPinIcon,
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
    id: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    label: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
    modelValue: {
      control: { type: 'text' },
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
    type: {
      control: 'text',
      description: 'DOC',
      table: { type: { summary: 'string' } },
    },
  },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({
  prop: { rounded: 'both' },
});

export const Default = {
  render: (args: any) => ({
    components: { SInput, EnvelopeIcon },
    setup() {
      return { args, EnvelopeIcon };
    },
    template: '<SInput :endIcon="EnvelopeIcon" v-bind="args" v-model="args.modelValue" />',
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
    rounded: 'both',
    type: 'text',
  },
};

const createVariation = (
  template: string,
  options?: {
    focusVisible?: boolean;
    decorators?: (() => {
      template: string;
    })[];
  }
) => ({
  decorators: options?.decorators ?? [
    () => ({ template: '<div style="gap: 20px; display: flex; align-items: end;"><story/></div>' }),
  ],
  render: () => ({
    components: {
      SInput,
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
      return {
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

export const Rounded = createVariation(`
<SInput rounded="both" placeholder="both (default)" />
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

/* import {
  SInput,
  SInputDropdown,
  SDropdown,
  SDropdownItem,
  SButton,
} from "../components/sInputs";
import { MagnifyingGlassIcon } from "@heroicons/vue/24/outline";

export default {
  title: "Components/SInput",
  component: SInput,
  argTypes: {
    direction: {
      control: { type: "select" },
      default: 'left',
      options: ['left', 'right'],
    },
  },
  decorators: [
    () => ({
      template: '<div class="max-w-md mx-auto border-none"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: {
    SInput,
    MagnifyingGlassIcon,
    SDropdown,
    SDropdownItem,
    SButton,
  },
  setup() {
    return { args };
  },
  template: `
    <SInput v-bind="args">
      <template v-if="args.button.enabled" #right>
        <SButton :icon="args.button.icon" color="primary" flat-left>
          {{ args.button.label }}
        </SButton>
      </template>
    </SInput>
  `,
});

const TemplateWithDropdown = (args) => ({
  components: {
    SInputDropdown,
  },
  setup() {
    return { args };
  },
  template: `
    <SInputDropdown v-bind="args" />
  `,
});



const defaultArgs = {
  label: "Nombre",
  placeholder: "John Doe",
  type: "text",
  id: "field_name",
  name: "field_name",
  component: "input",
  button: {
    enabled: false,
  },
};

export const TextInput = Template.bind({});
TextInput.args = {
  ...defaultArgs,
};

export const EmailInput = Template.bind({});
EmailInput.args = {
  ...defaultArgs,
  label: "Correo electrónico",
  placeholder: "jhon@example.com",
  type: "email",
};

export const WithErrors = Template.bind({});
WithErrors.args = {
  ...defaultArgs,
  invalid: true,
};

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  ...defaultArgs,
  disabled: true,
};

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
