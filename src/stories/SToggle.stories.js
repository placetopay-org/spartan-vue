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
    <SToggle v-bind="args">
     <template v-if="!!args.title" v-slot:title>
      {{ args.title }}
     </template>

     <tem plate v-if="!!args.description" v-slot:description>
      {{ args.description }}
     </template>
    </SToggle>
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