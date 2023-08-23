<script setup lang="ts">
import { computed, ref } from 'vue';
import { SButton } from '../../SButton';
import { InputSelector, TwoInputSelector, InputWithCheckboxes } from '../selectors';
import { SPopover } from '../../SPopover';
import { Oper, FieldType, type TFilter } from '../types';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits<{
  (event: 'add', value: { index: number; data: TFilter['filter'] }): void;
  (event: 'cancel'): void;
}>();

const props = defineProps<{
  filter: TFilter;
  filterIdx: number;
}>();

const conditionMap = {
  [FieldType.BOOLEAN]: {
    [Oper.EX]: null,
    [Oper.NEX]: null,
    [Oper.EQ]: null,
  },
  [FieldType.STRING]: {
    [Oper.EX]: null,
    [Oper.NEX]: null,
    [Oper.EQ]: InputSelector,
    [Oper.NEQ]: InputSelector,
    [Oper.CONTAINS]: InputSelector,
    [Oper.STARTSWITH]: InputSelector,
    [Oper.ENDSWITH]: InputSelector,
  },
  [FieldType.NUMBER]: {
    [Oper.EX]: null,
    [Oper.NEX]: null,
    [Oper.EQ]: InputSelector,
    [Oper.NEQ]: InputSelector,
    [Oper.GT]: InputSelector,
    [Oper.GTE]: InputSelector,
    [Oper.LT]: InputSelector,
    [Oper.LTE]: InputSelector,
    [Oper.BETWEEN]: TwoInputSelector,
    [Oper.NBETWEEN]: TwoInputSelector,
  },
  [FieldType.DATE]: {
    [Oper.EX]: null,
    [Oper.NEX]: null,
    [Oper.EQ]: InputSelector,
    [Oper.NEQ]: InputSelector,
    [Oper.GT]: InputSelector,
    [Oper.GTE]: InputSelector,
    [Oper.LT]: InputSelector,
    [Oper.LTE]: InputSelector,
    [Oper.BETWEEN]: TwoInputSelector,
    [Oper.NBETWEEN]: TwoInputSelector,
  },
  [FieldType.ENUM]: {
    [Oper.EX]: null,
    [Oper.NEX]: null,
    [Oper.EQ]: InputWithCheckboxes,
    [Oper.NEQ]: InputWithCheckboxes,
  },
};

const value = ref();
const operatorGroup = conditionMap[props.filter.type];
const operators = Object.keys(operatorGroup) as Oper[];
const activeOperator = ref(operators[0]);

const filterComponent = computed(() => operatorGroup[activeOperator.value as keyof typeof operatorGroup]);

const selectCondition = (selection: Oper, closeCallback: () => void) => {
  activeOperator.value = selection;
  closeCallback();
};

const add = () => {
  emit('add', {
    index: props.filterIdx,
    data: {
        operator: activeOperator.value,
        value: value.value,
      } as TFilter['filter'],
  });
};
</script>

<template>
  <div class="bg-white shadow-2xl rounded-lg flex flex-col gap-4 p-4 min-w-[370px]">
    <div class="flex items-center gap-3">
      <span>{{ filter.field }}</span>
      <SPopover :offset="8">
        <template #reference="{ toggle }">
          <button @click="toggle" class="bg-gray-100 pl-3 pr-2 py-1 rounded-lg flex items-center gap-1.5 text-gray-800">
            <span>{{ activeOperator }}</span>
            <ChevronDownIcon class="h-5 w-5 text-gray-600" />
          </button>
        </template>

        <template #default="{ close }">
          <ul class="bg-white shadow-2xl border border-gray-100 rounded-lg divide-y divide-gray-100">
            <li v-for="condition in operators">
              <button
                @click="selectCondition(condition, close)"
                class="w-full text-left p-3 hover:bg-gray-50 text-sm font-medium text-gray-800"
              >
                {{ condition }}
              </button>
            </li>
          </ul>
        </template>
      </SPopover>
    </div>

    <Transition
      mode="out-in"
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <component v-if="filterComponent" :is="filterComponent" v-model="value" :filter="props.filter" />
    </Transition>

    <div class="flex gap-3">
      <SButton class="w-full" variant="secondary" @click="$emit('cancel')">Cancelar</SButton>
      <SButton class="w-full" @click="add">Agregar</SButton>
    </div>
  </div>
</template>
