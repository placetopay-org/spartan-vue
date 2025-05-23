import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { TTableProps, TTableEmits } from './types';

type TState = {
    rows: number;
    cols: number;
    autoRows: string[] | undefined;
    autoCols: string[] | undefined;
    register: (type: 'row' | 'col') => void;
};

const contextKey = Symbol('STableContext') as InjectionKey<TState>;

export const createContext = (props: Partial<TTableProps>, emit?: TTableEmits) => {
    const state: TState = reactive({
        rows: 0,
        cols: 0,
        autoRows: computed(() => props.rows),
        autoCols: computed(() => props.cols),
        register: (type: 'row' | 'col') => {
            if (type === 'row') state.rows++;
            else state.cols++;
        },
    });

    // watch(() => props.modelValue, (curr, old) => {
    //     if (old) state.tabs[old]?.(false);
    //     if (curr) state.tabs[curr]?.(true);
    // });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <STable /> component`);
        throw err;
    }
    return context;
};
