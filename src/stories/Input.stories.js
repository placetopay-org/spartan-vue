import { SInput } from "./../index.js";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/Input",
  component: SInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
  decorators: [
    () => ({ template: '<div class="max-w-xs border-none"><story /></div>' }),
  ],
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<SInput v-bind="args">{{ args.label }}</SInput>`,
});

export const TextInput = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
TextInput.args = {
  label: "Correo electrónico",
  placeholder: "jhon@example.com",
  type: "email",
  id: "email",
  name: "email",
};
