import { SCard, SButton, SCardHeader } from "../index";
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
  components: { SCard, SButton, SCardHeader },
  setup() {
    return { args, PlusIcon };
  },
  template: `
    <SCard class="w-full max-w-sm mx-auto">
      <div v-if="!args.header" class="h-64 border-gray-300 border-dashed border-2 rounded-2xl"></div>
      <template v-else>
        <SCardHeader><h1>This is a Card Heading</h1></SCardHeader>
        <p class="mt-4">Laboris nostrud commodo do deserunt consequat. Ut voluptate in officia velit ex ut occaecat dolor nisi incididunt cillum eiusmod. Cillum et ipsum eu laborum ad incididunt voluptate esse fugiat do occaecat mollit elit. Sit non do qui tempor incididunt ut consequat tempor sint. Nulla consequat deserunt elit excepteur minim et eu labore. Dolor mollit aliqua tempor occaecat commodo duis sunt exercitation ut.</p>
      </template>
    </SCard>`,
});

export const Default = Template.bind({});
Default.args = {
  header: false
};

export const WithHeader = Template.bind({});
WithHeader.args = {
  header: true
};