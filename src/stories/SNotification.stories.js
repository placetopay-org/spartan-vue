import { SNotification } from '../index';

export default {
    title: 'Components/SNotification',
    component: SNotification,
};

const Template = (args) => ({
    components: { SNotification },
    setup() {
        return { args };
    },
    template: `
      <SNotification v-bind="args">
      {{ args.label}}
      </SNotification>`,
});

export const Successful = Template.bind({});

Successful.args = {
    label: 'Model updated!',
    type: 'success',
    show: true,
};

export const Danger = Template.bind({});

Danger.args = {
    label: 'Something went wrong',
    type: 'danger',
    show: true,
};
