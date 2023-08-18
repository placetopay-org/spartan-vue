import {
  SInput,
  SInputDropdown,
  SDropdown,
  SDropdownItem,
  SButton,
} from "../index.js";
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
