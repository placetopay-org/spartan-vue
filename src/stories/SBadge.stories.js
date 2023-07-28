import { SBadge } from "../index.js";

export default {
  title: "Components/SBadge",
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["gray", "green", "red", "yellow", "blue", "primary"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
  component: SBadge,
};

const Template = (args, parameters) => ({
  components: { SBadge },
  setup() {
    return { args, parameters };
  },
  template: `<SBadge v-bind="args">{{ args.label }}</SBadge>`,

});

export const Default = Template.bind({});


Default.args = {
  label: "Default",
};

Default.parameters ={
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=220-2314&mode=design&t=2M2dC9vkSMAsks1E-4',
  },
}

export const Medium = Template.bind({});

Medium.args = {
  size: "md",
  color: "green",
  label: "Approved",
};

Medium.parameters ={
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=220-2298&mode=design&t=2M2dC9vkSMAsks1E-4',
  },
}

export const Large = Template.bind({});

Large.args = {
  size: "lg",
  color: "red",
  label: "12",
};
Large.parameters ={
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=2565-6277&mode=design&t=2M2dC9vkSMAsks1E-4',
  },
}