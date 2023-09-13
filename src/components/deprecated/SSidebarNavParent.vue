<template>
    <DisclosureButton
        :class="[
            active ? 'text-gray-900' : 'bg-white text-gray-600 hover:text-gray-900',
            'group flex w-full items-center rounded-md py-2 pl-2 pr-1 text-left text-sm font-medium focus:outline-none focus:ring focus:ring-primary-100',
        ]"
    >
        <component
            :is="icon"
            :class="[active ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-2.5 h-6 w-6']"
            aria-hidden="true"
        />

        <span class="flex-1">
            <slot />
        </span>

        <ChevronDownIcon
            :class="[
                active ? 'text-gray-400' : 'text-gray-300 group-hover:text-gray-400',
                'ml-2 h-5 w-5 flex-shrink-0',
            ]"
            aria-hidden="true"
        />
    </DisclosureButton>
</template>

<script>
import { DisclosureButton } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/24/solid';

export default {
    components: { DisclosureButton, ChevronDownIcon },
    props: {
        icon: {
            type: [Function],
            default: undefined,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {};
    },
    computed: {},
};
</script>
