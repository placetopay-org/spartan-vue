import { SCard, SButton } from "../index";
import { PlusIcon } from "@heroicons/vue/solid";

export default {
  title: "Components/SCard",
  component: SCard,
  decorators: [
    () => ({
      template: '<div class="flex bg-gray-100 py-12 px-8"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: { SCard, SButton },
  setup() {
    return { args, PlusIcon };
  },
  template: `
    <SCard class="w-full max-w-sm mx-auto">
      <div class="h-64 border-gray-300 border-dashed border-2 rounded-2xl"></div>
    </SCard>`,
});

export const Default = Template.bind({});
Default.args = {};
