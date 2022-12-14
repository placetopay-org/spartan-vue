import { inject } from "vue";

export let SFilterContext = Symbol('SFilterContext');

export const useSFilterContext = (component) => {
  const context = inject(SFilterContext, null)
  if (context === null) {
    const err = new Error(`<${component} /> is missing parent <SFilter /> component`);
    if (Error.captureStackTrace) Error.captureStackTrace(err, useSFilterContext)
    throw err;
  }
  return context;
}