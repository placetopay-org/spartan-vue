import { SAvatarMenu, SAvatar, SMenuItem } from "../index.js";
import * as SAvatarStories from "./SAvatar.stories";
import { HomeIcon, CogIcon, UserIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SAvatarMenu",
  component: SAvatarMenu,
  subcomponents: { SMenuItem },
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
  components: { SAvatarMenu, SAvatar, SMenuItem },

  setup() {
    return { args, HomeIcon, CogIcon, UserIcon };
  },
  template: `
    <SAvatarMenu v-bind="args">
      <template v-slot>
        <SAvatar name="John Doe" alt="Jhon Doe Avatar"></SAvatar>
      </template>

      <template v-slot:menu-items >
        <SMenuItem v-for="item in args.items" :key="item.key" :icon="item.icon">{{ item.text }}</SMenuItem>
      </template>
    </SAvatarMenu>
  `,
});

export const Default = Template.bind({});
Default.args = {
  items: [
    { key: "1", text: "Settings" },
    { key: "2", text: "Home" },
    { key: "4", text: "My Account" },
  ],
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  items: [
    { key: "1", text: "Settings", icon: CogIcon },
    { key: "2", text: "Home", icon: HomeIcon },
    { key: "4", text: "My Account", icon: UserIcon },
  ],
};
