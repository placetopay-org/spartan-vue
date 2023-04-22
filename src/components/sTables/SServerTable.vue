<template>
<STableLayout>
    <div class="float-left m-2">
        <label>{{ t('spartan.sServerTable.recordsPerPage') }}</label>
        <select v-model="perPage" @change="fetch">
            <option v-for="recordsPerPage in configuration.pagination.menu" >
                {{ recordsPerPage }}
            </option>
        </select>
    </div>

    <div v-if="configuration.search.enable" class="float-right m-2">
        <SInput :placeholder="t('spartan.sServerTable.search')" v-model="querySearch" @input="simpleSearch" />
    </div>

    <STable>
        <STableHead>
            <STableHeadItem
                v-for="column of columns"
                :key="column"
            >
                <div class="flex items-center">
                    {{ column.label }}
                    <div v-if="column.orderable" class="ml-3">
                        <ChevronUpIcon
                                class="h-4 w-4 cursor-pointer"
                                :class="shouldOrderByAsc(column.name) ? 'text-gray-800' : 'text-gray-300'"
                                aria-hidden="true"
                                @click="orderByAsc(column.name)"
                        />
                        <ChevronDownIcon
                                class="h-4 w-4 cursor-pointer"
                                :class="shouldOrderByDesc(column.name) ? 'text-gray-800' : 'text-gray-300'"
                                aria-hidden="true"
                                @click="orderByDesc(column.name)"
                        />
                    </div>
                </div>
            </STableHeadItem>
        </STableHead>

        <STableBody>
            <STableRow v-if="!loading" v-for="record in records">
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
            <STableRow v-else>
                <STableRowItem :colspan="columns.length">
                    <div class="w-full text-center">{{ t('spartan.sServerTable.processing') }}</div>
                </STableRowItem>
            </STableRow>
        </STableBody>
    </STable>

    <STablePagination
        v-if="!loading"
        :current-page="currentPage"
        :last-page="totalPages"
        @changeCurrentPage="changePage"
    >
        <p>{{ t('spartan.sServerTable.recordsVerbose', { from: recordFrom, to: recordTo, count: count}) }}</p>
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
import SInput from "../sInputs/SInput.vue";
import {eventBus} from "../../utils/eventBus";
import {ChevronUpIcon, ChevronDownIcon} from "@heroicons/vue/24/outline";
import {useI18n} from "vue-i18n";

const OrderAsc = 'asc';
const OrderDesc = 'desc';

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
        SInput,
        ChevronUpIcon,
        ChevronDownIcon
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
        const { t } = useI18n({
            useScope: 'local',
            messages: {
                en: {
                    spartan: {
                        sServerTable: {
                            recordsPerPage: 'Records per page',
                            recordsVerbose: 'Showing {from} to {to} of {count} records',
                            search: 'Search',
                            processing: 'Processing...'
                        }
                    }
                },
                es: {
                    spartan: {
                        sServerTable: {
                            recordsPerPage: 'Registros por página',
                            recordsVerbose: 'Mostrando {from} a {to} de {count} registros',
                            search: 'Buscar',
                            processing: 'Procesando...'
                        }
                    }
                },
                it: {
                    spartan: {
                        sServerTable: {
                            recordsPerPage: 'Record per pagina',
                            recordsVerbose: 'Visualizzazione da {from} a {to} di 20 {count} record',
                            search: 'Ricerca',
                            processing: 'in lavorazione...'
                        }
                    }
                },
                pt: {
                    spartan: {
                        sServerTable: {
                            recordsPerPage: 'Registros por página',
                            recordsVerbose: 'Mostrando {from} a {to} de {count} registros',
                            search: 'Procurar',
                            processing: 'Em processamento...'
                        }
                    }
                },
                fr: {
                    spartan: {
                        sServerTable: {
                            recordsPerPage: 'Enregistrements par page',
                            recordsVerbose: 'Affichage de {from} à {to} sur 20 {count}',
                            search: 'Recherche',
                            processing: 'Traitement...'
                        }
                    }
                },
            }
        });

        return {
            configuration: this.normalizeConfiguration(),
            records: [],
            recordFrom: 0,
            recordTo: 0,
            count: 0,
            currentPage: 1,
            perPage: 10,
            totalPages: 1,
            querySearch: null,
            searchDelay: null,
            filters: {},
            orderBy: null,
            orderDir: null,
            orderMap: {},
            loading: false,
            t: t,
        };
    },
    methods: {
        initialize() {
            this.querySearch = this.configuration.search.value;
            this.orderBy = this.configuration.ordering.by;
            this.orderDir = this.configuration.ordering.dir;
            this.columns.forEach((column) => {
                if (column.orderable) {
                    this.orderMap[column.name] = column.name === this.orderBy ? this.orderDir : null;
                }
            });
        },
        normalizeConfiguration() {
            return {
                search: {
                    ...{
                        enable: true,
                        delay: 400,
                        value: '',
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
            this.startLoading();

            axios.request({
                method: this.method,
                url: this.url,
                params: this.makeRequestParams()
            }).then((response) => {
                this.records = response.data.data;
                this.count = response.data.total;
                this.updatePagination();
            }).finally(this.stopLoading);
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
        },
        makeRequestParams() {
            let params = {
                limit: this.perPage,
                page: this.currentPage,
                order: {
                    by: this.orderBy,
                    dir: this.orderDir,
                }
            };

            if (this.querySearch.trim() !== '') {
                params.query = this.querySearch;
            }

            return {
                ...params,
                ...this.filters
            };
        },
        sendFilters(filters) {
            this.filters = filters;
            this.fetch();
        },
        shouldOrderByAsc(column) {
            return this.orderMap[column] === OrderAsc;
        },
        shouldOrderByDesc(column) {
            return this.orderMap[column] === OrderDesc;
        },
        orderByAsc(column) {
            this.changeOrder(column, OrderAsc);
        },
        orderByDesc(column) {
            this.changeOrder(column, OrderDesc);
        },
        changeOrder(column, dir) {
            if (this.orderBy !== null) {
                this.orderMap[this.orderBy] = null;
            }
            this.orderBy = column;
            this.orderDir = dir;
            this.orderMap[this.orderBy] = this.orderDir;
            this.fetch();
        },
        startLoading() {
            this.loading = true;
        },
        stopLoading() {
            this.loading = false;
        }
    },
    created() {
        eventBus.on('sserver-table-filter', this.sendFilters);
    },
    mounted() {
        this.initialize();
        this.fetch();
    }
}
</script>
