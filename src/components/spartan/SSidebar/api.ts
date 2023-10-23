import { reactive, inject, provide, watch } from 'vue';
import type { InjectionKey } from 'vue';
import type { TSidebarProps, TSidebarEmits, TStateDefinition } from './types';

const contextKey = Symbol('SSidebarContext') as InjectionKey<TStateDefinition>;

export const createContext = (props: TSidebarProps, emit: TSidebarEmits) => {
    const state = reactive<TStateDefinition>({
        paths: {},
        groups: {},
        path: props.modelValue,
        updatePath: (path?: string) => {
            emit('update:modelValue', path);
        },
        registerPath: (path: string, setActive: (value: boolean) => void, group?: string) => {
            const handler = (active: boolean) => {
                if (group) state.groups[group][active ? 'activate' : 'deactivate']();
                setActive(active);
            };

            const pathData = {
                group,
                activate: () => handler(true),
                deactivate: () => handler(false),
            };

            state.paths[path] = pathData;

            if (state.path === path) pathData.activate();
        },
        registerGroup: (path: string, setActive: (value: boolean) => void) => {
            state.groups[path] = {
                activate: () => setActive(true),
                deactivate: () => setActive(false),
            };
        },
    });

    watch(
        () => props.modelValue,
        (curr, old) => {
            state.path = curr;
            if (old) state.paths[old]?.deactivate();
            if (curr) state.paths[curr]?.activate();
        },
    );

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
