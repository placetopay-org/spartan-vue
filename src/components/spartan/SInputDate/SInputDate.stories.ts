import SInputDate from './SInputDate.vue';
import { buildSourceBinding, createDefault, createHistory, createVariation } from '@/helpers';
import { ref } from 'vue';

export default {
    component: SInputDate,
    title: 'inputs/InputDate',
    ...createHistory({
        description: 'The input date component is used to select a date. It supports single date selection, date ranges, and time selection.',
        props: [
            {
                name: 'modelValue',
                type: 'string | string[] | null',
                description: 'The value of the input. For range mode, it returns an array with two dates [startDate, endDate].',
                default: 'null',
                control: null,
            },
            {
                name: 'range',
                type: 'boolean',
                description: 'Enable date range selection mode. When enabled, the user can select a start and end date.',
                default: 'false',
            },
            {
                name: 'enableTimePicker',
                type: 'boolean',
                description: 'Enable time selection in addition to date.',
                default: 'true',
            },
            {
                name: 'modelType',
                type: 'string',
                description: 'Format of the model value (e.g., "yyyy-MM-dd", "dd-MM-yyyy HH:mm").',
                default: 'null',
            },
            {
                name: 'hideInputIcon',
                type: 'boolean',
                description: 'Hide the input icon.',
                default: 'false',
            },
            {
                name: 'error',
                type: 'boolean',
                description: 'Show the input as an error.',
                default: 'false',
            },
            {
                name: 'class',
                type: 'string',
                description: 'The class to apply to the input.',
                default: '',
                control: null,
            },
            {
                name: 'placeholder',
                type: 'string',
                description: 'The placeholder to display in the input.',
                default: '',
                control: 'text',
            },
        ],
        events: [
            {
                name: 'update:modelValue',
                description: 'Emitted when the value of the input changes.',
                type: 'string | string[] | null',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SInputDate },
    containerClass: 'h-[500px]',
    setup: () => {
        const value = ref(null);
        return { value };
    },
    template: `<SInputDate v-model="value" v-bind="args" model-type="dd-MM-yyyy" /><pre>{{value}}</pre>`,
    transform: (args) => `<SInputDate ${sourceBinding(args)} />`,
    args: {
        hideInputIcon: false,
        error: false,
        placeholder: 'Select a date',
    },
});

export const Base = createVariation({
    components: { SInputDate },
    setup: () => {
        const value = ref('29-01-2000 14:30');
        return { value };
    },
    containerClass: 'h-[500px] w-[300px]',
    template: `<SInputDate v-model="value" v-bind="args" model-type="dd-MM-yyyy HH:mm" />
<pre>{{value}}</pre>`,
});

export const Range = createVariation({
    components: { SInputDate },
    setup: () => {
        const value = ref(null);
        return { value };
    },
    containerClass: 'h-[500px] w-[350px]',
    template: `<SInputDate
    v-model="value"
    range
    :enable-time-picker="false"
    model-type="yyyy-MM-dd"
    placeholder="Select date range"
/>
<pre class="mt-4 text-sm">Value: {{ value }}</pre>`,
});

export const RangeWithPresetValue = createVariation({
    components: { SInputDate },
    setup: () => {
        const value = ref(['2024-01-15', '2024-01-31']);
        return { value };
    },
    containerClass: 'h-[500px] w-[350px]',
    template: `<SInputDate
    v-model="value"
    range
    :enable-time-picker="false"
    model-type="yyyy-MM-dd"
    placeholder="Select date range"
/>
<pre class="mt-4 text-sm">Value: {{ value }}</pre>`,
});

export const RangeWithTime = createVariation({
    components: { SInputDate },
    setup: () => {
        const value = ref(null);
        return { value };
    },
    containerClass: 'h-[500px] w-[450px]',
    template: `<SInputDate
    v-model="value"
    range
    model-type="yyyy-MM-dd HH:mm"
    placeholder="Select date and time range"
/>
<pre class="mt-4 text-sm">Value: {{ value }}</pre>`,
});

export const RangeWithError = createVariation({
    components: { SInputDate },
    setup: () => {
        const value = ref(['2024-01-15', '2024-01-10']);
        return { value };
    },
    containerClass: 'h-[500px] w-[350px]',
    template: `<div>
    <SInputDate
        v-model="value"
        range
        :enable-time-picker="false"
        model-type="yyyy-MM-dd"
        placeholder="Select date range"
        error
    />
    <p class="mt-2 text-sm text-red-500">End date must be after start date</p>
</div>
<pre class="mt-4 text-sm">Value: {{ value }}</pre>`,
});
