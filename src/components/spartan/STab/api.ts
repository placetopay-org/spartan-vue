import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { TTabProps, TTabEmits, TTab, Variants } from './types';

type TState = {
    tabs: Record<TTab['path'], TTab['setActive']>,
    variant: Variants;
    full: boolean;
    registerTab: (tab: TTab) => void;
    updateTab: (path?: string) => void;
};

const contextKey = Symbol('STabContext') as InjectionKey<TState>;

export const createContext = (props: Partial<TTabProps>, emit: TTabEmits) => {
    const state: TState = reactive({
        tabs: {},
        full: computed(() => props.full || false),
        variant: computed(() => props.variant || 'underline'),
        registerTab: (tab: TTab) => {
            state.tabs[tab.path] = tab.setActive;
            if (props.modelValue === tab.path) tab.setActive(true);
        },
        updateTab: (path?: string) => emit('update:modelValue', path)
    });

    watch(() => props.modelValue, (curr, old) => {
        if (old) state.tabs[old]?.(false);
        if (curr) state.tabs[curr]?.(true);
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <STab /> component`);
        throw err;
    }
    return context;
};
