import { SRadioGroups } from "../index";

export default {
  title: "Components/SRadioGroups",
  argTypes: {},
  component: SRadioGroups,
};

const Template = (args) => ({
  components: { SRadioGroups },
  setup() {
    return { args };
  },
  template: `
      <SRadioGroups v-bind="args"/>
      `,
});

export const Default = Template.bind({});

Default.args = {
  options: [
    {
      id: "Name",
      title: "Name",
    },
    {
      id: "Last Name",
      title: "Last Name",
    },
    {
      id: "Password",
      title: "Password",
      description: "User will be able to create new sites.",
    },
    {
      id: "Theme",
      title: "Theme",
      description: "User will be able to create new sites.",
    },
  ],
};

