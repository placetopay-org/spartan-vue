import { ref, watchEffect } from "vue";
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
    let model = ref(args.model);
    watchEffect(() => {
      console.log("changed", model.value);
    })
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
  placeholder: "Selecciona una opción",
  options: [
    { value: "visa", label: "Visa" },
    { value: "master", label: "Mastercard" },
    { value: "aexpress", label: "American Express" },
  ],
  model: "visa",
};

export const Select = Template.bind({});
Select.args = {
  ...defaultArgs,
};
