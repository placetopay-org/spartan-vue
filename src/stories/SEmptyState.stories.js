import { SEmptyState, SButton } from "../index";
import { PlusIcon } from "@heroicons/vue/solid";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SEmptyState",
  component: SEmptyState,
  args: {
    title: "You dont have any reports",
    description:
      "There are no records available. you can start by adding a new one.",
  },
  decorators: [
    () => ({
      template: '<div class="flex bg-gray-100 py-12 px-8"><story /></div>',
    }),
  ],
};

const Template = (args) => ({
  components: { SEmptyState, SButton },
  setup() {
    return { args, PlusIcon, ExclamationIcon };
  },
  template: `
    <SEmptyState v-bind="args" class="mx-auto w-full max-w-lg">
      <template v-slot:title>
        {{ args.title }}
      </template>

      <template v-slot:description>
        {{ args.description }}
      </template>

      <template v-slot:actions>
        <SButton v-if="args.cta1" color="primary" :icon="PlusIcon">New Report</SButton>
      </template>
    </SEmptyState>`,
});

export const Default = Template.bind({});
Default.args = {
  cta1: false,
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  cta1: false,
  icon: ExclamationIcon,
};

export const WithCTA = Template.bind({});
WithCTA.args = {
  cta1: true,
};
