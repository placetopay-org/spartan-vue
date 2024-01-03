import { InputSelector, TwoInputSelector, OptionsSelector } from './selectors';

export const predefinedOperators = [
    'exist',
    'notExist',
    'equal',
    'notEqual',
    'greaterThan',
    'greaterThanOrEqual',
    'lessThan',
    'lessThanOrEqual',
    'between',
    'notBetween',
    'contains',
    'notContains',
    'startsWith',
    'endsWith',
] as const;

export const predefinedLabels: Record<(typeof predefinedOperators)[number], string> = {
    exist: 'Exist',
    notExist: 'Not Exist',
    equal: 'Equal',
    notEqual: 'Not Equal',
    greaterThan: 'Greater Than',
    greaterThanOrEqual: 'Greater Than Or Equal',
    lessThan: 'Less Than',
    lessThanOrEqual: 'Less Than Or Equal',
    between: 'Between',
    notBetween: 'Not Between',
    contains: 'Contains',
    notContains: 'Not Contains',
    startsWith: 'Starts With',
    endsWith: 'Ends With',
};

export const predefinedDescriptions: Record<(typeof predefinedOperators)[number], string> = {
    exist: 'Exist',
    notExist: 'Not Exist',
    equal: 'Equal',
    notEqual: 'Not Equal',
    greaterThan: 'Greater Than',
    greaterThanOrEqual: 'Greater Than Or Equal',
    lessThan: 'Less Than',
    lessThanOrEqual: 'Less Than Or Equal',
    between: 'Between',
    notBetween: 'Not Between',
    contains: 'Contains',
    notContains: 'Not Contains',
    startsWith: 'Starts With',
    endsWith: 'Ends With',
};

export const interfaceComponents = {
    none: null,
    oneInput: InputSelector,
    twoInputs: TwoInputSelector,
    options: OptionsSelector,
};
