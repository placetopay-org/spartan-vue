import SPopover from './SPopover.vue';
import { SButton } from '../SButton';
import type { SourceProps } from '@storybook/blocks';
import { action } from '@storybook/addon-actions';
import { buildDesign, buildSourceBinding } from '../../helpers';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { watch, nextTick } from 'vue';

export default {
  component: SPopover,
  title: 'new/Popover',
  parameters: {
    docs: {
      description: {
        component: 'DOC',
      },
    },
  },
  argTypes: {
    // Test
    testScroll: {
      description: 'DOC',
      table: { type: { summary: 'boolean' } },
    },

    // Slots
    default: {
      control: { type: null },
      description: 'DOC',
      table: { type: { summary: 'VNode | VNode Array' } },
    },

    // Props
    offset: {
      control: 'number',
      description: 'DOC',
      table: { type: { summary: 'VNode | VNode Array' } },
    },
    placement: {
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
      description: `DOC`,
      table: { type: { summary: 'button | submit' } },
    },
    static: {
      description: 'DOC',
      table: { type: { summary: 'boolean' } },
    },
  },
};

const design = buildDesign('');

const sourceBinding = buildSourceBinding({
  prop: { placement: 'bottom-start', offset: '0' },
  check: ['static'],
});

export const Default = {
  decorators: [
    () => ({ template: '<div class="h-[500px] w-[500px] flex justify-center items-center"><story/></div>' }),
  ],
  render: (args: any) => ({
    components: { SPopover, SButton, ChevronDownIcon },
    setup() {
      watch(
        () => args.testScroll,
        () => {
          if (args.testScroll) nextTick(() => document.getElementById('popoverDecorator')?.scrollTo(280, 280));
        }
      );
      return { args, ChevronDownIcon, onClick: action('onClick') };
    },
    template: `<div v-if="args.testScroll" id="popoverDecorator" class="h-[500px] w-[500px] relative border-red-500 border-4 overflow-scroll">
    <div class="h-96"/>
    <div class="flex w-max">
      <div class="w-96 h-px"/>
      <SPopover :placement="args.placement" :offset="args.offset" :static="args.static">
        <template #reference="{ display }">
          <button class="bg-blue-300 w-40 h-12 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center" @click="display">Any Element!</button>
        </template>

        <div class="bg-yellow-300 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element Too!</div>
      </SPopover>
      <div class="w-96 h-px"/>
    </div>
    <div class="h-96"/>
    </div>

  <SPopover v-else :placement="args.placement" :offset="args.offset" :static="args.static">
    <template #reference="{ display }">
      <button class="bg-blue-300 w-40 h-12 border-dashed border-4 border-blue-600 font-bold text-blue-800 flex justify-center items-center" @click="display">Any Element!</button>
    </template>

    <div class="bg-yellow-300 w-80 h-36 border-dashed border-4 border-yellow-600 font-bold text-yellow-800 flex justify-center items-center">Any Element Too!</div>
  </SPopover>
    `,
  }),
  parameters: {
    design,
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: ((_, storyContext) => `
<SPopover ${sourceBinding(storyContext.args)}>
  <template #reference="{ display }">
    <button class="blue-element" @click="display">Any Element!</button>
  </template>

  <div class="yellow-element">Any Element Too!</div>
</SPopover>`) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args: {
    testScroll: false,
    offset: 0,
    placement: 'bottom-start',
    static: false,
  },
};

// const createVariation = (template: string) => ({
//   decorators: [() => ({ template: '<div style="padding-bottom: 200px;"><story/></div>' })],
//   render: () => ({
//     components: {
//       SPopover,
//       SButton,
//       SAvatar,
//       ChevronDownIcon,
//       PuzzlePieceIcon,
//       ArrowLeftOnRectangleIcon,
//       UserCircleIcon,
//       PlusIcon,
//       Cog8ToothIcon,
//     },
//     setup() {
//       return {
//         ChevronDownIcon,
//         PuzzlePieceIcon,
//         ArrowLeftOnRectangleIcon,
//         UserCircleIcon,
//         PlusIcon,
//         PencilIcon,
//         Cog8ToothIcon,
//       };
//     },
//     template,
//   }),
//   parameters: {
//     design,
//     controls: { disable: true },
//     actions: { disable: true },
//     docs: {
//       source: {
//         code: template,
//         language: 'html',
//       },
//     },
//   },
// });

// export const LeftToRight = createVariation(`
// <SPopover leftToRight>
//   <SButton variant="secondary" :icon="ChevronDownIcon" endIcon>Options</SButton>

//   <template #items>
//     <SPopoverItem>
//       Title

//       <template #description>
//         Description
//       </template>
//     </SPopoverItem>

//     <SPopoverItem>
//       Title

//       <template #description>
//         Description
//       </template>
//     </SPopoverItem>

//     <SPopoverItem>
//       Title

//       <template #description>
//         Description
//       </template>
//     </SPopoverItem>
//   </template>
// </SPopover>
// `);
