import { ref, inject, provide, computed } from 'vue';
import type { Ref, InjectionKey } from 'vue';
import type { TSidebarEmits, TSidebarProps, TStateDefinition } from './types';

const contextKey = Symbol('SSidebarContext') as InjectionKey<Ref<TStateDefinition>>;

export const createContext = (props: Partial<TSidebarProps>, emit: TSidebarEmits) => {
    const state = ref<TStateDefinition>({
        path: computed(() => props.modelValue) as unknown as string | undefined,
        updatePath: (path?: string) => {
            emit('update:modelValue', path);
        },
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
