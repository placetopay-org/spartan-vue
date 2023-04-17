<template>
<STableLayout>

    <div class="float-left m-2">
        <label>Records per page</label>
        <select v-model="perPage" @change="fetch">
            <option v-for="recordsPerPage in configuration.pagination.menu" >
                {{ recordsPerPage }}
            </option>
        </select>
    </div>

    <div v-if="configuration.search.enable" class="float-right m-2">
        <SInput :placeholder="configuration.search.placeholder" v-model="querySearch" @input="simpleSearch" />
    </div>

    <STable>
        <STableHead>
            <STableHeadItem
                v-for="column of columns"
                :key="column"
            >
                <div class="flex items-center">
                    {{ column.label }}
                    <a v-if="column.sortable" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z"/>
                        </svg>
                    </a>
                </div>
            </STableHeadItem>
        </STableHead>

        <STableBody>
            <STableRow v-for="record in records">
                <STableRowItem v-for="column in columns">
                    <slot
                        :name="`item(${column.name})`"
                        :value="itemValue(record, column.name)"
                        :record="record"
                    >
                        {{ itemValue(record, column.name) }}
                    </slot>
                </STableRowItem>
            </STableRow>
        </STableBody>
    </STable>

    <STablePagination
        :current-page="currentPage"
        :last-page="totalPages"
        @changeCurrentPage="changePage"
    >
        <p>Showing {{ recordFrom }} to {{ recordTo}} of {{ count }} records </p>
    </STablePagination>

</STableLayout>

</template>
<script>

import axios from "axios";
import STable from "./STable.vue";
import STableHead from "./STableHead.vue";
import STableHeadItem from "./STableHeadItem.vue";
import STableBody from "./STableBody.vue";
import STableRow from "./STableRow.vue";
import STableRowItem from "./STableRowItem.vue";
import STableLayout from "./STableLayout.vue";
import STablePagination from "./STablePagination.vue";
import SInput from "./SInput.vue";

export default {
    name: "SServerTable",
    components: {
        STableLayout,
        STable,
        STableHead,
        STableHeadItem,
        STableBody,
        STableRow,
        STableRowItem,
        STablePagination,
        SInput
    },
    props: {
        columns: {
            type: Array,
            required: true,
        },
        url: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: false,
            default: () => {
                return 'get';
            }
        },
        config: {
            type: Object,
            required: false,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            configuration: this.normalizeConfiguration(),
            records: [],
            recordFrom: 0,
            recordTo: 0,
            count: 0,
            currentPage: 1,
            perPage: 10,
            totalPages: 1,
            querySearch: this.config.search.value ?? '',
            searchDelay: null
        };
    },
    methods: {
        normalizeConfiguration() {
            return {
                search: {
                    ...{
                        enable: true,
                        placeholder: 'Search',
                        delay: 400,
                    },
                    ...this.config.search ?? {},
                },
                ordering: this.config.ordering ?? {},
                pagination: {
                    ...{
                        perPage: 10,
                        menu: [10 , 20, 50, 100],
                    },
                    ...this.config.pagination ?? {},
                },
            };
        },
        fetch() {
            axios.request({
                method: this.method,
                url: this.url,
                params: {
                    query: this.querySearch,
                    limit: this.perPage,
                    page: this.currentPage,
                    sortBy: null,
                    sortDir: null,
                }
            }).then((response) => {
                this.records = response.data.data;
                this.count = response.data.total;
                this.updatePagination();
            });
        },
        itemValue(record, columnName) {
            return record.hasOwnProperty(columnName) ? record[columnName] : '';
        },
        updatePagination() {
            this.totalPages = Math.ceil(this.count / this.perPage);
            const recordsCount = this.records.length;
            this.recordTo = this.currentPage === this.totalPages ? this.count : this.currentPage * recordsCount;
            this.recordFrom = recordsCount > 0 ? this.recordTo - recordsCount + 1 : 0;
        },
        changePage(page) {
            this.currentPage = page;
            this.fetch();
        },
        simpleSearch() {
            clearTimeout(this.searchDelay);

            this.searchDelay = setTimeout(() => {
                this.fetch();
            }, this.configuration.search.delay);
        }
    },
    mounted() {
        this.fetch();
    }
}
</script>

<style scoped>

</style>