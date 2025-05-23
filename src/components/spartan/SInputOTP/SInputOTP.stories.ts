import { ref } from 'vue';
import { SInput } from '../SInput';
import SInputOTP from './SInputOTP.vue';
import SInputOTPItem from './SInputOTPItem.vue';
import { buildSourceBinding, createDefault, createVariation, createHistory } from '@/helpers';

export default {
    component: SInputOTP,
    title: 'inputs/InputOTP',
    ...createHistory({
        description:
            'The `SInputOTP` component is a container for `SInputOTPItem` components. It is used to input OTP codes.',
        slots: [
            {
                name: 'default',
                description: 'The default slot for `SInputOTPItem` components.',
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
    components: { SInputOTP, SInputOTPItem, SInput },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOTP v-model="value" v-bind="args">
    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />

    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />
</SInputOTP>

<hr class="mt-8" />
<p class="text-xs text-gray-400 mb-2">v-model test: {{ value }}</p>

<SInput type="text" v-model="value" />`,
    transform: (args) => `<SInputOTP ${sourceBinding(args)}>${args.default}</SInputOTP>`,
    args: {
        disabled: false,
        success: false,
        error: false,
    },
});

export const Base = createVariation({
    components: { SInputOTP, SInputOTPItem },
    containerClass: 'grid grid-cols-2 gap-4',
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOTP v-model="value">
    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />

    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />
</SInputOTP>
`,
});

export const Disabled = createVariation({
    components: { SInputOTP, SInputOTPItem },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOTP v-model="value" disabled>
    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />

    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />
</SInputOTP>`,
});

export const Success = createVariation({
    components: { SInputOTP, SInputOTPItem },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOTP v-model="value" success>
    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />

    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />
</SInputOTP>`,
});

export const Error = createVariation({
    components: { SInputOTP, SInputOTPItem },
    setup: () => {
        const value = ref('');

        return { value };
    },
    template: `<SInputOTP v-model="value" error>
    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />

    <SInputOTPItem />
    <SInputOTPItem />
    <SInputOTPItem />
</SInputOTP>`,
});
