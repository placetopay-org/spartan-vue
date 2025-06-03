import SInputOtpBlock from './SInputOtpBlock.vue';
import { SInputOtpItem } from '@spartan';
import { buildSourceBinding, createDefault, createVariation as buildVariation } from '@/helpers';

export default {
    component: SInputOtpBlock,
    title: 'inputBlocks/InputOtpBlock',
    parameters: {
        docs: {
            description: { component: 'The `SInputOtp` component is a container for `SInputOtpItem` components. It is used to input OTP codes.' },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: 'The event emitted when the input value changes.',
        },

        // Slots
        default: {
            control: { type: null },
            description: 'The slot for SInputOtpItems',
            table: { type: { summary: 'VNode | VNode Array' } },
        },

        // Props
        id: {
            control: 'text',
            description: 'The id of the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        errorText: {
            control: 'text',
            description: 'The error message to be displayed when the input has an error.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        helpText: {
            control: 'text',
            description: 'The help message to be displayed below the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
        label: {
            control: 'text',
            description: 'The label of the input.',
            table: { type: { summary: 'string' }, category: 'Props' },
        },
    },
};

const sourceBinding = buildSourceBinding({
    check: ['disabled', 'error'],
    custom: { icon: true },
    prop: {
        id: undefined,
        label: undefined,
        errorText: undefined,
        helpText: undefined,
    },
});

// TODO: add design
export const Default = createDefault({
    design: '',
    components: {
        SInputOtpBlock,
        SInputOtpItem,
    },
    template: `<SInputOtpBlock v-bind="args" v-model="value">
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtpBlock>`,
    transform: (args) => `<SInputOtpBlock ${sourceBinding(args)}>
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtpBlock>`,
    args: {
        id: 'test-id',
        label: 'Custom label',
        errorText: '',
        helpText: '',
    },
});

const createVariation = ({ template, ...rest }: { template: string }) =>
    buildVariation({
        template,
        components: {
            SInputOtpBlock,
            SInputOtpItem,
        },
        containerClass: 'w-[200px]',
        ...rest,
    });

export const WithLabel = createVariation({
    template: `<SInputOtpBlock label="Otp" id="test-id">
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtpBlock>`,
});

export const WithHelpText = createVariation({
    template: `<SInputOtpBlock id="test-id" label="Token" helpText="complete the code">
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtpBlock>`,
});

export const WithErrorText = createVariation({
    template: `<SInputOtpBlock id="test-id" label="Code" errorText="the code is mandatory">
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtpBlock>`,
});
