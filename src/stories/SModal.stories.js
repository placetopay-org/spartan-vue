import { SModalLayout, SButton } from "../index";

export default {
  title: "Components/SModal",
  component: SModalLayout,
  args: {
    open: true,
  },
};

const Template = (args) => ({
  components: { SModalLayout, SButton },
  setup() {
    return { args };
  },
  template: `
    <SModalLayout v-bind="args">
      <div v-if="args.template === 'empty'" class="p-6">
        <div class="h-64 border-gray-300 border-dashed border-2 rounded-2xl"></div>
      </div>
    </SModalLayout>
  `,
});

export const Modal = Template.bind({});

Modal.args = {
  size: "sm",
  template: "empty",
};

export const ModalLg = Template.bind({});

ModalLg.args = {
  size: "lg",
  template: "empty",
};
