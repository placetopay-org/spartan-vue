<script setup lang="ts">
import FieldBadge from './FieldBadge.vue';
import FieldSelector from './popovers/FieldSelector.vue';
import FilterSelector from './popovers/FilterSelector.vue';
import { SButton, SPopover } from '@spartan';
import { PlusIcon } from '@heroicons/vue/20/solid';
import { ref } from 'vue';
import { translator } from '@/helpers';
import type { TField, SFilterEmits, SFilterProps } from './types';
import { createContext } from './api';

const emit = defineEmits<SFilterEmits>();
const props = defineProps<Partial<SFilterProps>>();

const { t } = translator('filter');

const context = createContext(props, emit);

const activeField = ref<TField>();
const addFilterPop = ref<InstanceType<typeof SPopover> | undefined>();

const openFieldSelector = () => context.togglePopover(addFilterPop.value);
const closeFilterSelector = () => {
    addFilterPop.value?.close();
    activeField.value = undefined;
};

defineExpose({
    apply: () => context.apply(),
    clear: () => context.clear(),
});
</script>

<template>
    <div class="flex w-full justify-between gap-8 pr-1">
        <div class="flex flex-wrap gap-3 pl-1">
            <FieldBadge v-if="fields" v-for="field in fields" :key="field.id" :field="field" />

            <SPopover v-if="fields?.length" ref="addFilterPop" :prevent-close="Boolean(activeField)" :offset="8">
                <template #reference>
                    <button
                        class="group flex items-center gap-2 whitespace-nowrap rounded-full border border-dashed border-gray-400 px-3 py-0.5 text-sm text-gray-400 hover:border-gray-500 hover:text-gray-600 focus:s-ring"
                        @click="openFieldSelector"
                    >
                        <PlusIcon class="h-4 w-4" />
                        <span>{{ t('addFilterBtn') }}</span>
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
                        v-if="!activeField"
                        :fields="fields ? fields.filter((field) => !field.state) : []"
                        @select="(field) => (activeField = field)"
                    />
                    <FilterSelector v-else :field="activeField" @close="closeFilterSelector" />
                </Transition>
            </SPopover>
        </div>

        <div class="flex gap-3" v-if="!hideApplyButton && !hideClearButton">
            <SButton v-if="!hideApplyButton" rounded="full" class="whitespace-nowrap !py-0.5" @click="context.apply">
                {{ t('applyBtn') }}
            </SButton>
            <SButton v-if="!hideClearButton" variant="secondary" rounded="full" class="whitespace-nowrap !py-0.5" @click="context.clear">
                {{ t('clearBtn') }}
            </SButton>
        </div>
    </div>
</template>
