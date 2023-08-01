export const buildDesign = (url: string) => ({
  type: 'figma',
  url,
});

type TBindings = {
  check: string[];
  prop: Record<string, string>;
}

export const buildSourceBinding = (bindings: TBindings) => (args: any) => {
  let result = '';

  bindings.check.forEach((binding) => {
    if (args[binding]) result += `${binding}`;
  });

  Object.keys(bindings.prop).forEach((prop) => {
    if (args[prop] && args[prop] !== bindings.prop[prop]) result += `${prop}="${args[prop]}"`;
  });

  return result;
}