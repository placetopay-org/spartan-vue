<template>
    <STableHeadItem>
        <div class="flex items-center">
            {{ label }}
            <div v-if="orderable" class="ml-3">
                <ChevronUpIcon
                    class="h-4 w-4 cursor-pointer"
                    aria-hidden="true"
                    :class="ordering.active && ordering.isAsc ? 'text-gray-800' : 'text-gray-300'"
                    @click="changeOrder(name, 'asc')"
                />
                <ChevronDownIcon
                    class="h-4 w-4 cursor-pointer"
                    aria-hidden="true"
                    :class="ordering.active && !ordering.isAsc ? 'text-gray-800' : 'text-gray-300'"
                    @click="changeOrder(name, 'desc')"
                />
            </div>
        </div>
    </STableHeadItem>
</template>

<script>
import STableHeadItem from './STableHeadItem.vue';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline';

export default {
    name: 'SDataTableHeadItem',
    components: {
        ChevronUpIcon,
        ChevronDownIcon,
        STableHeadItem,
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        orderable: {
            type: Boolean,
            default: false,
        },
        orderDir: {
            type: [String, null],
        },
    },
    emits: ['changeOrder'],
    computed: {
        ordering() {
            return {
                active: this.orderDir !== null,
                isAsc: this.orderDir === 'asc',
            };
        },
    },
    methods: {
        changeOrder(by, dir) {
            this.ordering.active = true;
            this.ordering.isAsc = dir === 'asc';
            this.$emit('changeOrder', {
                by: by,
                dir: dir,
            });
        },
    },
};
</script>
