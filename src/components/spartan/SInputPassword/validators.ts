export const min = (model: string, value: number) => model.length >= value;
export const max = (model: string, value: number) => model.length <= value;
export const lowercase = (model: string) => /[a-z]/.test(model);
export const uppercase = (model: string) => /[A-Z]/.test(model);
export const digit = (model: string) => /\d/.test(model);
export const special = (model: string) => /[!@#$%^&*~|,.;:?'"`(){}<>_\-+=/\\[\]]/.test(model);
