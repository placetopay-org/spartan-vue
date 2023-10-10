import SNotification from './SNotification.vue';
import { buildSourceBinding, createDefault } from '@/helpers';

export default {
    component: SNotification,
    title: 'new/Notification',
    parameters: {
        docs: {
            description: {
                component: 'The link component is used to navigate between pages.',
            },
        },
    },
    argTypes: {
        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the link.',
        },

        // Props
        type: {
            control: 'select',
            options: ['success', 'error', 'warning'],
            description: 'The type of the input element.',
            table: { type: { summary: 'success | error | warning' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?node-id=4793%3A17239',
    components: { SNotification },
    template: `<SNotification v-bind="args">{{args.default}}</SNotification>`,
    transform: (args) => `<SNotification ${sourceBinding(args)}>${args.default}</SNotification>`,
    args: {
        default: 'New message',
        type: 'success',
    },
});
