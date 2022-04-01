import {
  SDropdown,
  SDropdownItem,
  SAvatarMenuButton,
  SDropdownButton,
} from "../index.js";

import { HomeIcon, CogIcon, UserIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SDropdown",
  component: SDropdown,
  subcomponents: { SDropdownItem },
  argTypes: {
    default: {
      control: { type: "text" },
    },
  },
  decorators: [
    () => ({
      template:
        '<div class="w-full max-w-md flex justify-end pb-36"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: {
    SDropdown,
    SDropdownItem,
    SAvatarMenuButton,
    SDropdownButton,
  },

  setup() {
    return { args, HomeIcon, CogIcon, UserIcon };
  },
  template: `
    <SDropdown v-bind="args">
      <template v-slot>
        <SAvatarMenuButton v-if="args.button === 'avatar'" name="John Doe"></SAvatarMenuBUtton>
        <SDropdownButton v-if="args.button === 'button'" color="white">
          Options
        </SDropdownButton>
      </template>

      <template v-slot:menu-items>
        <SDropdownItem v-for="item in args.items" :key="item.key" :icon="item.icon">{{ item.text }}</SDropdownItem>
      </template>
    </SDropdown>
  `,
});

export const Default = Template.bind({});
Default.args = {
  button: "button",
  items: [
    { key: "1", text: "Settings" },
    { key: "2", text: "Home" },
    { key: "4", text: "My Account" },
  ],
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  button: "avatar",
  items: [
    { key: "1", text: "Settings" },
    { key: "2", text: "Home" },
    { key: "4", text: "My Account" },
  ],
};

export const ItemsWithIcons = Template.bind({});
ItemsWithIcons.args = {
  button: "button",
  items: [
    { key: "1", text: "Settings", icon: CogIcon },
    { key: "2", text: "Home", icon: HomeIcon },
    { key: "4", text: "My Account", icon: UserIcon },
  ],
};
