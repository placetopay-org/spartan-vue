<script setup lang="ts">
import FieldFilter from './FieldFilter.vue';
import FieldSelector from './popovers/FieldSelector.vue';
import FilterSelector from './popovers/FilterSelector.vue';
import { SInput } from '../SInput';
import { SButton } from '../SButton';
import { FunnelIcon, InformationCircleIcon } from '@heroicons/vue/24/outline';
import { PlusIcon, InboxArrowDownIcon } from '@heroicons/vue/20/solid';
import { reactive, ref, computed, watchEffect } from 'vue';
import { SPopover } from '../SPopover';
import { closeActivePopover, customFilterManager } from './helpers';
import { useStep } from '../../hooks';
import type { TField } from './types';

defineEmits<{
  (event: 'apply', fields: TField[]): void;
}>();

const props = defineProps<{
  customFilters: boolean;
  fields: TField[];
}>();

const fields = ref(props.fields);

const filterName = ref<string>();
const addFilterPop = ref<InstanceType<typeof SPopover> | null>(null);
const customFilterPop = ref<InstanceType<typeof SPopover> | null>(null);
const preventClose = ref(false);
const activeField = ref<TField>();
const customFilterComputed = ref<{ name: string; data: TField[] }[]>([]);
const enableCustomFilter = computed(() => fields.value.some((filter) => filter.filter));

watchEffect(() => {
  if (props.customFilters) {
    customFilterComputed.value = customFilterManager.get();
  }
})

const { step: addFilterPopState, is: isAddFilterPopState, next: nextAddFilterPopState } = useStep();
const { step: customFilterPopState, is: isCustomFilterPopState, next: nextCustomFilterPopState } = useStep();

const switchPopover = (open?: () => void, close?: () => void) => {
  closeActivePopover.value?.();
  open?.();
  closeActivePopover.value = close;
};

const openCustomFilters = () => switchPopover(customFilterPop.value?.open, resetCustomFilter);

const createCustomFilter = () => {
  nextCustomFilterPopState();
  preventClose.value = true;
  customFilterPop.value?.focus();
};

const saveCustomFilter = () => {
  customFilterManager.add(
    filterName.value!,
    fields.value.filter((filter) => filter.filter)
  );
  customFilterComputed.value = customFilterManager.get();
  resetCustomFilter();
};

const selectCustomFilter = (savedFields: TField[]) => {
  fields.value = JSON.parse(JSON.stringify(savedFields)) as TField[];
  resetCustomFilter();
};

const openFieldSelector = () => switchPopover(addFilterPop.value?.open, resetAddFilter);

const selectField = (filter: TField) => {
  activeField.value = filter;
  nextAddFilterPopState();
  preventClose.value = true;
};

const updateFilter = ({ field, filter }: { field: TField; filter: TField['filter'] }) => {
  field.filter = filter;
  closeActivePopover.value?.();
};

const removeFilter = (field: TField) => {
  field.filter = undefined;
};

const resetAddFilter = () => {
  activeField.value = undefined;
  addFilterPopState.value = 0;
  preventClose.value = false;
  addFilterPop.value?.close();
};

const resetCustomFilter = () => {
  customFilterPopState.value = 0;
  preventClose.value = false;
  customFilterPop.value?.close();
};

const clean = () => fields.value.forEach((filter) => !filter.required && (filter.filter = undefined));
</script>

<template>
  <div class="flex w-full justify-between gap-8 pr-1">
    <div class="pl-1 flex flex-wrap gap-3">
      <FieldFilter
        v-for="filter in fields"
        :key="filter.name"
        :field="filter"
        :filterIdx="fields.indexOf(filter)"
        @update="updateFilter"
        @remove="removeFilter"
      />

      <SPopover ref="addFilterPop" :preventClose="preventClose" :offset="8">
        <template #reference>
          <button
            @click="openFieldSelector"
            class="group py-0.5 px-3 text-sm gap-2 flex items-center whitespace-nowrap border border-dashed border-gray-400 hover:border-gray-500 rounded-full text-gray-400 hover:text-gray-600 s-focus-primary"
          >
            <PlusIcon class="w-4 h-4" />
            <span>Agregar filtro</span>
          </button>
        </template>

        <Transition
          mode="out-in"
          enter-active-class="duration-150 ease-out"
          leave-active-class="duration-150 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <FieldSelector
            v-if="isAddFilterPopState(0)"
            :fields="fields.filter((data) => !data.filter)"
            @select="selectField"
          />
          <FilterSelector
            v-else-if="isAddFilterPopState(1) && activeField"
            :field="activeField"
            @add="updateFilter"
            @cancel="resetAddFilter"
          />
        </Transition>
      </SPopover>
    </div>

    <div class="flex gap-3">
      <SPopover ref="customFilterPop" v-if="customFilters" :preventClose="preventClose">
        <template #reference>
          <SButton variant="outline" rounded="full" class="!py-0.5" :icon="FunnelIcon" @click="openCustomFilters" />
        </template>

        <Transition
          mode="out-in"
          enter-active-class="duration-150 ease-out"
          leave-active-class="duration-150 ease-in"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div
            v-if="isCustomFilterPopState(0)"
            class="bg-white shadow-2xl rounded-lg border-gray-100 border overflow-hidden min-w-[220px]"
          >
            <ul class="w-full">
              <li class="px-4 py-3 text-sm font-semibold text-gray-900 bg-gray-50 whitespace-nowrap">
                Mis filtros guardados
              </li>
              <li class="hover:text-primary-600 hover:bg-gray-50 rounded-lg" v-for="item in customFilterComputed">
                <button @click="selectCustomFilter(item.data)" class="w-full text-left px-4 py-2">{{ item.name }}</button>
              </li>
              <li v-if="!customFilterComputed.length" class="px-4 py-2 text-gray-400 text-sm font-medium flex gap-3">
                <div><InformationCircleIcon class="w-5 h-5" /></div>
                <span>No se encontraron filtros gruadados</span>
              </li>
              <li>
                <button
                  @click="createCustomFilter"
                  :disabled="!enableCustomFilter"
                  :class="[
                    !enableCustomFilter && 'opacity-50',
                    'px-4 py-3 text-sm font-semibold text-gray-50 bg-primary-600 flex gap-3 whitespace-nowrap w-full hover:bg-primary-700',
                  ]"
                >
                  <InboxArrowDownIcon class="w-5 h-5" />
                  <span>Guardar filtro</span>
                </button>
              </li>
            </ul>
          </div>
          <div
            v-else-if="isCustomFilterPopState(1)"
            class="bg-white shadow-2xl rounded-lg border-gray-100 border overflow-hidden p-4 w-80"
          >
            <SInput v-model="filterName" id="filterName" label="Nombre del filtro" />
            <div class="flex gap-3 mt-4">
              <SButton class="w-full" variant="secondary" @click="resetCustomFilter">Cancelar</SButton>
              <SButton
                :class="['w-full', !filterName?.trim() && 'opacity-50 pointer-events-none']"
                @click="saveCustomFilter"
                :disabled="!filterName?.trim()"
              >
                Guardar
              </SButton>
            </div>
          </div>
        </Transition>
      </SPopover>
      <SButton
        rounded="full"
        class="whitespace-nowrap !py-0.5"
        @click="
          $emit(
            'apply',
            fields.filter((filter) => filter.filter)
          )
        "
      >
        Aplicar filtros
      </SButton>
      <SButton @click="clean" variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5"
        >Borrar filtros</SButton
      >
    </div>
  </div>
</template>
./helpers
