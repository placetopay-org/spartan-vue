import { SAvatar } from "../index.js";

export default {
  title: "Components/SAvatar",
  component: SAvatar,
  argTypes: {
    size: {
      control: { type: "select" },
      default: 'sm',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
  },
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
  size: "sm",
};
