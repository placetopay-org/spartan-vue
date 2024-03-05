import { reactive, inject, provide, watch, type InjectionKey, computed, type Ref } from 'vue';
import type { TInputOTPProps, TInputOTPEmits } from './types';

type TItem = {
    setValue: (value: string) => void;
    setActive: (active: boolean) => void;
};

type TState = {
    items: TItem[],
    value: string;
    isFocused: boolean;
    isFocusedAll: boolean;
    success: boolean;
    error: boolean;
    register: (setValue: TItem['setValue'], setActive: TItem['setActive']) => void;
    updateValue: (value: string) => void;
    focusInput: () => void;
    focusoutInput: () => void;
    selectAll: () => void;
    updateSelection: (start: number, end: number) => void;
};

const contextKey = Symbol('STabContext') as InjectionKey<TState>;

export const createContext = (props: TInputOTPProps, emit: TInputOTPEmits) => {
    const state: TState = reactive({
        items: [],
        value: props.modelValue,
        success: computed(() => props.success || false),
        error: computed(() => props.error || false),
        isFocused: false,
        isFocusedAll: false,
        register: (setValue: TItem['setValue'], setActive: TItem['setActive']) => {
            state.items.push({ setValue, setActive });
        },
        updateValue: (value: string) => {
            if (state.isFocusedAll) state.items.forEach(({ setActive }) => setActive(false));
            else state.items[state.value.length]?.setActive(false);

            if (!value || /^[0-9]+$/.test(value)) {
                state.value = value;
                emit('update:modelValue', value);

                state.items.forEach(({ setValue }, index) => setValue(value.charAt(index)));
            }

            if (state.isFocused) state.items[state.value.length]?.setActive(true);
        },
        focusInput: () => {
            state.isFocused = true;
            state.items[state.value.length]?.setActive(true);
        },
        focusoutInput: () => {
            state.isFocused = false;

            if (state.isFocusedAll) {
                state.isFocusedAll = false;
                state.items.forEach(({ setActive }) => setActive(false));
            } else state.items[state.value.length]?.setActive(false);
        },
        updateSelection: (start: number, end: number) => {
            // console.log('updateSelection', start, end, state.items.slice(start, end).length);
            // state.items.slice(start, end + 1).forEach(({ setActive }) => setActive(true));
        },
        selectAll: () => {
            state.isFocusedAll = true;
            state.items.forEach(({ setActive }) => setActive(true));
        }
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SInputOTP /> component`);
        throw err;
    }
    return context;
};
