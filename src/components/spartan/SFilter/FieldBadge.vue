<script setup lang="ts">
import FilterSelector from './popovers/FilterSelector.vue';
import { ref } from 'vue';
import { SBadge, SPopover } from '@spartan';
import type { TField } from './types';
import { useContext } from './api';

const props = defineProps<{
    field: TField;
}>();

const context = useContext('FieldBadge');
const popover = ref<InstanceType<typeof SPopover>>();
const removing = ref(false);
const toggle = () => {
    if (popover.value?.isOpen || !removing.value) context.togglePopover(popover.value);

    if (removing.value) {
        delete props.field.state;
        removing.value = false;
    }
};
</script>

<template>
    <SPopover v-if="field.state" ref="popover" :offset="12" prevent-close>
        <template #reference>
            <button @click="toggle">
                <SBadge
                    color="white"
                    class="whitespace-nowrap"
                    pill
                    border
                    :removable="!field.permanent"
                    @removed="removing = true"
                >
                    <span class="max-w-[144px] font-bold">{{ `${field.name} |&nbsp;` }}</span>
                    <span class="max-w-[220px] truncate">
                        {{ context.getOperatorLabel(field) }}
                    </span>  
                </SBadge>
            </button>
        </template>

        <FilterSelector :field="field" @close="popover?.close" />
    </SPopover>
</template>
