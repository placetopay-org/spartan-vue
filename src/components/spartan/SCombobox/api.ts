import { ref, inject, provide, computed } from 'vue';
import type { Ref, InjectionKey } from 'vue';
import type { TComboboxProps, TStateDefinition, TOption, TComboboxOptionProps, TComboboxEmits } from './types';
import { cleanSearch } from '@/helpers';

const contextKey = Symbol('SComboboxContext') as InjectionKey<Ref<TStateDefinition>>;

export const createContext = ({ props, emit }: { props: Partial<TComboboxProps>; emit: TComboboxEmits }) => {
    const state: Ref<TStateDefinition> = ref({
        query: '',
        options: [] as TOption[],
        selectionId: computed(() => state.value.querySelectionId(props.modelValue)),
        autoSearch: computed(() => props.search === 'auto'),
        getSelection: () =>
            state.value.selectionId || state.value.selectionId === 0
                ? state.value.options[state.value.selectionId]
                : null,
        isSelected: (optionId: TOption['id']) => state.value.selectionId === optionId,
        isFiltered: (optionContent: TOption['content']) => {
            return cleanSearch(optionContent).includes(cleanSearch(state.value.query));
        },
        registerOption: (props: Partial<TComboboxOptionProps>) => {
            const optionId = state.value.options.length;
            state.value.options.push({
                id: optionId,
                show: true,
                value: props.value,
                content: '',
                disabled: Boolean(props.disabled),
            });

            return state.value.options[optionId];
        },
        emptyResults: () => {
            if (state.value.query !== '' && state.value.autoSearch) {
                return !state.value.options.some((option) => state.value.isFiltered(option.content));
            }
            return false;
        },
        querySelectionId: (value: TOption['value']) => {
            const option = state.value.options.find((option) => option.value === value);
            if (option) return option.id;
            return null;
        },
        updateQuery: (query: string) => {
            state.value.query = query;
            emit('query', query);
        },
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SCombobox /> component`);
        throw err;
    }
    return context;
};
