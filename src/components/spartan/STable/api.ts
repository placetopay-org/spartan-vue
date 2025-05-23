import { reactive, inject, provide, type InjectionKey, computed } from 'vue';
import type { TTableProps } from './types';

type TState = {
    rows: number;
    cols: number;
    autoRows: string[] | undefined;
    autoCols: string[] | undefined;
    register: (type: 'row' | 'col') => void;
};

const contextKey = Symbol('STableContext') as InjectionKey<TState>;

export const createContext = (props: Partial<TTableProps>) => {
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
