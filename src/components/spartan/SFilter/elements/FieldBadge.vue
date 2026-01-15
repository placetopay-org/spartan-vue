<script setup lang="ts">
import { SBadge, SPopover } from '../..';
import SelectFilterDialog from './SelectFilterDialog.vue';
import type { TField } from '../types';
import { useContext } from '../context';
import { ref } from 'vue';

const props = defineProps<{
    field: TField;
}>();

const context = useContext('FieldBadge');
const removing = ref(false);
const popover = ref<InstanceType<typeof SPopover>>();

const openFieldPopover = () => {
    if (popover.value?.isOpen) popover.value?.close();
    else {
        context.switchPopover(popover.value);
        if (!removing.value) context.selectField(props.field.id);
    }

    if (removing.value) {
        const updatedField = { ...props.field };
        delete updatedField.state;
        Object.assign(props.field, updatedField);
        removing.value = false;
    }
};
</script>

<template>
    <SPopover ref="popover" :responsive="context.responsive" :offset="8" prevent-close>
        <template #reference>
            <button @click="openFieldPopover">
                <SBadge
                    color="white"
                    class="whitespace-nowrap"
                    pt:content="flex"
                    pill
                    outline
                    :removable="!field.permanent"
                    @removed="removing = true"
                >
                    <div class="max-w-[144px] font-bold">{{ `${field.name} |&nbsp;` }}</div>
                    <div class="max-w-[220px] truncate">
                        {{ context.getOperatorLabel(field) }}
                    </div>
                </SBadge>
            </button>
        </template>

        <template #default="{ close }">
            <SelectFilterDialog @close="close" />
        </template>
    </SPopover>
</template>
