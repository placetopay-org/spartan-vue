import { SToggle } from "../index";

export default {
  title: "Components/SToggle",
  component: SToggle,
};

const Template = (args) => ({
  components: { SToggle },
  setup() {
    return { args };
  },
  template: `
    <SToggle v-model=""></SToggle>
    `,
});

export const Simple = Template.bind({});

Simple.args = {
  modelValue: true,
};
