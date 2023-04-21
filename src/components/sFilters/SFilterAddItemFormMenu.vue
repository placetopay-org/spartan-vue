<script setup>
import { useI18n } from 'vue-i18n';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { DocumentDuplicateIcon, TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/solid';

defineEmits(['delete', 'duplicate']);

defineProps({
    duplicate: {
        type: Boolean,
        default: false,
    },
})


const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
        spartan: {
            sfilters: {
                delete: 'Delete',
                duplicate: 'Duplicate',
            }
        }
    },
    es: {
        spartan: {
            sfilters: {
                delete: 'Eliminar',
                duplicate: 'Duplicar',
            }
        }
    },
    it: {
        spartan: {
            sfilters: {
                delete: 'Eliminare',
                duplicate: 'Duplicare',
            }
        }
    },
    pt: {
        spartan: {
            sfilters: {
                delete: 'Excluir',
                duplicate: 'Duplicar',
            }
        }
    },
  },
});
</script>

<template>
    <Menu as="div" class="relative" v-slot="{ open }">
        <MenuButton>
            <component :is="open ? XMarkIcon : EllipsisHorizontalIcon" class="w-5 h-5 text-gray-500" />
        </MenuButton>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >
            <MenuItems
                class="absolute right-0 mt-2 z-10 min-w-fit w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
                <MenuItem v-slot="{ active }">
                    <button
                        :class="[
                            active ? 'bg-primary-500 text-white' : 'text-gray-900',
                            duplicate ? 'rounded-t-md' : 'rounded-md',
                            'group flex w-full items-center px-3 py-3 text-sm',
                        ]"
                        @click="$emit('delete')"
                    >
                        <TrashIcon
                            class="mr-2 h-5 w-5"
                            :class="active ? 'text-white' : 'text-gray-400'"
                            aria-hidden="true"
                        />
                        {{t('spartan.sfilters.delete')}}
                    </button>
                </MenuItem>
                <MenuItem v-if="duplicate" v-slot="{ active }">
                    <button
                        :class="[
                            active ? 'bg-primary-500 text-white' : 'text-gray-900',
                            'group flex w-full items-center px-3 py-3 text-sm rounded-b-md',
                        ]"
                        @click="$emit('duplicate')"
                    >
                        <DocumentDuplicateIcon
                            class="mr-2 h-5 w-5"
                            :class="active ? 'text-white' : 'text-gray-400'"
                            aria-hidden="true"
                        />
                        {{t('spartan.sfilters.delete')}}
                    </button>
                </MenuItem>
            </MenuItems>
        </transition>
    </Menu>
</template>
