import { ref } from "vue";
import { SToggle } from "../index";

export default {
  title: "Components/SToggle",
  component: SToggle,
};

const Template = (args) => ({
  components: { SToggle },
  setup() {
    const model = ref(args.modelValue);
    return { args, model };
  },
  template: `
    <SToggle v-model="model"></SToggle>
    `,
});

export const Simple = Template.bind({});

Simple.args = {
  modelValue: true,
};
