<template>
    <li>
        <div class="flex items-center space-x-3">
            <ChevronRightIcon v-if="separator" class="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            <a
                :href="href"
                class="text-sm font-medium text-gray-500 hover:text-gray-800"
                :class="[active ? 'text-gray-800' : undefined]"
                :aria-current="active ? 'page' : undefined"
            >
                <component :is="icon" class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                <slot></slot>
            </a>
        </div>
    </li>
</template>

<script>
import { ChevronRightIcon } from '@heroicons/vue/24/solid';

export default {
    components: {
        ChevronRightIcon,
    },
    props: {
        separator: {
            type: Boolean,
            required: false,
            default: true,
        },
        href: {
            type: String,
            required: false,
            default: '#',
        },
        icon: {
            type: [Object, String, Function],
            default: undefined,
        },
        active: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
};
</script>
