<template>
    <STableLayout>
        <div class="float-left m-2">
            <SSelect
                :id="'sPerPage' + Date.now()"
                :label="t('spartan.sDataTable.recordsPerPage')"
                :options="pagination.menu"
                v-model="pagination.perPage"
                @change="dispatchEvent('update:perPage')"
            />
        </div>

        <div v-if="searching.enable" class="float-right m-2">
            <SInput :placeholder="t('spartan.sDataTable.search')" v-model="searching.value" @input="dispatchEvent('update:search')" />
        </div>

        <STable>
            <STableHead>
                <SDataTableHeadItem
                    v-for="column of columns"
                    :label="column.label"
                    :name="column.name"
                    :orderable="column.orderable"
                    :order-dir="ordering.map[column.name]"
                    @changeOrder="orderBy"
                />
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
                        <div class="w-full text-center">{{ t('spartan.sDataTable.processing') }}</div>
                    </STableRowItem>
                </STableRow>
            </STableBody>
        </STable>

        <SDataTablePagination
            :initial-page="pagination.currentPage"
            :total-records="totalRecords"
            :total-partial-records="records.length"
            :per-page="pagination.perPage"
            @change="changePage"
        />
    </STableLayout>
</template>
<script>

import STableLayout from "./STableLayout.vue";
import STable from "./STable.vue";
import STableHead from "./STableHead.vue";
import SDataTableHeadItem from "./SDataTableHeadItem.vue";
import STableBody from "./STableBody.vue";
import STableHeadItem from "./STableHeadItem.vue";
import STableRow from "./STableRow.vue";
import STableRowItem from "./STableRowItem.vue";
import SDataTablePagination from "./SDataTablePagination.vue";
import { SSelect } from "../SSelect";
import { useI18n } from "vue-i18n";
import SInput from "../sInputs/SInput.vue";

const messages = {
    en: {
        spartan: {
            sDataTable: {
                recordsPerPage: 'Records per page',
                search: 'Search',
                processing: 'Processing...'
            }
        }
    },
    es: {
        spartan: {
            sDataTable: {
                recordsPerPage: 'Registros por página',
                search: 'Buscar',
                processing: 'Procesando...'
            }
        }
    },
    it: {
        spartan: {
            sDataTable: {
                recordsPerPage: 'Record per pagina',
                search: 'Ricerca',
                processing: 'in lavorazione...'
            }
        }
    },
    pt: {
        spartan: {
            sDataTable: {
                recordsPerPage: 'Registros por página',
                search: 'Procurar',
                processing: 'Em processamento...'
            }
        }
    },
    fr: {
        spartan: {
            sDataTable: {
                recordsPerPage: 'Enregistrements par page',
                search: 'Recherche',
                processing: 'Traitement...'
            }
        }
    },
};

export default {
    name: "SDataTable",
    components: {
        SInput,
        SSelect,
        SDataTablePagination,
        STableRowItem,
        STableRow,
        STableHeadItem,
        SDataTableHeadItem,
        STableLayout,
        STable,
        STableHead,
        STableBody,
    },
    props: {
        columns: {
            type: Array,
            required: true,
        },
        records: {
            type: Array,
            required: true,
        },
        totalRecords: {
            type: Number,
            required: true,
        },
        options: {
            type: Object,
        },
        loading: {
            type: Boolean,
            default: false,
        }
    },
    emits: ['load', 'update:orderBy', 'update:page', 'update:perPage', 'update:search'],
    data() {
        const { t } = useI18n({
            useScope: 'local',
            messages: messages
        });

        return {
            t: t,
            ordering: this.normalizeOrderingOptions(),
            pagination: this.normalizePaginationOptions(),
            searching: {
                enable: this.options.search?.enable === undefined ? true : this.options.search.enable,
                value: this.options.search?.value
            },
        }
    },
    methods: {
        normalizeOrderingOptions() {
            let orderMap = {};
            const ordering = this.options.ordering ?? {};
            this.columns.forEach((column) => {
                if (column.orderable) {
                    orderMap[column.name] = column.name === ordering.by ? ordering.dir : null;
                }
            });

            ordering.map = orderMap;

            return ordering;
        },
        normalizePaginationOptions() {
           let pagination  = {
               ...{
                   perPage: 10,
                   currentPage: 1,
                   menu: [10 , 20, 50, 100],
               },
               ...this.options.pagination ?? {},
           };
           pagination.menu = pagination.menu.map((recordsPerPage) => {
               return {
                   value: recordsPerPage,
                   label: recordsPerPage
               };
           });

           return pagination;
        },
        itemValue(record, columnName) {
            return record.hasOwnProperty(columnName) ? record[columnName] : '';
        },
        orderBy(ordering) {
            if (this.ordering.by !== null) {
                this.ordering.map[this.ordering.by] = null;
            }

            this.ordering.by = ordering.by;
            this.ordering.dir = ordering.dir;
            this.ordering.map[ordering.by] = ordering.dir;

            this.dispatchEvent('update:orderBy');
        },
        changePage(page) {
            this.pagination.currentPage = page;
            this.dispatchEvent('update:page');
        },
        dispatchEvent(eventName,) {
            this.$emit(eventName, {
                ordering: this.ordering,
                pagination: this.pagination,
                searchValue: this.searching.value,
            });
        }
    },
    mounted() {
        this.dispatchEvent('load');
    }
}
</script>
