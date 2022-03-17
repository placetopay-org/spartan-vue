import { SAvatarMenu, SAvatar, SMenuItem } from "../index.js";
import * as AvatarStories from "./Avatar.stories";

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: "Example/AvatarMenu",
  component: SAvatarMenu,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    default: {
      control: { type: "text" },
    },
  },
  decorators: [
    () => ({
      template:
        '<div class="w-full max-w-sm flex justify-end pb-16"><story /></div>',
    }),
  ],
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SAvatarMenu, SAvatar, SMenuItem },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <SAvatarMenu>
      <template v-if="${"default" in args}" v-slot>${args.default}</template>

      <template v-slot:menu-items>
        <SMenuItem key="logout" href="/logout">
          Settings
        </SMenuItem>
      </template>
    </SAvatarMenu>
  `,
});

{
  /* <SAvatar :name="args.name" :alt="args.alt"></SAvatar> */
}

export const Default = Template.bind({});
console.log(AvatarStories.Default);
Default.args = {
  ...AvatarStories.default.args,
  default: "hola",
};

// export const WithText = Template.bind({});

// Default.args = {
//   ...AvatarStories.default.args,
// };
