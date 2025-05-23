import { reactive, inject, provide, watch, type InjectionKey, computed } from 'vue';
import type { TInputOTPProps, TInputOTPEmits } from './types';

type TItem = {
    setValue: (value: string) => void;
    setActive: (active: boolean) => void;
};

type TState = {
    items: TItem[];
    value: string;
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

const activate = (state: TState) => {
    if (state.value.length < state.items.length) state.items[state.value.length]?.setActive(true);
    else state.items[state.value.length - 1]?.setActive(true);
};

const deactivate = (state: TState) => {
    if (state.isFocusedAll) {
        state.isFocusedAll = false;
        state.items.forEach(({ setActive }) => setActive(false));
    } else if (state.value.length < state.items.length) state.items[state.value.length]?.setActive(false);
    else state.items[state.value.length - 1]?.setActive(false);
};

export const createContext = (props: TInputOTPProps, emit: TInputOTPEmits) => {
    const state: TState = reactive({
        items: [],
        value: computed(() => props.modelValue || ''),
        success: computed(() => props.success || false),
        error: computed(() => props.error || false),
        isFocusedAll: false,
        register: (setValue: TItem['setValue'], setActive: TItem['setActive']) => {
            if (state.items.length < state.value.length) setValue(state.value.charAt(state.items.length));
            state.items.push({ setValue, setActive });
        },
        updateValue: (value: string) => {
            if (value.length === state.value.length) {
                deactivate(state);
                activate(state);
                return;
            }

            deactivate(state);

            if (!value || /^[0-9]+$/.test(value)) emit('update:modelValue', value);

            activate({ ...state, value });
        },
        focusInput: () => activate(state),
        focusoutInput: () => deactivate(state),
        selectAll: () => {
            state.isFocusedAll = true;
            state.items.forEach(({ setActive }) => setActive(true));
        },
        // TODO: Implement arrow keys navigation
        updateSelection: (start: number, end: number) => {
            // console.log('updateSelection', start, end, state.items.slice(start, end).length);
            // state.items.slice(start, end + 1).forEach(({ setActive }) => setActive(true));
        },
    });

    watch(
        () => props.modelValue,
        (currentValue) => state.items.forEach(({ setValue }, index) => setValue(currentValue?.charAt(index) || '')),
    );

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
