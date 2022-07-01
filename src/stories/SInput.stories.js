import {
  SInput,
  SDropdown,
  SDropdownButton,
  SDropdownItem,
  SButton,
} from "../index.js";
import { SearchIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SInput",
  component: SInput,
  argTypes: {},
  decorators: [
    () => ({
      template: '<div class="max-w-md mx-auto border-none"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: {
    SInput,
    SearchIcon,
    SDropdown,
    SDropdownButton,
    SDropdownItem,
    SButton,
  },
  setup() {
    return { args };
  },
  template: `
    <SInput v-bind="args">
      <template v-if="args.dropdown.enabled" #left>
        <SDropdown>
          <template v-slot>
            <SDropdownButton color="white" :flat-right="true">
              Options
            </SDropdownButton>
          </template>
          <template v-slot:menu-items>
            <SDropdownItem>Name</SDropdownItem>
            <SDropdownItem>Role</SDropdownItem>
            <SDropdownItem>Email</SDropdownItem>
          </template>
        </SDropdown>
      </template>

      <template v-if="args.button.enabled" #right>
        <SButton :icon="args.button.icon" color="primary" flat-left>
          {{ args.button.label }}
        </SButton>
      </template>
    </SInput>
  `,
});

const defaultArgs = {
  label: "Nombre",
  placeholder: "John Doe",
  type: "text",
  id: "field_name",
  name: "field_name",
  component: "input",
  dropdown: {
    enabled: false,
  },
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
  dropdown: {
    enabled: false,
  },
  button: {
    enabled: true,
    label: "Search",
    icon: SearchIcon,
  },
};

export const WithDropdownLeft = Template.bind({});
WithDropdownLeft.args = {
  ...defaultArgs,
  label: undefined,
  dropdown: {
    enabled: true,
  },
  button: {
    icon: SearchIcon,
  },
};
