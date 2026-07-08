<script setup lang="ts">
import { SBadge, SPopover } from '../..';
import SelectFilterDialog from './SelectFilterDialog.vue';
import type { SFilterEntry, SFilterField } from '../types';
import { useContext } from '../context';
import { buildLabel } from '../helpers';
import { computed, onScopeDispose, ref } from 'vue';

const props = defineProps<{
    id: string;
    field: SFilterField;
    entry: SFilterEntry;
}>();

const context = useContext('FieldBadge');
const popover = ref<InstanceType<typeof SPopover>>();
const handleId = Symbol('FieldBadge');

context.popoverManager.register({
    id: handleId,
    close: () => popover.value?.close(),
});

onScopeDispose(() => context.popoverManager.unregister(handleId));

const label = computed(() => buildLabel(props.entry.operator, props.entry.value, props.field));

const openEditor = () => {
    if (popover.value?.isOpen) {
        popover.value.close();
        return;
    }
    context.popoverManager.open(handleId);
    context.selectField(props.id);
    popover.value?.open();
};

const remove = () => {
    // popover.close() is idempotent — call it unconditionally so we never
    // leave a stale-open popover for a filter that no longer exists.
    popover.value?.close();
    context.removeFilter(props.id);
};
</script>

<template>
    <SPopover
        ref="popover"
        :responsive="context.responsive"
        :offset="8"
        prevent-close
        @close="context.popoverManager.notifyClosed(handleId)"
    >
        <template #reference>
            <!--
                role=button on a <span> instead of a real <button> so we can host
                SBadge's own remove <button> inside without nesting two buttons.
            -->
            <span
                role="button"
                tabindex="0"
                class="focus-visible:s-outline inline-flex rounded-full outline-2 outline-offset-2 outline-transparent"
                @click="openEditor"
                @keydown.enter.prevent="openEditor"
                @keydown.space.prevent="openEditor"
            >
                <SBadge
                    color="white"
                    class="whitespace-nowrap"
                    pt:content="flex"
                    pill
                    outline
                    :removable="!field.permanent ? 'stopPropagation' : false"
                    @removed="remove"
                >
                    <div class="max-w-[144px] font-bold">{{ `${field.label} |&nbsp;` }}</div>
                    <div class="max-w-[220px] truncate">
                        {{ label }}
                    </div>
                </SBadge>
            </span>
        </template>

        <template #default="{ close }">
            <SelectFilterDialog @close="close" />
        </template>
    </SPopover>
</template>
