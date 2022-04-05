import { SCheckbox } from "../index";

export default {
  title: "Components/SCheckbox",
  component: SCheckbox,
};

const Template = (args) => ({
  components: { SCheckbox },
  setup() {
    return { args };
  },
  template: `
    <SCheckbox v-bind="args">
        {{ args.label}}
        <template v-if="!!args.description" v-slot:description>
          {{ args.description }}
        </template>
    </SCheckbox>
    `,
});

export const Simple = Template.bind({});

Simple.args = {
  id: "create-sites",
  label: "Create Sites",
  description: false,
};

export const WithDescription = Template.bind({});

WithDescription.args = {
  id: "create-sites",
  label: "Create Sites",
  description: "User will be able to create new sites.",
};

export const InlineDescription = Template.bind({});

InlineDescription.args = {
  id: "create-sites",
  label: "Create Sites",
  description: "User will be able to create new sites.",
  inlineDescription: true,
};
