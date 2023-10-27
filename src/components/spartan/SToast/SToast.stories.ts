import SToast from './SToast.vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SToast,
    title: 'new/Toast',
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
        description: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the link.',
        },

        // Props
        type: {
            control: 'select',
            options: ['success', 'danger', 'warning'],
            description: 'The type of the input element.',
            table: { type: { summary: 'success | danger | warning' } },
        },
        leftBorder: {
            control: 'boolean',
            description: 'The type of the input element.',
            table: { type: { summary: 'boolean' } },
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SToast },
    template: `<SToast v-bind="args">
    {{args.default}}

    <template #description>
        {{args.description}}
    </template>
</SToast>`,
    transform: (args) => `<SToast ${sourceBinding(args)}>${args.default}</SToast>`,
    args: {
        default: 'Toast!',
        description: '',
        leftBorder: true,
        type: 'success',
    },
});

export const Base = createVariation({
    components: { SToast },
    template: `<SToast>Successfully saved!</SToast>`,
});

export const ToastTypes = createVariation({
    components: { SToast },
    containerClass: 'grid gap-3 grid-cols-3',
    template: `<SToast type="success">
    Successfully saved!

    <template #description>
        Anyone with a link can now view this file.
    </template>
</SToast>

<SToast type="danger">
    Something went wrong!

    <template #description>
        Please try again later.
    </template>
</SToast>

<SToast type="warning">
    You have unsaved changes!

    <template #description>
        Please save your changes.
    </template>
</SToast>`,
});

export const WithLeftBorder = createVariation({
    components: { SToast },
    containerClass: 'grid gap-3 grid-cols-3',
    template: `<SToast type="success" leftBorder>
    Successfully saved!

    <template #description>
        Anyone with a link can now view this file.
    </template>
</SToast>

<SToast type="danger" leftBorder>
    Something went wrong!

    <template #description>
        Please try again later.
    </template>
</SToast>

<SToast type="warning" leftBorder>
    You have unsaved changes!

    <template #description>
        Please save your changes.
    </template>
</SToast>`,
});
