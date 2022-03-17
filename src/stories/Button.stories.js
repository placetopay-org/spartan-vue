import { SButton } from "./../index.js";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: SButton,
  args: {
    color: "primary",
    default: "Button Text",
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
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

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <SButton v-bind="args">
      <template v-if="${"default" in args}" v-slot>${args.default}</template>
    </SButton>
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
