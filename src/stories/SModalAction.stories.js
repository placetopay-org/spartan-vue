import { SModalAction, SButton } from "../index";
import { ExclamationIcon } from "@heroicons/vue/outline";

export default {
  title: "Components/SModalAction",
  component: SModalAction,
  args: {
    open: true,
  },
};

const Template = (args) => ({
  components: { SModalAction, SButton },
  setup() {
    return { args };
  },
  template: `
    <SModalAction v-bind="args">
      <template v-slot:title>{{ args.title }}</template>
      <template v-slot:description>{{ args.description }}</template>
      <template v-slot:actions>
        <SButton class="w-full" color="primary" v-if="args.darkButton">{{ args.darkButton }}</SButton>
        <div class="sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
          <SButton class="w-full" color="white" v-if="args.whiteButton">{{ args.whiteButton }}</SButton>
          <SButton class="w-full" color="danger" v-if="args.dangerButton">{{ args.dangerButton }}</SButton>
        </div>
      </template>
    </SModalAction>
  `,
});

export const ModalSucessSm = Template.bind({});

ModalSucessSm.args = {
  size: "sm",
  type: "success",
  title: "Purchase Completed",
  description:
    "Your purchase has been completed, a receipt will be sent to your email account.",
  darkButton: "Go back to dashboard",
};

export const ModalConfirmation = Template.bind({});

ModalConfirmation.args = {
  size: "lg",
  template: "empty",
  type: "danger",
  title: "Delete User",
  description:
    "Are you sure you want to delete the user 'Jhon Doe'? This action cannot be undone.",
  whiteButton: "Cancel",
  dangerButton: "Borrar",
};

export const DefaultActions = Template.bind({});

DefaultActions.args = {
  size: "sm",
  type: "default",
  title: "Trial Plan",
  description:
    "You don't have access to this feature, please upgrade your plan",
  darkButton: "Go to billing",
};
