import { reactive, inject, provide, watch, type InjectionKey, computed, type ComputedRef } from 'vue';
import type { TDTableProps, TDTableEmits } from './types';

type Col = {
    field: string;
    header?: string;
};

type TUpdateCol = (id: string, col: Partial<Col>) => void;

type TState = {
    cols: Record<string, Col>;
    colsArray: Col[];
    updateCol: TUpdateCol;
};

const contextKey = Symbol('STableContext') as InjectionKey<TState>;

export const createContext = (props: TDTableProps, emit?: TDTableEmits) => {
    // const cols = computed(() => {
    //     return Object.keys(props.data[0]).reduce((acc, key) => {
    //         acc[key] = {};
    //         return acc;
    //     }, {} as TState['cols']);
    // });

    const state: TState = reactive({
        cols: {},
        colsArray: computed(() => {
            return Object.keys(state.cols).map((key) => ({ ...state.cols[key], field: key }));
        }),
        updateCol: (id: string, col: Partial<Col>) => {
            state.cols[id] = { ...state.cols[id], ...col };
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

