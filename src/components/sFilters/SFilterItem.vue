<script setup>
import { computed } from 'vue';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { SBadge } from '../SBadge';
import SFilterUpdateItemForm from './SFilterUpdateItemForm.vue';
import { InputByType } from './SFilterSelectorConstant';

const props = defineProps({
    filter: {
        type: Object,
    },
})

const value = computed(() => {
    const configByInputType = InputByType[props.filter.type];
    if (configByInputType){
        const configInputTypeByOperator = configByInputType[props.filter.operator];
        if (configInputTypeByOperator && 'getValue' in configInputTypeByOperator) return configInputTypeByOperator.getValue(props.filter.value);

        const defaultConfig = configByInputType.default;
        if (defaultConfig && 'getValue' in defaultConfig) return defaultConfig.getValue(props.filter.value);
    }

    return props.filter.value;
});
</script>

<template>
    <Popover class="relative">
        <SBadge :as="PopoverButton" color="white" size="sm" class="flex gap-1 px-3 py-1 border border-gray-200">
            {{ `${filter.label} | `}}
            <span class="text-gray-600">{{ value }}</span>
        </SBadge>

        <transition
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
            <div>
                <PopoverPanel
                    v-slot="{ close }"
                    class="absolute left-0 z-10 w-screen max-w-sm px-4 mt-3 transform sm:px-0 lg:max-w-3xl"
                >
                        <SFilterUpdateItemForm :filter="filter" @close="close" />
                </PopoverPanel>
            </div>
        </transition>
    </Popover>
</template>
