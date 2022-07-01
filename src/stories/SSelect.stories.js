import { ref } from "vue";
import { SSelect } from "../index.js";

export default {
  title: "Components/SSelect",
  component: SSelect,
  argTypes: {},
  decorators: [
    () => ({
      template: '<div class="max-w-md mx-auto border-none"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: { SSelect },
  setup() {
    let model = ref("");
    return { args, model };
  },
  template: `
    <SSelect v-bind="args" v-model="model"></SSelect>
  `,
});

const defaultArgs = {
  label: "Medio de pago",
  id: "payment_method",
  name: "payment_method",
  options: [
    { value: "", label: "Selecciona una opción" },
    { value: "visa", label: "Visa" },
    { value: "master", label: "Mastercard" },
    { value: "aexpress", label: "American Express" },
  ],
  model: null,
};

export const Select = Template.bind({});
Select.args = {
  ...defaultArgs,
};
