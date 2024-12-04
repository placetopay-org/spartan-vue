import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { TDTableProps, TDTableEmits, TDColumnProps } from './types';

type TUpdateColData = TDColumnProps & { slots?: any };

type TState = {
    cols: Record<string, TUpdateColData>;
    colsArray: TUpdateColData[];
    updateCol: (data: TUpdateColData) => void;
};

const contextKey = Symbol('STableContext') as InjectionKey<TState>;

export const createContext = (props: TDTableProps, emit?: TDTableEmits) => {
    const state: TState = reactive({
        cols: {},
        colsArray: computed(() => {
            return Object.keys(state.cols).map((key) => ({ ...state.cols[key], field: key }));
        }),
        updateCol: ({ field, ...rest }: TUpdateColData) => {
            state.cols[field] = { ...state.cols[field], ...rest };
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
