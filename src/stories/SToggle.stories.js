import { ref } from "vue";
import { SToggle } from "../index";

export default {
  title: "Components/SToggle",
  component: SToggle,
};

const Template = ({ modelValue, ...rest }) => ({
  components: { SToggle },
  setup() {
    const model = ref(modelValue);
    return { args: rest, model };
  },
  template: `
    <SToggle v-bind="args" v-model="model" />
    `,
});

export const Simple = Template.bind({});

Simple.args = {
  modelValue: true,
};

export const WithTitle = Template.bind({});

WithTitle.args = {
  modelValue: true,
  title: "Create Sites",
};

export const WithDescription = Template.bind({});

WithDescription.args = {
  modelValue: true,
  title: "Create Sites",
  description: "User will be able to create new sites.",
};
