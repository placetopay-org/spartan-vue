import { reactive, computed } from 'vue';
import { SPopover } from '..';
import type { TFilterProps, TFilterEmits, TField, TOperator, TOperatorData, TSaveData } from './types';
import { buildLabel, getOperatorId } from './helpers';
import { buildContext } from '@/helpers';

type TState = {
    fields?: TField[];
    activeFields?: TField[];
    saved?: TSaveData[];
    activeField?: TField;
    responsive: boolean;
    switchPopover: (popover?: InstanceType<typeof SPopover>) => void;
    saveFilter: (name: string, filters: TField[]) => void;
    loadFilter: (filters: TSaveData['filters']) => void;
    selectField: (id: string) => void;
    getOperatorLabel: (field: TField) => string | undefined;
};

const getFieldValue = (field: TField) => {
    if (!field.state) return undefined;

    return field.state?.value;
};

const getFieldOperators = (field: TField): TOperator[] => {
    if (!field.interfaces) return [];

    return field.interfaces.none?.operators || [];
};

export const { createContext, useContext } = buildContext<TState, TFilterProps, TFilterEmits>({
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

            saveFilter: (name: string, filters: TField[]) => {
                emit('save', [...(props.saved || []), { name, filters }]);
            },

            loadFilter: (filters: TSaveData['filters']) => {
                filters.forEach((newField) => {
                    state.fields?.forEach((field) => {
                        if (newField.id === field.id) {
                            field.state = newField.state;
                        }
                    });
                });
                emit('load', filters);
            },

            getOperatorLabel: (field: TField) => {
                const fieldState = field.state;
                if (!fieldState) return;

                const operator = fieldState.operator;
                const value = getFieldValue(field);

                return buildLabel(operator, value);
            },
        });

        return state;
    },
});
