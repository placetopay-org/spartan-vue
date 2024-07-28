import { reactive, inject, provide, type InjectionKey, computed } from 'vue';
import { SPopover } from '..';
import type { NFilterProps, NFilterEmits, TField, TInterfaceId } from './types';

type ContextState = {
    fields?: TField[];
    activeField?: TField;
    switchPopover: (popover?: InstanceType<typeof SPopover>) => void;
    selectField: (id: string) => void;
    getOperators: (field: TField) => string[];
};

const contextKey = Symbol('SFilterContext') as InjectionKey<ContextState>;

export const createContext = (props: Partial<NFilterProps>, emit: NFilterEmits) => {
    let currentPopover: InstanceType<typeof SPopover> | undefined;

    const state: ContextState = reactive({
         fields: props.fields,
         activeField: undefined,
         switchPopover: (popover?: InstanceType<typeof SPopover>) => {
            currentPopover?.close();
            currentPopover = popover;
            currentPopover?.open();
         },
         selectField: (id: string) => {
            state.activeField = state.fields?.find((field) => field.id === id);
         },
         getOperators: (field: TField) => {
            const opertators = [];
            const interfaces = Object.keys(field.interfaces) as TInterfaceId[];
            interfaces.forEach((interfaceId) => {
                const baseOperators = field.interfaces[interfaceId].operators;
                const customOperators = field.interfaces[interfaceId].customOperators;

                if (baseOperators) opertators.push(...baseOperators.map((operator) => {label: null, operator}));
                
            });
         }
    });

    provide(contextKey, state);
    return state;
};

export const useContext = (component: string) => {
    const context = inject(contextKey, null);
    if (context === null) {
        const err = new Error(`<${component} /> is missing parent <SFilter /> component`);
        throw err;
    }
    return context;
};