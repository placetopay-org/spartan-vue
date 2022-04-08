import { SModal, SButton } from "../index";

export default {
  title: "Components/SModal",
  component: SModal,
};

const Template = (args) => ({
  components: { SModal, SButton },
  setup() {
    return { args };
  },
  template: `
    <SModal
        :title="args.title"
        :description="args.description"
        :max-size="args.maxSize"
    >
      <SButton class="w-full  justify-center" color="primary">Deactivate</SButton>
    </SModal>
  `,
});

export const Modal = Template.bind({});

Modal.args = {
  title: 'Payment successful',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.',
  maxSize: false,
};

const TemplateF = (args) => ({
  components: { SModal, SButton },
  setup() {
    return { args };
  },
  template: `
    <SModal
        :title="args.title"
        :description="args.description"
        :max-size="args.maxSize"
    >
      <SButton class="w-full justify-center" color="white">Cancel</SButton>
      <SButton class="w-full  justify-center" color="primary">Deactivate</SButton>
    </SModal>
  `,
});

export const ModalMax = TemplateF.bind({});
ModalMax.args = {
  title: 'Payment successful',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.',
  maxSize: true,
};
