import { SBadge } from "../index.js";

export default {
  title: "Components/SBadge",
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["gray", "green", "red", "yellow", "blue", "primary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  component: SBadge,
};

const Template = (args) => ({
  components: { SBadge },
  setup() {
    return { args };
  },
  template: `<SBadge v-bind="args">{{ args.label }}</SBadge>`,
});

export const Default = Template.bind({});

Default.args = {
  label: "Default",
};

export const Medium = Template.bind({});

Medium.args = {
  size: "md",
  color: "green",
  label: "Approved",
};

export const Large = Template.bind({});

Large.args = {
  size: "lg",
  color: "red",
  label: "12",
};
