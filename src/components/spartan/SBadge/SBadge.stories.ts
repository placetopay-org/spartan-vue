import SBadge from './SBadge.vue';
import {
    createDefault,
    createVariation,
    buildDesign,
    buildSourceBinding,
    createHistory,
} from '@/helpers';

export default {
    component: SBadge,
    title: 'display/Badge',
    ...createHistory({
        description:
            'A customizable and interactive badge component is easily integrated. Allows you to embed content and offers extensive appearance features.',
        slots: [
            {
                name: 'default',
                description: 'Default slot for badge content.',
                control: true,
            },
        ],
        events: [
            {
                name: 'removed',
                description: "This event is emitted when the badge's remove button is clicked.",
            },
        ],
        props: [
            {
                name: 'color',
                control: 'select',
                type: 'string',
                default: 'gray',
                description: "Determines the badge's color theme.",
                options: ['blue', 'gray', 'green', 'indigo', 'primary', 'red', 'yellow', 'white'],
            },
            {
                name: 'dot',
                type: 'boolean',
                default: 'false',
                description: 'If `true`, a dot will be displayed inside the badge.',
            },
            {
                name: 'outline',
                type: 'boolean',
                default: 'false',
                description:
                    "If `true`, the badge will be outlined with its color theme. Otherwise, it'll have a solid background of its color theme.",
            },
            {
                name: 'pill',
                type: 'boolean',
                default: 'false',
                description:
                    'If set to `true`, the badge will have fully rounded corners. Otherwise, it will have slightly rounded corners.',
            },
            {
                name: 'removable',
                type: 'boolean',
                default: 'false',
                description: 'If `true`, a remove button will be displayed inside the badge.',
            },
            {
                name: 'size',
                control: 'inline-radio',
                type: 'sm | md | lg',
                default: 'md',
                description: 'Dictates the size of the badge.',
                options: ['sm', 'md', 'lg'],
            },
            {
                name: 'border',
                type: 'boolean',
                default: 'false',
                description: 'If `true`, the badge will have a border.',
            },
        ],
    }),
};

const sourceBinding = buildSourceBinding({
    check: ['dot', 'outline', 'pill', 'removable'],
    prop: { color: 'gray', size: 'md' },
    emit: ['removed'],
});

export const Default = createDefault({
    design: 'https://www.figma.com/file/hRypwsAfjK2e0g9DOKLROV/Spartan-V2?type=design&node-id=220-2083',
    components: { SBadge },
    args: {
        default: 'Badge',
        color: 'gray',
        dot: false,
        outline: false,
        pill: false,
        removable: false,
        size: 'md',
        border: false,
    },
    transform: (args) => `<SBadge ${sourceBinding(args)}> ${args.default} </SBadge>`,
    template: '<SBadge v-bind="args"> {{ args.default }} </SBadge>',
});

const buildVariation = (template: string) =>
    createVariation({
        components: { SBadge },
        containerClass: 'flex gap-5 flex-wrap',
        template,
    });

export const Size = buildVariation(
    `
<SBadge color="blue" size="sm"> Small </SBadge>
<SBadge color="blue" size="md"> Medium </SBadge>
<SBadge color="blue" size="lg"> Large </SBadge>
`,
);

export const Color = buildVariation(
    `
<SBadge color="primary"> Primary </SBadge>
<SBadge color="gray"> Gray </SBadge>
<SBadge color="red"> Red </SBadge>
<SBadge color="blue"> Blue </SBadge>
<SBadge color="green"> Green </SBadge>
<SBadge color="yellow"> Yellow </SBadge>
<SBadge color="indigo"> Indigo </SBadge>
<SBadge color="white"> White </SBadge>
<SBadge color="purlpe"> Purple </SBadge>
<SBadge color="neutral"> Neutral </SBadge>
`,
);

export const Outline = buildVariation(
    `
<SBadge outline color="primary"> Primary </SBadge>
<SBadge outline color="gray"> Gray </SBadge>
<SBadge outline color="red"> Red </SBadge>
<SBadge outline color="blue"> Blue </SBadge>
<SBadge outline color="green"> Green </SBadge>
<SBadge outline color="yellow"> Yellow </SBadge>
<SBadge outline color="indigo"> Indigo </SBadge>
<SBadge outline color="white"> White </SBadge>
<SBadge outline color="purlpe"> Purple </SBadge>
<SBadge outline color="neutral"> Neutral </SBadge>
`,
);

export const Pill = buildVariation(
    `
<SBadge pill color="primary"> Primary </SBadge>
<SBadge pill color="gray"> Gray </SBadge>
<SBadge pill color="red"> Red </SBadge>
<SBadge pill color="blue"> Blue </SBadge>
<SBadge pill color="green"> Green </SBadge>
<SBadge class="rounded-full" color="yellow"> Yellow </SBadge>
<SBadge class="rounded-full" color="indigo"> Indigo </SBadge>
<SBadge class="rounded-full" color="white"> White </SBadge>
<SBadge class="rounded-full" color="purlpe"> Purple </SBadge>
<SBadge class="rounded-full" color="neutral"> Neutral </SBadge>
`,
);

export const Dot = buildVariation(
    `
<SBadge dot color="primary"> Primary </SBadge>
<SBadge dot color="gray"> Gray </SBadge>
<SBadge dot color="red"> Red </SBadge>
<SBadge dot color="blue"> Blue </SBadge>
<SBadge dot color="green"> Green </SBadge>
<SBadge dot color="yellow"> Yellow </SBadge>
<SBadge dot color="indigo"> Indigo </SBadge>
<SBadge dot color="white"> White </SBadge>
<SBadge dot color="purlpe"> Purple </SBadge>
<SBadge dot color="neutral"> Neutral </SBadge>
`,
);

export const Removable = buildVariation(
    `
<SBadge removable color="primary"> Primary </SBadge>
<SBadge removable color="gray"> Gray </SBadge>
<SBadge removable color="red"> Red </SBadge>
<SBadge removable color="blue"> Blue </SBadge>
<SBadge removable color="green"> Green </SBadge>
<SBadge removable color="yellow"> Yellow </SBadge>
<SBadge removable color="indigo"> Indigo </SBadge>
<SBadge removable color="white"> White </SBadge>
<SBadge removable color="purlpe"> Purple </SBadge>
<SBadge removable color="neutral"> Neutral </SBadge>
`,
);

export const Tag = buildVariation(
    `
<SBadge color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge color="gray">
    <template #tag> Aa </template>
    Gray
</SBadge>
<SBadge color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge color="green">
    <template #tag> Aa </template>
    Green
</SBadge>
<SBadge color="yellow">
    <template #tag> Aa </template>
    Yellow
</SBadge>
<SBadge color="indigo">
    <template #tag> Aa </template>
    Indigo
</SBadge>
<SBadge color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge color="purlpe">
    <template #tag> Aa </template>
    Purple
</SBadge>
<SBadge color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>
`,
);

export const RoundedTag = buildVariation(
    `
<SBadge pill color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge pill color="gray">
    <template #tag> Aa </template>
    Gray
</SBadge>
<SBadge pill color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge pill color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge pill color="green">
    <template #tag> Aa </template>
    Green
</SBadge>
<SBadge pill color="yellow">
    <template #tag> Aa </template>
    Yellow
</SBadge>
<SBadge pill color="indigo">
    <template #tag> Aa </template>
    Indigo
</SBadge>
<SBadge pill color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge pill color="purlpe">
    <template #tag> Aa </template>
    Purple
</SBadge>
<SBadge pill color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>
`,
);

export const TagReverse = buildVariation(
    `
<SBadge reverse color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge reverse color="gray">
    <template #tag> Aa </template>
    Gray
</SBadge>
<SBadge reverse color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge reverse color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge reverse color="green">
    <template #tag> Aa </template>
    Green
</SBadge>
<SBadge reverse color="yellow">
    <template #tag> Aa </template>
    Yellow
</SBadge>
<SBadge reverse color="indigo">
    <template #tag> Aa </template>
    Indigo
</SBadge>
<SBadge reverse color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge reverse color="purlpe">
    <template #tag> Aa </template>
    Purple
</SBadge>
<SBadge reverse color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>
`,
);

export const Customize = buildVariation(
    `
<div class="grid grid-cols-5 gap-5">
<SBadge dot removable color="primary"> Primary </SBadge>
<SBadge dot removable color="red"> Red </SBadge>
<SBadge dot removable color="blue"> Blue </SBadge>
<SBadge dot removable color="white"> White </SBadge>
<SBadge dot removable color="neutral"> Neutral </SBadge>

<SBadge dot removable outline color="primary"> Primary </SBadge>
<SBadge dot removable outline color="red"> Red </SBadge>
<SBadge dot removable outline color="blue"> Blue </SBadge>
<SBadge dot removable outline color="white"> White </SBadge>
<SBadge dot removable outline color="neutral"> Neutral </SBadge>

<SBadge dot removable outline pill color="primary"> Primary </SBadge>
<SBadge dot removable outline pill color="red"> Red </SBadge>
<SBadge dot removable outline pill color="blue"> Blue </SBadge>
<SBadge dot removable outline pill color="white"> White </SBadge>
<SBadge dot removable outline pill color="neutral"> Neutral </SBadge>

<SBadge dot color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge dot color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge dot color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge dot color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge dot color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge removable color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge removable color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge removable color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge removable color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge removable color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge dot removable outline color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge dot removable outline color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge dot removable outline color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge dot removable outline color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge dot removable outline color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge dot removable outline reverse color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge dot removable outline reverse color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge dot removable outline reverse color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge dot removable outline reverse color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge dot removable outline reverse color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge pill dot color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge pill dot color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge pill dot color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge pill dot color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge pill dot color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge pill size="sm" color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge pill size="sm" color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge pill size="sm" color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge pill size="sm" color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge pill size="sm" color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge pill size="lg" color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge pill size="lg" color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge pill size="lg" color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge pill size="lg" color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge pill size="lg" color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>

<SBadge pill outline size="lg" color="primary">
    <template #tag> Aa </template>
    Primary
</SBadge>
<SBadge pill outline size="lg" color="red">
    <template #tag> Aa </template>
    Red
</SBadge>
<SBadge pill outline size="lg" color="blue">
    <template #tag> Aa </template>
    Blue
</SBadge>
<SBadge pill outline size="lg" color="white">
    <template #tag> Aa </template>
    White
</SBadge>
<SBadge pt:tag="bg-blue-700" pill outline size="lg" color="neutral">
    <template #tag> Aa </template>
    Neutral
</SBadge>
</div>
`,
);
