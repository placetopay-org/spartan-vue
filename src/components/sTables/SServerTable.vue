<template>
    <SDataTable
        :records="records"
        :columns="columns"
        :options="options"
        :total-records="totalRecords"
        :loading="loading"
        @load="loadRecords"
        @update:order-by="loadRecords"
        @update:page="loadRecords"
        @update:per-page="loadRecords"
        @update:search="searchWithDelay"
    >
        <template v-for="(_, name) in $slots" v-slot:[name]="slotData">
            <slot :name="name" v-bind="slotData" />
        </template>
    </SDataTable>
</template>

<script>
import SDataTable from "./SDataTable.vue";
import SSelect from "../sSelects/SSelect.vue";

export default {
    name: "SServerTable",
    components: {SSelect, SDataTable},
    props: {
        columns: {
            type: Array,
            required: true,
        },
        fetch: {
            type: Function,
            required: true,
        },
        options: {
            type: Object
        }
    },
    data() {
        return {
            records: [],
            totalRecords: 0,
            searchDelay: null,
            loading: false,
        };
    },
    methods: {
        loadRecords(event) {
            this.loading = true;
            this.fetch(event)
                .then((data) => {
                    this.records = data.records;
                    this.totalRecords = data.totalRecords;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        searchWithDelay(event) {
            clearTimeout(this.searchDelay);
            this.searchDelay = setTimeout(() => {
                this.loadRecords(event);
            }, this.options.search?.delay ?? 400);
        }
    }
}
</script>
