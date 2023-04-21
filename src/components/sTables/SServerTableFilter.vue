<template>
    <component :is="as" @submit.prevent="applyFilters">
        <slot :apply="applyFilters"/>
    </component>
</template>

<script>
import {eventBus} from "../../utils/eventBus";

export default {
    name: "SServerTableFilter",
    props: {
        modelValue: {
            type: Object
        },
        as: {
            type: String,
            default: 'form'
        }
    },
    methods: {
        applyFilters() {
            eventBus.emit('sserver-table-filter', this.modelValue);
        }
    }
}
</script>
