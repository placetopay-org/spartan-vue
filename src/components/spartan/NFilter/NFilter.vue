<script setup lang="ts">
import { SButton } from '../SButton';
import AddFilterButton from './elements/AddFilterButton.vue';
import type { NFilterProps, NFilterEmits, TField } from './types';
import { createContext } from './api';
import { computed } from 'vue';
import FieldBadge from './elements/FieldBadge.vue';

const emit = defineEmits<NFilterEmits>();
const props = defineProps<NFilterProps>();

createContext(props, emit);

const activeFields = computed(() => {
    return props.fields.filter((field) => field.state);
});

const apply = () => {
    const fields: Omit<TField, 'interfaces'>[] = [];
    props.fields?.forEach((field) => {
        if (field.state) {
            const { interfaces, ...rest } = field;
            fields.push({ ...rest });
        }
    });
    emit('apply', fields);
};

const clear = () => {
    props.fields?.forEach((filter) => {
        delete filter.state;
    });
};

defineExpose({
    apply,
    clear,
});
</script>

<template>
    <div class="flex bg-gray-300 gap-3">
        <div class="flex w-full flex-wrap gap-3 bg-red-200">
            <FieldBadge v-for="field in activeFields" :key="field.id" :field="field" />

            <AddFilterButton />
        </div>

        <div class="flex gap-3 bg-blue-200" v-if="!hideApplyButton && !hideClearButton">
            <SButton v-if="!hideApplyButton" class="btn" @click="apply">apply</SButton>
            <SButton v-if="!hideClearButton" class="btn" variant="secondary" @click="clear">clear</SButton>
        </div>
    </div>
</template>

<style>
.btn {
    @apply whitespace-nowrap rounded-full py-0.5;
}
</style>
