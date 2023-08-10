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
