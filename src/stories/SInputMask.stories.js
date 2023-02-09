import { ref } from "vue";
import { SInputMask } from "../index.js";

export default {
  title: "Components/SInputMask",
  component: SInputMask,
  argTypes: {},
  decorators: [
    () => ({
      template: '<div class="max-w-md mx-auto border-none"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: {
    SInputMask,
  },
  setup() {
    const model = ref('');
    return { args, model };
  },
  template: `
    <div class="border-none">
      <SInputMask v-bind="args" v-model="model" />
      <span>{{model}}</span>
    </div>
  `,
});


const defaultArgs = {
  label: "Document",
  placeholder: "John Doe",
  id: "field_name",
  name: "field_name",
  mask: [
    { mask: "0.000.000-*" },
    { mask: "00.000.000-*" },
    { mask: "000.000.000-*" },
  ],
};

export const InputBase = Template.bind({});
InputBase.args = defaultArgs;