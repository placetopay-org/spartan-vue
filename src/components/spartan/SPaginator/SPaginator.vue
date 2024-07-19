<script setup lang="ts">
import type { TPaginatorProps, TPaginatorEmits } from './types';
import { translator } from '@/helpers';
import { SSelect } from '../SSelect';
import { SButtonGroup, SButtonGroupItem } from '../SButtonGroup';
import { computed } from 'vue';

const emit = defineEmits<TPaginatorEmits>();
const props = defineProps<TPaginatorProps>();

const { t } = translator('dataTable');

const quantity = computed(() => Number(props.paginatorSize) || 0);

const pages = computed(() => {
    let arr: (string | number)[] = [];

    if (props.modelValue.count <= quantity.value * 2 + 5) return props.modelValue.count;

    if (props.modelValue.page - quantity.value < 4) {
        arr = Array.apply(null, Array(quantity.value * 2 + 3)).map((_, i) => i + 1);
        arr.push('...');
        arr.push(props.modelValue.count);
    } else if (props.modelValue.count - props.modelValue.page - quantity.value < 3) {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(quantity.value * 2 + 3)).map(
                (_, i) => props.modelValue.count - quantity.value * 2 - 2 + i,
            ),
        );
    } else {
        arr.push(1);
        arr.push('...');
        arr = arr.concat(
            Array.apply(null, Array(1 + quantity.value * 2)).map((_, i) => props.modelValue.page - quantity.value + i),
        );
        arr.push('...');
        arr.push(props.modelValue.count);
    }

    return arr;
});

const prev = () => {
    if (props.modelValue.page === 1) return;
    emit('update:modelValue', { ...props.modelValue, page: props.modelValue.page - 1 });
    emit('update:page', props.modelValue.page - 1);
};

const next = () => {
    if (props.modelValue.page === props.modelValue.count) return;
    emit('update:modelValue', { ...props.modelValue, page: props.modelValue.page + 1 });
    emit('update:page', props.modelValue.page + 1);
};

const selectPage = (page: number) => {
    emit('update:modelValue', { ...props.modelValue, page });
    emit('update:page', page);

};
</script>

<template>
    <div class="flex flex-1 items-center justify-between gap-8">
        <div v-if="props.pageSizes" class="flex items-center gap-1 text-sm text-gray-700">
            <span>{{ t('showing') }}</span>

            <SSelect
                class="py-1 text-xs"
                :modelValue="props.modelValue.size"
                @update:model-value="
                    (value) => {
                        emit('update:modelValue', { ...props.modelValue, size: Number(value) });
                        emit('update:size', Number(value));
                    }
                "
            >
                <option v-for="pageSize in props.pageSizes" :key="pageSize" :value="pageSize">
                    {{ pageSize }}
                </option>
            </SSelect>

            <span>{{ t('results') }}</span>
            <span>{{ t('of') }}</span>
            <span class="font-bold">{{ props.modelValue.count }}</span>
            <span>{{ t('pages') }}</span>
        </div>
        <div>
            <SButtonGroup aria-label="pagination">
                <SButtonGroupItem first prev class="px-2" @click="prev" />

                <SButtonGroupItem
                    v-for="page in pages"
                    class="px-4"
                    :active="Number(page) === props.modelValue.page"
                    :key="page"
                    :class="String(page) === '...' ? 'pointer-events-none' : ''"
                    @click="() => Number(page) && selectPage(Number(page))"
                >
                    {{ page }}
                </SButtonGroupItem>

                <SButtonGroupItem last next class="px-2" @click="next" />
            </SButtonGroup>
        </div>
    </div>
</template>
