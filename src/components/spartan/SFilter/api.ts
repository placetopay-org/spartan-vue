import { reactive, type InjectionKey, computed } from 'vue';
import { SPopover } from '..';
import type { SFilterProps, SFilterEmits, TField, TInterfaceId, TOperatorData, TSaveData } from './types';
import { buildLabel, getOperatorId, getOptions } from './helpers';
import { buildContext } from '@/helpers';

type TState = {
    fields?: TField[];
    activeFields?: TField[];
    saved?: TSaveData[];
    activeField?: TField;
    responsive: boolean;
    switchPopover: (popover?: InstanceType<typeof SPopover>) => void;
    saveFilter: (name: string, filters: Omit<TField, 'interfaces'>[]) => void;
    loadFilter: (filters: TSaveData['filters']) => void;
    selectField: (id: string) => void;
    getOperatorLabel: (field: TField) => string | undefined;
    operatorData: TOperatorData;
};

const contextKey = Symbol('SFilterContext') as InjectionKey<TState>;

export const { createContext, useContext } = buildContext<TState, SFilterProps, SFilterEmits>({
    name: 'SFilter',
    state: (props, emit) => {
        let currentPopover: InstanceType<typeof SPopover> | undefined;

        const state: TState = reactive({
            fields: props.fields,
            activeFields: computed(() => state.fields?.filter((field) => field.state)),
            saved: computed(() => props.saved),
            activeField: undefined,
            responsive: !!props.responsive,
            switchPopover: (popover?: InstanceType<typeof SPopover>) => {
                currentPopover?.close();
                currentPopover = popover;
                currentPopover?.open();
            },
            selectField: (id: string) => {
                state.activeField = state.fields?.find((field) => field.id === id);
            },
            saveFilter: (name: string, filters: Omit<TField, 'interfaces'>[]) => {
                emit('save', [...(props.saved || []), { name, filters }]);
            },
            loadFilter: (filters: TSaveData['filters']) => {
                filters.forEach((newField) => {
                    state.fields?.forEach((field) => {
                        if (newField.id === field.id) field.state = newField.state!;
                    });
                });
                emit('load', filters);
            },
            getOperatorLabel: (field: TField) => {
                const fieldState = field.state;
                if (!fieldState) return;

                const operator = fieldState.operator;
                let value = fieldState.value;

                return buildLabel(operator, value);
            },
            operatorData: computed(() => {
                const data: TOperatorData = {};

                props.fields?.forEach((field) => {
                    data[field.id] = {
                        operators: [],
                        interfaces: {},
                    };

                    if (!field.interfaces) return;

                    Object.keys(field.interfaces).forEach((value) => {
                        const key = value as TInterfaceId;
                        const interfaceData = field.interfaces[key];
                        if (interfaceData) {
                            if (interfaceData.operators) {
                                interfaceData.operators.forEach((operator) => {
                                    data[field.id].operators.push(operator);

                                    data[field.id].interfaces[getOperatorId(operator)] = key;
                                });
                            }
                        }
                    });
                });

                return data;
            }),
        });

        return state;
    },
});
