import { ref, inject, provide } from 'vue';
import type { Ref, InjectionKey } from 'vue';
import type { TStateDefinition } from './types';

const contextKey = Symbol('SSidebarContext') as InjectionKey<Ref<TStateDefinition>>;

export const createContext = () => {
    const state = ref<TStateDefinition>({
        path: '',
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SSidebar /> component`);
        throw err;
    }
    return context;
};
