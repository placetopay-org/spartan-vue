import type { SourceProps } from '@storybook/blocks';
import type { StoryObj } from '@storybook/vue3';
import { computed } from 'vue';

export const buildDesign = (url: string) => ({
  type: 'figma',
  url,
});

type TBindings = {
  check?: string[];
  prop?: Record<string, string | boolean | undefined>;
  emit?: string[];
  custom?: Record<'icon', boolean>;
};

const getBinding = (binding: string, map?: string) =>
  map ? `${map}Prop${binding.charAt(0).toUpperCase() + binding.slice(1)}` : binding;

export const buildSourceBinding = (bindings: TBindings, map?: string) => (args: any) => {
  let result = '';

  if (bindings.prop) {
    Object.keys(bindings.prop).forEach((prop) => {
      if (args[prop] && args[prop] !== bindings.prop![prop]) result += `${prop}="${args[prop]}" `;
    });
  }

  if (bindings.custom?.icon) {
    if (args[getBinding('icon', map)]) result += `:icon="${args[getBinding('icon', map)]}" `;
  }

  if (bindings.check) {
    bindings.check.forEach((binding) => {
      if (args[getBinding(binding, map)]) result += `${binding} `;
    });
  }

  if (bindings.emit) {
    bindings.emit.forEach((emit) => {
      if (args[emit]) result += `@${emit}="${args[emit].replace(/ /g, '')}" `;
    });
  }

  return result.trim();
};

export const createDefault = ({
  components,
  setup,
  args,
  transform,
  template,
  containerClass,
}: {
  template: string;
  setup?: () => any;
  args: Record<string, any>;
  transform?: (args: any) => string;
  components?: Record<string, any>;
  containerClass?: string;
}): StoryObj => ({
  decorators: [() => ({ template: `<div style="${containerClass}"><story/></div>` })],
  render: (args: any) => ({
    components,
    setup:
      setup ||
      (() => {
        const argsWithoutSlots = computed(() => {
          const { default: def, ...rest } = args;
          return rest;
        });
        return { args, argsWithoutSlots };
      }),
    template,
  }),
  parameters: {
    docs: {
      canvas: { layout: 'centered' },
      source: {
        transform: transform && ((_, storyContext) => transform(storyContext.args)) as SourceProps['transform'],
        type: 'dynamic',
        language: 'html',
      },
    },
  },
  args,
});

export const createVariation = ({
  components,
  setup,
  template,
  design,
  focusVisible,
  containerClass,
}: {
  template: string;
  setup?: () => any;
  components?: Record<string, any>;
  design?: any;
  focusVisible?: boolean;
  containerClass?: string;
}) => ({
  decorators: [() => ({ template: `<div class="${containerClass ?? 'flex gap-5'}"><story/></div>` })],
  render: () => ({
    components,
    setup,
    template,
  }),
  parameters: {
    design,
    pseudo: { focusVisible },
    controls: { disable: true },
    actions: { disable: true },
    docs: {
      source: {
        code: template,
        language: 'html',
      },
    },
  },
});
