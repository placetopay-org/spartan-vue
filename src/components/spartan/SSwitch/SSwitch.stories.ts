import SSwitch from './SSwitch.vue';
import { ref } from 'vue';
import { buildSourceBinding, createDefault, createVariation } from '@/helpers';
import { LockClosedIcon, LockOpenIcon, BellIcon } from '@heroicons/vue/24/solid';

export default {
    component: SSwitch,
    title: 'new/Switch',
    parameters: {
        docs: {
            description: {
                component: '-',
            },
        },
    },
    argTypes: {
        // Events
        'update:modelValue': {
            control: { type: null },
            table: { type: { summary: null }, category: 'Events' },
            description: '-',
        },

        // Slots
        default: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: '-',
        },
        description: {
            control: 'text',
            table: { type: { summary: null }, category: 'Slots' },
            description: '-',
        },

        // Props
        passive: {
            description: 'If true, clicking content will not change the value',
            table: { type: { summary: 'boolean' } },
        },
        reverse: {
            description: 'If true, the switch will be reversed',
            table: { type: { summary: 'boolean' } },
        },
        modelValue: {
            control: { type: null },
            table: { type: { summary: 'string' } },
            description: '-',
        },
    },
};

const sourceBinding = buildSourceBinding({});

export const Default = createDefault({
    components: { SSwitch },
    template: `<SSwitch v-bind="args" v-model="args.modelValue">
    <template v-if="args.default">
        {{ args.default }}
    </template>
    
    <template v-if="args.description" #description>
        {{ args.description }}
    </template>
</SSwitch>`,
    transform: (args) => `<SSwitch ${sourceBinding(args)} />`,
    args: {
        passive: 'false',
        reverse: false,
        default: '',
        description: '',
    },
});

export const Base = createVariation({
    components: { SSwitch },
    template: `<SSwitch v-model="value" />`,
});

export const WithLabel = createVariation({
    components: { SSwitch },
    template: `<SSwitch v-model="value">
    Label text
</SSwitch>`,
});

export const WithDescription = createVariation({
    components: { SSwitch },
    template: `<SSwitch v-model="value">
    <template #description>
        Description text
    </template>
</SSwitch>`,
});

export const WithLabelAndDescription = createVariation({
    components: { SSwitch },
    template: `<SSwitch v-model="value">
    Label text
    <template #description>
        Description text
    </template>
</SSwitch>`,
});

export const PassiveMode = createVariation({
    components: { SSwitch },
    setup: () => {
        const value1 = ref(false);
        const value2 = ref(false);

        return { value1, value2 };
    },
    template: `<SSwitch v-model="value1">
    Passive mode: OFF (default)
    <template #description>
        Click content will change the value
    </template>
</SSwitch>

<SSwitch v-model="value2" passive>
    Passive mode: ON
    <template #description>
        Click content will not change the value
    </template>
</SSwitch>`,
});

export const Reverse = createVariation({
    components: { SSwitch },
    setup: () => {
        const value1 = ref(false);
        const value2 = ref(false);

        return { value1, value2 };
    },
    template: `<SSwitch v-model="value1" class="border-2 border-dashed border-gray-400 p-4">
    Default distribution (left to right)
    <template #description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.
    </template>
</SSwitch>

<SSwitch v-model="value2" reverse class="border-2 border-dashed border-gray-400 p-4">
    Reverse distribution (right to left)
    <template #description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod.
    </template>
</SSwitch>`,
});

export const WithDefaultIcon = createVariation({
    components: { SSwitch },
    template: `<SSwitch v-model="value" icon />`,
});

export const WithCustomIcon = createVariation({
    components: { SSwitch },
    setup: () => {
        const value = ref(false);
        return { value, BellIcon };
    },
    template: `<SSwitch v-model="value" :icon="BellIcon" />`,
});

export const WithCustomOffAndOnIcons = createVariation({
    components: { SSwitch },
    setup: () => {
        const value = ref(false);
        return { value, LockClosedIcon, LockOpenIcon };
    },
    template: `<SSwitch v-model="value" :iconOff="LockOpenIcon" :iconOn="LockClosedIcon" />`,
});
