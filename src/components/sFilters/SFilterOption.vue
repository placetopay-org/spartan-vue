<script setup>
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { FunnelIcon } from '@heroicons/vue/24/outline';
import { ChevronDownIcon, InboxArrowDownIcon } from '@heroicons/vue/20/solid';
import { useSFilterContext } from './SFilterContext';
import { computed } from 'vue';
import SFilterOptionForm from './SFilterOptionForm.vue';

const api = useSFilterContext();
const savedFilters = computed(() => api.savedFilters);
</script>

<template>
    <Popover as="div" class="relative">
        <Menu as="div" class="relative inline-block text-left">
            <MenuButton class="flex divide-x divide-gray-200 rounded-lg border border-gray-300 shadow">
                <div class="px-3 py-2 text-sm font-medium text-gray-900">
                    <FunnelIcon class="w-5 h-5 text-gray-400" />
                </div>
                <div class="px-2 py-2 flex items-center">
                    <ChevronDownIcon class="w-5 h-5 text-gray-900" />
                </div>
            </MenuButton>

            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
            >
                <div>
                    <MenuItems
                        class="absolute overflow-hidden right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                        <div class="bg-gray-50 font-semibold text-sm py-3 px-4">
                            Mis filtros guardados
                        </div>

                        <ul>
                            <MenuItem v-for="savedFilter in savedFilters" :key="savedFilter.id">
                                <template #default="{ selected }">
                                    <li
                                        class="block cursor-pointer p-3 text-sm font-medium hover:bg-primary-50 hover:text-primary-500"
                                        :class="selected ? 'bg-primary-50 text-primary-500' : 'text-gray-800'"
                                        @click="api.applySavedFilter(savedFilter)"
                                    >
                                        {{ savedFilter.name }}
                                    </li>
                                </template>
                            </MenuItem>
                        </ul>

                        <PopoverButton class="w-full text-left bg-primary-600 text-white cursor-pointer p-3 text-sm font-medium">
                            <InboxArrowDownIcon class="w-5 h-5 inline-block mr-3" />
                            Guardar filtro
                        </PopoverButton>
                    </MenuItems>
                </div>
            </transition>
        </Menu>

        <SFilterOptionForm />
    </Popover>
</template>
