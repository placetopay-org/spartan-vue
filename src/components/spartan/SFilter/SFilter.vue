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
import { onMounted } from 'vue';
import { SButton } from '../SButton';
import { createContext } from './context';
import { translator } from '@/helpers';
import type { TFilterProps, TFilterEmits, TField } from './types';

// Emits
const emit = defineEmits<TFilterEmits>();

// Props and Defaults
const props = withDefaults(defineProps<TFilterProps>(), {
    responsive: true,
});

const { t } = translator('filter');

const context = createContext(props, emit);

const apply = () => {
    const fields: TField[] = [];
    props.fields?.forEach((field) => {
        if (field.state) {
            fields.push({ ...field });
        }
    });
    emit('apply', fields);
};

const clear = () => {
    props.fields?.forEach((filter) => {
        if (filter.permanent) return;
        delete filter.state;
    });
    emit('clear', props.fields);

    if (props.applyWhenClear) {
        apply();
    }
};

onMounted(() => {
    if (props.immediateApply) apply();
});

// Expose
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
            <FieldBadge v-for="field in context.activeFields" :key="field.id" :field="field" />

            <AddFilterButton />
        </div>

        <!-- action buttons -->
        <div v-if="!hideApplyButton || !hideClearButton || saved" class="flex gap-3">
            <SavedButton v-if="saved" />

            <SButton v-if="!hideApplyButton" class="h-[26px] whitespace-nowrap" size="sm" rounded="full" @click="apply">
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
