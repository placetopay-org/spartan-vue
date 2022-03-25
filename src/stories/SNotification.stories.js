import { SNotification } from "../index";

export default {
    title: "Components/SNotification",
    component: SNotification,
};

const Template = ( args ) => ({
    components: { SNotification },
    setup() {
        return { args };
    },
    template: `
      <SNotification
          :label="args.label"
          :danger="args.danger"
          :show="args.show"
      >
      </SNotification>`,
});

export const Successful = Template.bind({});

Successful.args = {
    label: 'Label',
    danger: false,
    show: true
}

export const Danger = Template.bind({});

Danger.args = {
    label: 'Label',
    danger: true,
    show: true
}