import { SButton } from "../index.js";

export default {
  title: "Example/Button",
  component: SButton,
  args: {
    color: "primary",
    default: "Button Text",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "default", "danger", "white"],
    },
    default: {
      control: { type: "text" },
    },
  },
};

const Template = (args) => ({
  components: { SButton },
  setup() {
    return { args };
  },
  template: `
    <SButton v-bind="args">Button Text</SButton>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
};

export const Default = Template.bind({});
Default.args = {
  color: "default",
};

export const White = Template.bind({});
White.args = {
  color: "white",
};

export const Danger = Template.bind({});
Danger.args = {
  color: "danger",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
