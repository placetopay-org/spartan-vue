import { reactive, inject, provide, type InjectionKey, computed, ref } from 'vue';
import type { TDTableProps, TDTableEmits, TDColumnProps } from './types';

type TUpdateColData = TDColumnProps & { slots?: any };
type TColData = TUpdateColData & { pos: number };

type TState = {
    config: { expander: boolean };
    cols: Record<string | symbol, TColData>;
    colsArray: Array<TColData & { field: string | symbol }>;
    updateCol: (data: TUpdateColData) => void;
};

const contextKey = Symbol('STableContext') as InjectionKey<TState>;

export const createContext = (props: TDTableProps, emit?: TDTableEmits) => {
    let totalCols = ref(0);

    const state: TState = reactive({
        config: { expander: false, totalCols },
        cols: {},
        colsArray: [],
        updateCol: ({ field, expander, ...rest }: TUpdateColData) => {
            if (field && !state.cols[field]) {
                totalCols.value++;
                state.cols[field] = { ...rest, pos: totalCols.value };
                state.colsArray.push({ ...state.cols[field], field });
            }
            
            if (expander && !state.config.expander) {
                state.config.expander = true;
                totalCols.value++;
                const expanderField = Symbol();
                state.cols[expanderField] = { ...rest, pos: totalCols.value, expander };
                state.colsArray.push({ ...state.cols[expanderField], field: expanderField });
            }
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
