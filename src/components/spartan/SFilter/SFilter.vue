<script lang="ts">
/**
 * A versatile filter component for building dynamic filter interfaces.
 * @see {@link https://github.com/placetopay-org/spartan-vue/tree/main/src/components/spartan/SFilter Github}.
 */
export default {
    name: 'SFilter',
};
</script>

<script setup lang="ts">
import FieldBadge from './elements/FieldBadge.vue';
import SavedButton from './elements/SavedButton.vue';
import AddFilterButton from './elements/AddFilterButton.vue';
import { computed, onMounted } from 'vue';
import { SButton } from '../SButton';
import { createContext } from './context';
import { getDuplicateOperatorIds } from './helpers';
import { translator } from '@/helpers';
import type { SFilterEmits, SFilterProps, SFilterValue } from './types';

const emit = defineEmits<SFilterEmits>();

const { t } = translator('filter');

const props = withDefaults(defineProps<SFilterProps>(), {
    modelValue: () => ({}),
    responsive: true,
});

createContext(props, emit);

const value = computed<SFilterValue>(() => props.modelValue);

const appliedEntries = computed(() =>
    Object.entries(value.value).filter(([id]) => id in props.filters),
);

const apply = () => {
    emit('apply', { ...value.value });
};

const clear = () => {
    const next: SFilterValue = {};
    // Permanent fields keep their applied entry on clear.
    for (const [id, entry] of Object.entries(value.value)) {
        if (props.filters[id]?.permanent) next[id] = entry;
    }
    emit('update:modelValue', next);
    emit('clear', { ...next });

    if (props.applyWhenClear) {
        emit('apply', { ...next });
    }
};

onMounted(() => {
    for (const [id, field] of Object.entries(props.filters)) {
        const dupes = getDuplicateOperatorIds(field);
        if (dupes.length > 0) {
            const ids = dupes.map((d) => `'${d}'`).join(', ');
            throw new Error(`SFilter: duplicate operator id(s) ${ids} in field '${id}'`);
        }
    }

    if (props.immediateApply) apply();
});

defineExpose({
    apply,
    clear,
});
</script>

<template>
    <!-- root -->
    <div class="flex justify-between gap-3">
        <!-- field badges -->
        <div class="flex w-full flex-wrap gap-3">
            <FieldBadge
                v-for="[id, entry] in appliedEntries"
                :id="id"
                :key="id"
                :field="props.filters[id]!"
                :entry="entry"
            />

            <AddFilterButton />
        </div>

        <!-- action buttons -->
        <div v-if="!hideApplyButton || !hideClearButton || saved !== undefined" class="flex gap-3">
            <SavedButton v-if="saved !== undefined" />

            <SButton
                v-if="!hideApplyButton"
                class="h-[26px] whitespace-nowrap"
                size="sm"
                rounded="full"
                @click="apply"
            >
                {{ t('applyBtn') }}
            </SButton>

            <SButton
                v-if="!hideClearButton"
                class="h-[26px] whitespace-nowrap"
                size="sm"
                rounded="full"
                variant="secondary"
                @click="clear"
            >
                {{ t('clearBtn') }}
            </SButton>
        </div>
    </div>
</template>
