import { SInput } from "../index.js";

export default {
  title: "Components/SInput",
  component: SInput,
  argTypes: {},
  decorators: [
    () => ({ template: '<div class="max-w-xs border-none"><story /></div>' }),
  ],
};

const Template = (args) => ({
  components: { SInput },
  setup() {
    return { args };
  },
  template: `<SInput v-bind="args">{{ args.label }}</SInput>`,
});

const defaultArgs = {
  label: "Nombre",
  placeholder: "John Doe",
  type: "text",
  id: "field_name",
  name: "field_name",
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

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  ...defaultArgs,
  disabled: true,
};
