import SCopy from './SCopy.vue';
import { SDefinitionTerm } from '../SDefinitionTerm';
import { createDefault, createVariation, buildSourceBinding, createHistory } from '@/helpers';

export default {
    component: SCopy,
    title: 'Misc/Copy',
    ...createHistory({
        description:
            'The copy component is used to display a copy button with a tooltip that copies the content of the default slot to the clipboard.',
        slots: [
            {
                name: 'default',
                description: 'Default slot to be copied.',
                control: true,
            },
        ],
        events: [
            {
                name: 'copied',
                description: 'This event is emitted when the copy button is clicked.',
            },
        ],
        props: [
            {
                name: 'value',
                control: 'text',
                type: 'string',
                default: undefined,
                description: 'The value to be copied.',
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
    components: { SCopy },
    args: {
        default: 'Lorem ipsum',
    },
    containerClass: 'h-[50px] flex items-end',
    transform: (args) => `<SCopy ${sourceBinding(args)}> ${args.default} </SCopy>`,
    template: '<SCopy v-bind="args"> {{ args.default }} </SCopy>',
});

export const Base = createVariation({
    components: { SCopy },
    containerClass: 'h-[50px] flex items-end',
    template: `<SCopy> Base </SCopy>`,
});

export const CopyFromProp = createVariation({
    components: { SCopy },
    containerClass: 'h-[50px] flex items-end',
    template: `<SCopy value="Text from prop"> Lorem ipsum </SCopy>`,
});

export const CopyFromSlotScrapping = createVariation({
    components: { SCopy },
    containerClass: 'h-[50px] flex items-end',
    template: `
<SCopy> <div> <main> <span> Slot Scrapping </span> </main> </div> </SCopy>
    `,
});

export const UseWithDefinitionTerm = createVariation({
    components: { SCopy, SDefinitionTerm },
    containerClass: 'h-[50px] flex items-end',
    template: `
<SDefinitionTerm labels="Label">
    <template #description>
        <SCopy>
            <span class="bg-white border border-gray-300 rounded px-1 font-mono"> Lorem ipsum </span>
        </SCopy>
    </template>
</SDefinitionTerm>
    `,
});
