<script setup lang="ts">
import FilterSelector from './popovers/FilterSelector.vue';
import { computed, ref } from 'vue';
import { SBadge, SPopover } from '@spartan';
import { FieldType, Oper, type TField } from './types';
import { closeActivePopover } from './helpers';

const emit = defineEmits<{
    (event: 'remove', field: TField): void;
    (event: 'update', value: { field: TField; filter: TField['filter'] }): void;
}>();

const props = defineProps<{
    field: TField;
    filterIdx: number;
}>();

const removable = computed(() => props.field.required !== true);

const value = computed(() => {
    const { filter, type, unique } = props.field;

    if (!filter) return;

    if (filter.operator === Oper.EX) return;
    if (filter.operator === Oper.NEX) return `no existe`;
    if (filter.operator === Oper.EQ) {
        if (type === FieldType.ENUM && !unique) return filter.value.join(', ');
        return filter.value;
    }
    if (filter.operator === Oper.NEQ) {
        if (type === FieldType.ENUM && !unique) return `no es ${filter.value.join(', ')}`;
        return `no es ${filter.value}`;
    }
    if (filter.operator === Oper.GT) return `mayor que ${filter.value}`;
    if (filter.operator === Oper.GTE) return `mayor o igual que ${filter.value}`;
    if (filter.operator === Oper.LT) return `menor que ${filter.value}`;
    if (filter.operator === Oper.LTE) return `menor o igual que ${filter.value}`;
    if (filter.operator === Oper.BETWEEN) return `${filter.value[0]} - ${filter.value[1]}`;
    if (filter.operator === Oper.NBETWEEN) return `no esta entre ${filter.value[0]} - ${filter.value[1]}`;
    if (filter.operator === Oper.CONTAINS) return `contiene ${filter.value}`;
    if (filter.operator === Oper.NCONTAINS) return `no contiene ${filter.value}`;
    if (filter.operator === Oper.STARTSWITH) return `empieza con ${filter.value}`;
    if (filter.operator === Oper.ENDSWITH) return `termina con ${filter.value}`;

    return '';
});

const popover = ref<InstanceType<typeof SPopover> | null>(null);

const toggle = () => {
    if (popover.value?.isOpen) {
        popover.value?.close();
        closeActivePopover.value = undefined;
    } else {
        closeActivePopover.value?.();
        popover.value?.open();
        closeActivePopover.value = popover.value?.close;
    }
};
</script>

<template>
    <SPopover v-if="field.filter" ref="popover" :offset="12" prevent-close>
        <template #reference>
            <button @click="toggle">
                <SBadge
                    color="gray"
                    class="whitespace-nowrap"
                    pill
                    :removable="removable"
                    @removed="emit('remove', field)"
                >
                    <span class="max-w-[144px] font-bold">{{ `${field.name} |&nbsp;` }}</span>
                    <span class="max-w-[144px] truncate">{{ value }}</span>
                </SBadge>
            </button>
        </template>

        <FilterSelector
            :field="field"
            :field-idx="filterIdx"
            @add="(value) => $emit('update', value)"
            @cancel="popover?.close"
        />
    </SPopover>
</template>
