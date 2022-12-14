<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import SBadge from '../SBadge.vue';
import SFilterUpdateItemForm from './SFilterUpdateItemForm.vue';

defineProps({
    filter: {
        type: Object,
    },
})
</script>

<template>
    <Popover class="relative">
        <SBadge :as="PopoverButton" color="white" size="sm" class="flex gap-1 px-3 py-1 border border-gray-200">
            {{ `${filter.label} | `}}
            <span class="text-gray-600">{{ filter.value }}</span>
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
                    class="absolute left-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-3xl"
                >
                        <SFilterUpdateItemForm :filter="filter" @close="close" />
                </PopoverPanel>
            </div>
        </transition>
    </Popover>
</template>
