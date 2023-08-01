export const buildDesign = (url: string) => ({
  type: 'figma',
  url,
});

type TBindings = {
  check: string[];
  prop: Record<string, string | boolean>;
  emit?: string[];
}

export const buildSourceBinding = (bindings: TBindings) => (args: any) => {
  let result = '';

  Object.keys(bindings.prop).forEach((prop) => {
    if (args[prop] && args[prop] !== bindings.prop[prop]) result += `${prop}="${args[prop]}" `;
  });

  bindings.check.forEach((binding) => {
    if (args[binding]) result += `${binding} `;
  });

  if (bindings.emit) {
    bindings.emit.forEach((emit) => {
      if (args[emit]) result += `@${emit}="${args[emit].replace(/ /g, '')}" `;
    });
  }

  return result.trim();
}