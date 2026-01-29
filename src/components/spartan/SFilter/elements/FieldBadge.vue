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
const popover = ref<InstanceType<typeof SPopover>>();
const pendingRemove = ref(false);

const togglePopover = () => {
    // If a remove action is pending, handle it instead of toggling
    if (pendingRemove.value) {
        removeField();
        return;
    }

    if (popover.value?.isOpen) {
        popover.value.close();
    } else {
        context.switchPopover(popover.value);
        context.selectField(props.field.id);
    }
};

const handleRemoveClick = () => {
    // Mark removal as pending - will be processed in togglePopover
    // This is needed because the remove button is inside the main button
    pendingRemove.value = true;
};

const removeField = () => {
    delete props.field.state;
    pendingRemove.value = false;
};
</script>

<template>
    <SPopover ref="popover" :responsive="context.responsive" :offset="8" prevent-close>
        <template #reference>
            <button @click="togglePopover">
                <SBadge
                    color="white"
                    class="whitespace-nowrap"
                    pt:content="flex"
                    pill
                    outline
                    :removable="!field.permanent"
                    @removed="handleRemoveClick"
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
