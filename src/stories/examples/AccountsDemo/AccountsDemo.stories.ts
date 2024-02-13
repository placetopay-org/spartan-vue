import AccountsDemoForm from './AccountsDemoForm.vue';
import { createDefault } from '../../../helpers';

export default {
    title: 'examples/AccountsDemo',
};

export const Form = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'bg-red-50 w-[958px] h-[600px]',
    components: { AccountsDemoForm },
    args: {
        modelValue: true,
    },
    template: `<AccountsDemoForm v-bind="args" v-model="args.modelValue"/>`,
});
