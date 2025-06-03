import { ref } from 'vue';
import { SInput } from '../SInput';
import SInputOtp from './SInputOtp.vue';
import SInputOtpItem from './SInputOtpItem.vue';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';

export default {
    component: SInputOtp,
    title: 'inputs/InputOtp',
    ...createHistory({
        description:
            'The `SInputOtp` component is a container for `SInputOtpItem` components. It is used to input Otp codes.',
        slots: [
            {
                name: 'default',
                description: 'The default slot for `SInputOtpItem` components.',
            },
        ],
        props: [
            {
                name: 'class',
                type: 'string',
                description: 'The class to apply to the input.',
                control: null,
            },
            {
                name: 'disabled',
                type: 'boolean',
                description: 'Disables the input.',
                control: 'boolean',
            },
            {
                name: 'success',
                type: 'boolean',
                description: 'Sets the input to success state.',
                control: 'boolean',
            },
            {
                name: 'error',
                type: 'boolean',
                description: 'Sets the input to error state.',
                control: 'boolean',
            },
            {
                name: 'modelValue',
                type: 'string',
                description: 'The value of the input.',
                control: null,
            },
        ],
        events: [
            {
                name: 'update:modelValue',
                description: 'Emitted when the value of the input changes.',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SInputOtp, SInputOtpItem, SInput },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOtp v-model="value" v-bind="args">
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtp>

<hr class="mt-8" />
<p class="text-xs text-gray-400 mb-2">v-model test: {{ value }}</p>

<SInput type="text" v-model="value" />`,
    transform: (args) => `<SInputOtp ${sourceBinding(args)}>${args.default}</SInputOtp>`,
    args: {
        disabled: false,
        success: false,
        error: false,
    },
});

export const Base = createVariation({
    components: { SInputOtp, SInputOtpItem },
    containerClass: 'grid grid-cols-2 gap-4',
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOtp v-model="value">
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtp>
`,
});

export const Disabled = createVariation({
    components: { SInputOtp, SInputOtpItem },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOtp v-model="value" disabled>
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtp>`,
});

export const Success = createVariation({
    components: { SInputOtp, SInputOtpItem },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOtp v-model="value" success>
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtp>`,
});

export const Error = createVariation({
    components: { SInputOtp, SInputOtpItem },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOtp v-model="value" error>
    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />

    <SInputOtpItem />
    <SInputOtpItem />
    <SInputOtpItem />
</SInputOtp>`,
});
