import SBadge from './SBadge.vue';
import {
    createDefault,
    createVariation as buildVariation,
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

const createVariation = (template: string) =>
    buildVariation({
        components: { SBadge },
        containerClass: 'flex gap-5',
        template,
    });

export const Size = createVariation(
    `
<SBadge color="blue" size="sm"> Small </SBadge>
<SBadge color="blue" size="md"> Medium </SBadge>
<SBadge color="blue" size="lg"> Large </SBadge>
`,
);

export const Color = createVariation(
    `
<SBadge color="primary"> Primary </SBadge>
<SBadge color="gray"> Gray </SBadge>
<SBadge color="red"> Red </SBadge>
<SBadge color="blue"> Blue </SBadge>
<SBadge color="green"> Green </SBadge>
<SBadge color="yellow"> Yellow </SBadge>
<SBadge color="indigo"> Indigo </SBadge>
<SBadge color="white"> White </SBadge>
`,
);

export const Border = createVariation(
    `
<SBadge color="primary" border> Primary </SBadge>
<SBadge color="gray" border> Gray </SBadge>
<SBadge color="red" border> Red </SBadge>
<SBadge color="blue" border> Blue </SBadge>
<SBadge color="green" border> Green </SBadge>
<SBadge color="yellow" border> Yellow </SBadge>
<SBadge color="indigo" border> Indigo </SBadge>
<SBadge color="white" border> White </SBadge>
`,
);

export const Outline = createVariation(
    `
<SBadge color="primary" outline> Primary </SBadge>
<SBadge color="gray" outline> Gray </SBadge>
<SBadge color="red" outline> Red </SBadge>
<SBadge color="blue" outline> Blue </SBadge>
<SBadge color="green" outline> Green </SBadge>
<SBadge color="yellow" outline> Yellow </SBadge>
<SBadge color="indigo" outline> Indigo </SBadge>
<SBadge color="white" outline> White </SBadge>
`,
);

export const Pill = createVariation(
    `
<SBadge color="primary" pill> Primary </SBadge>
<SBadge color="gray" pill> Gray </SBadge>
<SBadge color="red" pill> Red </SBadge>
<SBadge color="blue" pill> Blue </SBadge>
<SBadge color="green" pill> Green </SBadge>
<SBadge color="yellow" pill> Yellow </SBadge>
<SBadge color="indigo" pill> Indigo </SBadge>
<SBadge color="white" pill> White </SBadge>
`,
);

export const Dot = createVariation(
    `
<SBadge color="primary" dot> Primary </SBadge>
<SBadge color="gray" dot> Gray </SBadge>
<SBadge color="red" dot> Red </SBadge>
<SBadge color="blue" dot> Blue </SBadge>
<SBadge color="green" dot> Green </SBadge>
<SBadge color="yellow" dot> Yellow </SBadge>
<SBadge color="indigo" dot> Indigo </SBadge>
`,
);

export const Removable = createVariation(
    `
<SBadge color="primary" removable> Primary </SBadge>
<SBadge color="gray" removable> Gray </SBadge>
<SBadge color="red" removable> Red </SBadge>
<SBadge color="blue" removable> Blue </SBadge>
<SBadge color="green" removable> Green </SBadge>
<SBadge color="yellow" removable> Yellow </SBadge>
<SBadge color="indigo" removable> Indigo </SBadge>
`,
);

export const Customize = createVariation(
    `
<SBadge color="primary" dot removable> Primary </SBadge>
<SBadge color="gray" outline dot pill> Gray </SBadge>
<SBadge color="red" dot size="sm"> Red </SBadge>
<SBadge color="blue" outline dot> Blue </SBadge>
<SBadge color="green" outline dot size="lg"> Green </SBadge>
<SBadge color="yellow" size="lg" removable> Yellow </SBadge>
<SBadge color="indigo" outline dot removable> Indigo </SBadge>
`,
);
