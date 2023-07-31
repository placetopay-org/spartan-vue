<script setup>
import { computed } from "vue";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { useSFilterContext } from './SFilterContext';
import { SBadge } from "../SBadge";
import SFilterAddItemForm from "./SFilterAddItemForm.vue";
import SFilterAddItemSelector from "./SFilterAddItemSelector.vue";

const api = useSFilterContext();
const addItemText = computed(() => api.addItemText);
</script>

<template>
    <Popover class="relative">
        <SBadge :as="PopoverButton" size="sm" color="transparent" class="flex gap-1 pl-2 pr-3 py-1 border border-dashed border-gray-200">
            <PlusIcon class="w-3 h-3 text-gray-400" />
            <span>{{ addItemText }}</span>
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
                    <SFilterAddItemSelector v-if="!api.addItemByTypeId.value"/>
                    <SFilterAddItemForm v-else @added="close"/>
                </PopoverPanel>
            </div>
        </transition>
    </Popover>
</template>