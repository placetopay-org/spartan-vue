import { SButton } from "./../index.js";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: SButton,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "default", "danger"],
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
  template: '<SButton v-bind="args">Button Text</SButton>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
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
