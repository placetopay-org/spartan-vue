import SPopover from './SPopover.vue';
import { SButton } from '@spartan';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding, createHistory, createDefault } from '@/helpers';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { watch, nextTick } from 'vue';

export default {
    component: SPopover,
    title: 'misc/Popover',
    ...createHistory({
        description: 'Popover is used to display content referenced by any element. It can be used to display a dropdown, a tooltip, or any other content that needs to be displayed on top of the reference element.',
        slots: [
            {
                name: 'default',
                description: 'The content to be displayed when the popover is open.',
            }
        ],
        props: [
            {
                name: 'offset',
                description: 'The offset of the popover from the reference element.',
                default: '0',
                type: 'number'
            },
            {
                name: 'placement',
                description: 'The placement of the popover relative to the reference element.',
                default: 'bottom-start',
                control: 'select',
                options: [
                    'top',
                    'right',
                    'bottom',
                    'left',
                    'top-start',
                    'top-end',
                    'right-start',
                    'right-end',
                    'bottom-start',
                    'bottom-end',
                    'left-start',
                    'left-end',
                ],
                type: 'button | submit'
            },
            {
                name: 'static',
                description: 'Whether the popover should be static or not.',
                default: 'false',
                type: 'boolean'
            },
            {
                name: 'preventClose',
                description: 'Whether the popover should prevent closing when clicking outside.',
                default: 'false',
                type: 'boolean'
            },
            {
                name: 'responsive',
                description: 'Whether the popover should be responsive or not.',
                default: 'true',
                type: 'boolean'
            },
            {
                name: 'testScroll',
                description: '"Test on window with scroll."',
                type: 'TEST'
            }
        ],
    }),
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({
    prop: { placement: 'bottom-start', offset: '0' },
    check: ['static'],
});

export const Default  = createDefault({
    containerClass: 'flex justify-center items-center h-[500px] w-[500px]',
    components: { SPopover, SButton },
    setup: () => {
        return { ChevronDownIcon };
    },
    args: {
        testScroll: false,
        offset: 0,
        placement: 'bottom-start',
        static: false,
        preventClose: false,
        responsive: true,
    },
    template: `<div v-if="args.testScroll" id="popoverDecorator" class="h-[500px] w-[500px] relative border-red-500 border-4 overflow-scroll">
    <div class="h-96"/>
    <div class="flex w-max">
      <div class="w-96 h-px"/>
      <SPopover :placement="args.placement" :offset="args.offset" :static="args.static">
        <template #reference="{ open }">
          <button class="bg-blue-300 w-40 h-12 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center" @click="open">Any Element!</button>
        </template>

        <div class="bg-yellow-300 w-full md:w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element Too!</div>
      </SPopover>
      <div class="w-96 h-px"/>
    </div>
    <div class="h-96"/>
    </div>

  <SPopover v-else :placement="args.placement" :offset="args.offset" :static="args.static" :responsive="args.responsive">
    <template #reference="{ open }">
      <button class="bg-blue-300 w-40 h-12 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center" @click="open">Any Element!</button>
    </template>

    <div class="bg-yellow-300 w-full md:w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element Too!</div>
  </SPopover>
    `,
    transform: (args) => `
    <SPopover ${sourceBinding(args)}>
      <template #reference="{ display }">
        <button class="blue-element" @click="display">Any Element!</button>
      </template>
    
      <div class="yellow-element">Any Element Too!</div>
    </SPopover>`
})
