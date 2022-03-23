import { SAvatar } from "../index.js";

export default {
  title: "Components/SAvatar",
  component: SAvatar,
  argTypes: {},
  decorators: [
    () => ({ template: '<div class="max-w-xs border-none"><story /></div>' }),
  ],
};

const Template = (args) => ({
  components: { SAvatar },
  setup() {
    return { args };
  },
  template: `<SAvatar v-bind="args">{{ args.label }}</SAvatar>`,
});

export const Default = Template.bind({});

Default.args = {
  name: "Jhon Doe",
  alt: "John Doe Avatar",
};
