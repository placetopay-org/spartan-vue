<script setup lang="ts">
import { SButton } from '../SButton';
import AddFilterButton from './elements/AddFilterButton.vue';
import FieldBadge from './elements/FieldBadge.vue';
import SavedButton from './elements/SavedButton.vue';
import type { SFilterProps, SFilterEmits, TField } from './types';
import { createContext } from './api';
import { computed, onMounted } from 'vue';
import { translator } from '@/helpers';

const emit = defineEmits<SFilterEmits>();
const props = withDefaults(defineProps<SFilterProps>(), {
    responsive: true,
});

const { t } = translator('filter');

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
        if (filter.permanent) return;
        delete filter.state;
    });
};

onMounted(() => {
    if (props.immediateApply) apply();
});

defineExpose({
    apply,
    clear,
});
</script>

<template>
    <div class="flex gap-3 justify-between">
        <div class="flex w-full flex-wrap gap-3">
            <FieldBadge v-for="field in activeFields" :key="field.id" :field="field" />
            <AddFilterButton />
        </div>

        <div class="flex gap-3" v-if="!hideApplyButton && !hideClearButton">
            <SavedButton v-if="saved" />
            <SButton v-if="!hideApplyButton" class="whitespace-nowrap h-[26px]" size="sm" rounded="full" @click="apply">
                {{ t('applyBtn') }}
            </SButton>
            <SButton v-if="!hideClearButton" class="whitespace-nowrap h-[26px]" size="sm" rounded="full" variant="secondary" @click="clear">
                {{ t('clearBtn') }}
            </SButton>
        </div>
    </div>
</template>
