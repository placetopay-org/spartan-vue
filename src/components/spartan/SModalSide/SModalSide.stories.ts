import SModalSide from './SModalSide.vue';
import { ref } from 'vue';
import { SButton } from '../SButton';
import { createDefault, createVariation } from '@/helpers';

export default {
    component: SModalSide,
    title: 'modals/ModalSide',
    parameters: {
        docs: {
            description: {
                component: `A modal that slides in from the left or right side of the screen. This component is a replacement for ModalLeft with additional side customization.

## Migration from ModalLeft

SModalSide is fully compatible with ModalLeft when using default values:

\`\`\`vue
<!-- Before: ModalLeft -->
<SModalLeft :open="open" @close="handleClose">
  <Content />
</SModalLeft>

<!-- After: SModalSide (identical behavior) -->
<SModalSide :open="open" @close="handleClose">
  <Content />
</SModalSide>

<!-- SModalSide from the right (new feature) -->
<SModalSide :open="open" side="right" @close="handleClose">
  <Content />
</SModalSide>
\`\`\`

All props are maintained: \`backdropClass\`, \`breakpoint\`, \`class\`
All events are maintained: \`@close\`, \`@backdropClick\``,
            },
        },
    },
    argTypes: {
        // Events
        close: {
            control: { type: null },
            description: 'Emitted when the close button (X) is clicked.',
            table: { type: { summary: null }, category: 'Events' },
        },
        backdropClick: {
            control: { type: null },
            description: 'Emitted when the backdrop is clicked.',
            table: { type: { summary: null }, category: 'Events' },
        },

        // Slots
        default: {
            control: { type: null },
            table: { type: { summary: null }, category: 'Slots' },
            description: 'The content of the modal.',
        },

        // Props
        open: {
            control: { type: null },
            description: 'Whether the modal is open or not.',
            table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
        },
        side: {
            control: { type: 'select' },
            options: ['left', 'right'],
            description: 'Side from which the modal slides in.',
            table: { type: { summary: "'left' | 'right'" }, defaultValue: { summary: "'left'" } },
        },
        backdropClass: {
            control: { type: 'text' },
            description: 'Additional CSS classes for the backdrop.',
            table: { type: { summary: 'string' }, defaultValue: { summary: "''" } },
        },
        breakpoint: {
            control: { type: 'select' },
            options: [undefined, 'sm', 'md', 'lg', 'xl', '2xl'],
            description: 'Breakpoint above which the modal is hidden. Useful for responsive designs.',
            table: {
                type: { summary: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | number" },
                defaultValue: { summary: 'undefined' },
            },
        },
        class: {
            control: { type: 'text' },
            description: 'Additional CSS classes for the root element.',
            table: { type: { summary: 'string' }, defaultValue: { summary: "''" } },
        },
    },
};

export const Default = createDefault({
    components: { SModalSide, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalSide :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-8 w-80 h-full border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        Any Element!

        <button class="bg-blue-300 px-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">X</button>
    </div>
</SModalSide>

    <SButton @click="() => open = true">Open Modal</SButton>`,
    transform: () => `<SModalSide :open="open" @close="() => open = false">
    <div class="yellow-element">
        Any Element!

        <button class="blue-element" @click="() => open = false">X</button>
    </div>
</SModalSide>

    <SButton @click="() => open = true">Open Modal</SButton>`,
    args: {
        default: undefined,
        open: undefined,
        close: undefined,
        backdropClick: undefined,
    },
});

export const RightSide = createVariation({
    components: { SModalSide, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalSide :open="open" side="right" @close="() => open = false">
    <div class="bg-green-300 flex flex-col gap-8 w-80 h-full border-dashed border-4 border-green-600 font-bold text-green-800 justify-center items-center">
        Sliding from the right!

        <button class="bg-blue-300 px-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">X</button>
    </div>
</SModalSide>

    <SButton @click="() => open = true">Open Right Modal</SButton>`,
});

export const WithCloseTrigger = createVariation({
    components: { SModalSide, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalSide :open="open" @close="() => open = false">
    <div class="bg-yellow-300 flex flex-col gap-10 w-80 h-full border-dashed border-4 border-yellow-600 font-bold text-yellow-800 justify-center items-center">
        <span>Any Element</span>

        <button class="bg-blue-300 px-4 py-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">Close trigger!</button>
    </div>
</SModalSide>

<SButton @click="() => open = true">Open Modal</SButton>`,
});

export const RightSideWithCloseTrigger = createVariation({
    components: { SModalSide, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalSide :open="open" side="right" @close="() => open = false">
    <div class="bg-green-300 flex flex-col gap-10 w-80 h-full border-dashed border-4 border-green-600 font-bold text-green-800 justify-center items-center">
        <span>From the right!</span>

        <button class="bg-blue-300 px-4 py-2 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex items-center" @click="() => open = false">Close trigger!</button>
    </div>
</SModalSide>

<SButton @click="() => open = true">Open Right Modal</SButton>`,
});

export const CustomBackdrop = createVariation({
    components: { SModalSide, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalSide :open="open" backdropClass="bg-purple-900/50" @close="() => open = false">
    <div class="bg-purple-300 flex flex-col gap-8 w-80 h-full border-dashed border-4 border-purple-600 font-bold text-purple-800 justify-center items-center">
        Custom purple backdrop!
    </div>
</SModalSide>

<SButton @click="() => open = true">Open Modal</SButton>`,
});

export const WithBreakpoint = createVariation({
    components: { SModalSide, SButton },
    setup: () => {
        const open = ref(false);

        return { open };
    },
    template: `<SModalSide :open="open" breakpoint="md" @close="() => open = false">
    <div class="bg-orange-300 flex flex-col gap-8 w-80 h-full border-dashed border-4 border-orange-600 font-bold text-orange-800 justify-center items-center">
        Only visible on screens smaller than 768px (md breakpoint)
    </div>
</SModalSide>

<SButton @click="() => open = true">Open Modal (Responsive)</SButton>`,
});
