import { reactive, inject, provide, type InjectionKey, computed, ref, watch } from 'vue';
import type { TDTableProps, TDTableEmits, TDColumnProps } from './types';

type TDTableSlots = {
    expansion?: (context: { row: any }) => any[];
};

type TColumnSlots = {
    header?: () => any[];
    body?: (context: { row: any; value: any }) => any[];
};

type TUpdateColData = TDColumnProps & { slots?: TColumnSlots };

type TColData = TUpdateColData & { pos: number };

type TRow = {
    data: Record<string | symbol, any>;
    isExpanded: boolean;
};

type TState = {
    emit: TDTableEmits;
    props: TDTableProps;
    slots: TDTableSlots;
    config: { slim: boolean; expander: boolean; totalCols: number };
    rows: TRow[];
    cols: Record<string | symbol, TColData>;
    colsArray: Array<TColData & { field: string | symbol }>;
    updateCol: (data: TUpdateColData) => void;
    removeCol: (field: string | symbol) => void;
};

const contextKey = Symbol('STableContext') as InjectionKey<TState>;

export const createContext = (props: TDTableProps, emit: TDTableEmits, slots: any) => {
    const totalCols = ref(0);

    const state: TState = reactive({
        emit,
        props: computed(() => props),
        slots,
        rows: [],
        config: { slim: !!props.slim, expander: false, totalCols },
        cols: {},
        colsArray: computed(() => Reflect.ownKeys(state.cols).map((field) => ({ ...state.cols[field]!, field }))),
        updateCol: ({ field, expander, ...rest }: TUpdateColData) => {
            if (!field) return;

            if (typeof field !== 'symbol') {
                totalCols.value++;
                state.cols[field] = { ...rest, pos: totalCols.value };
            } else if (expander && !state.config.expander) {
                state.config.expander = true;
                totalCols.value++;
                state.cols[field] = { ...rest, pos: totalCols.value, expander };
            }
        },
        removeCol: (field: string | symbol) => {
            delete state.cols[field];
            totalCols.value--;
        },
    });

    watch(
        () => props.data,
        (newData) => (state.rows = newData.map((row) => ({ data: row, isExpanded: false }))),
        { immediate: true },
    );

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
