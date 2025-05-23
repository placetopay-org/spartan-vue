import { reactive, inject, provide, watch } from 'vue';
import type { InjectionKey } from 'vue';
import type { TStepsProps, TApiState } from './types';

const contextKey = Symbol('SStepsContext') as InjectionKey<TApiState>;

export const createContext = (props: Required<TStepsProps>) => {
    const state = reactive<TApiState>({
        variant: props.variant,
    });

    watch(props, (newProps) => {
        state.variant = newProps.variant;
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SSteps /> component`);
        throw err;
    }
    return context;
};
