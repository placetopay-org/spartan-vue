import { inject, provide } from 'vue';
import type { TStateDefinition, TContextKey } from './types';

const contextKey = Symbol('SComboboxContext') as TContextKey;

export const createSComboboxContext = (state: TStateDefinition) => {
    // TODO: readonly state?
    provide(contextKey, state);
    return state;
};

export const useSComboboxContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SCombobox /> component`);
        throw err;
    }
    return context;
};
