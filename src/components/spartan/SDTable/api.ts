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
        config: { slim: computed(() => !!props.slim), expander: false, totalCols },
        cols: {},
        colsArray: computed(() =>
            Reflect.ownKeys(state.cols)
                .map((field) => ({ ...state.cols[field]!, field }))
                .sort((a, b) => a.pos - b.pos),
        ),
        updateCol: ({ field, expander, ...rest }: TUpdateColData) => {
            if (!field) return;

            const nextPosition = () =>
                Math.max(0, ...Reflect.ownKeys(state.cols).map((key) => state.cols[key]!.pos)) + 1;

            if (typeof field !== 'symbol') {
                const existing = state.cols[field];
                if (!existing) totalCols.value++;
                state.cols[field] = {
                    ...existing,
                    ...rest,
                    ...(expander ? { expander } : {}),
                    pos: existing?.pos ?? nextPosition(),
                };
            } else if (expander) {
                const existing = state.cols[field];
                if (existing) {
                    state.cols[field] = { ...existing, ...rest, pos: existing.pos, expander };
                    return;
                }
                if (state.config.expander) return;
                state.config.expander = true;
                totalCols.value++;
                state.cols[field] = { ...rest, pos: nextPosition(), expander };
            }
        },
        removeCol: (field: string | symbol) => {
            const existing = state.cols[field];
            if (!existing) return;
            delete state.cols[field];
            if (existing.expander) state.config.expander = false;
            totalCols.value--;
        },
    });

    watch(
        () => props.data,
        (newData) => (state.rows = newData.map((row) => ({ data: row, isExpanded: false }))),
        { immediate: true },
    );

    watch(
        () => state.rows.map((row) => row.isExpanded),
        (newExpandedState, previousExpandedState) => {
            newExpandedState.forEach((isExpanded, index) => {
                const expandedRow = state.rows[index];

                if (isExpanded && !previousExpandedState[index] && expandedRow) {
                    state.emit('toggleExpanders', expandedRow.data);
                }
            });
        },
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
