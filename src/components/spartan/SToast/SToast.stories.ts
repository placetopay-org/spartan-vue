import SToast from './SToast.vue';
import { toast, SToaster } from './toast';
import { SButton } from '@spartan';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';

export default {
    component: SToast,
    title: 'misc/Toast',
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

export const MessageByProp = createVariation({
    components: { SToast },
    template: `<SToast title="Successfully saved!" />`,
});

export const Description = createVariation({
    components: { SToast },
    template: `<SToast>
    Successfully saved!
    
    <template #description>
        Anyone with a link can now view this file.
    </template>
</SToast>`,
});

export const DescriptionByProp = createVariation({
    components: { SToast },
    template: `<SToast description="Anyone with a link can now view this file.">
    Successfully saved!
</SToast>`,
});

export const ToastTypes = createVariation({
    components: { SToast },
    containerClass: 'grid gap-3 grid-cols-1',
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
    containerClass: 'grid gap-3 grid-cols-1',
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

export const Closeable = createVariation({
    components: { SToast },
    containerClass: 'grid gap-3 grid-cols-1',
    template: `
<SToast title="Successfully saved!" closeable />
<SToast title="Successfully saved!" description="Anyone with a link can now view this file." closeable />    
`,
});

export const DisplayToast = createVariation({
    components: { SToast, SButton, SToaster },
    containerClass: 'grid gap-3 grid-cols-1 h-[150px]',
    setup: () => {

        const display = () => {
            toast({
                leftBorder: true,
                title: 'Successfully saved!',
                description: 'Anyone with a link can now view this file.',
                type: 'success',
                closeable: true,
                duration: Infinity,
                position: 'bottom-left',
            })
        }
        return { display };
    },
    template: `
<!-- Toaster component is required to display the toast
import { toast, SToaster } from '@spartan';

display: () => toast({
    title: 'Successfully saved!',
    description: 'Anyone with a link can now view this file.',
    type: 'success',
    closeable: true,
    duration: Infinity,
}) -->
<SButton @click="display">Display Toast</SButton>
<SToaster /> 
`,
});