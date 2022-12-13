import { SButton } from "../index.js";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/vue/24/solid";

export default {
  title: "Components/SButton",
  component: SButton,
  args: {
    color: "primary",
    text: "Button Text",
  },
  argTypes: {
    color: {
      control: { type: "select" },
      options: ["primary", "default", "danger", "white"],
    },
    default: {
      control: { type: "text" },
    },
  },
};

const Template = (args) => ({
  components: { SButton, MagnifyingGlassIcon },
  setup() {
    return { args };
  },
  template: `
    <SButton v-bind="args">
      <template v-if="args.text">{{ args.text }}</template>
    </SButton>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  color: "primary",
};

export const Default = Template.bind({});
Default.args = {
  color: "default",
};

export const White = Template.bind({});
White.args = {
  color: "white",
};

export const Danger = Template.bind({});
Danger.args = {
  color: "danger",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const IsLoading = Template.bind({});
IsLoading.args = {
  isLoading: true,
};

export const FlatLeft = Template.bind({});
FlatLeft.args = {
  flatLeft: true,
};

export const FlatRight = Template.bind({});
FlatRight.args = {
  flatRight: true,
};

export const withLeftIcon = Template.bind({});
withLeftIcon.args = {
  leftIcon: MagnifyingGlassIcon,
};

export const withRightIcon = Template.bind({});
withRightIcon.args = {
  rightIcon: MagnifyingGlassIcon,
};

export const onlyIcon = Template.bind({});
onlyIcon.args = {
  text: false,
  icon: MagnifyingGlassIcon,
};

export const Circle = Template.bind({});
Circle.args = {
  text: false,
  icon: PlusIcon,
  roundedFull: true,
};

export const circleDanger = Template.bind({});
circleDanger.args = {
  text: false,
  icon: PlusIcon,
  color: "danger",
  roundedFull: true,
};
