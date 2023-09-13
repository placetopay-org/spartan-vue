import { ref } from 'vue';
import { SRadioGroups } from '../index';

export default {
    title: 'Components/SRadioGroups',
    argTypes: {},
    component: SRadioGroups,
};

const Template = (args) => ({
    components: { SRadioGroups },
    setup() {
        const model = ref(null);
        return { args, model };
    },
    template: `
      <SRadioGroups v-model="model" v-bind="args" />
      `,
});

export const Default = Template.bind({});

Default.args = {
    options: [
        {
            id: 'name',
            title: 'Name',
        },
        {
            id: 'last_name',
            title: 'Last Name',
        },
        {
            id: 'password',
            title: 'Password',
            description: 'User will be able to create new sites.',
        },
        {
            id: 'theme',
            title: 'Theme',
            description: 'User will be able to create new sites.',
        },
    ],
    name: 'example_options',
};
