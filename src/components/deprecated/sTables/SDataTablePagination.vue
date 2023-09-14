<template>
    <STablePagination :current-page="currentPage" :last-page="totalPages" @changeCurrentPage="change">
        <p>
            {{
                t('spartan.sDataTablePagination.verbose', {
                    from: recordFrom,
                    to: recordTo,
                    count: totalRecords,
                })
            }}
        </p>
    </STablePagination>
</template>

<script>
import STablePagination from './STablePagination.vue';
import { useI18n } from 'vue-i18n';

const messages = {
    en: {
        spartan: {
            sDataTablePagination: {
                verbose: 'Showing {from} to {to} of {count} records',
            },
        },
    },
    es: {
        spartan: {
            sDataTablePagination: {
                verbose: 'Mostrando {from} a {to} de {count} registros',
            },
        },
    },
    it: {
        spartan: {
            sDataTablePagination: {
                verbose: 'Visualizzazione da {from} a {to} di 20 {count} record',
            },
        },
    },
    pt: {
        spartan: {
            sDataTablePagination: {
                verbose: 'Mostrando {from} a {to} de {count} registros',
            },
        },
    },
    fr: {
        spartan: {
            sDataTablePagination: {
                verbose: 'Affichage de {from} à {to} sur 20 {count}',
            },
        },
    },
};

export default {
    name: 'SDataTablePagination',
    components: {
        STablePagination,
    },
    props: {
        initialPage: {
            type: Number,
            default: 1,
        },
        perPage: {
            type: Number,
            required: true,
        },
        totalRecords: {
            type: Number,
            required: true,
        },
        totalPartialRecords: {
            type: Number,
            required: true,
        },
    },
    emits: ['change'],
    data() {
        const { t } = useI18n({
            useScope: 'local',
            messages: messages,
        });

        return {
            t: t,
            currentPage: this.initialPage,
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalRecords / this.perPage);
        },
        recordFrom() {
            return this.totalPartialRecords > 0 ? this.recordTo - this.totalPartialRecords + 1 : 0;
        },
        recordTo() {
            return this.currentPage === this.totalPages
                ? this.totalRecords
                : this.currentPage * this.totalPartialRecords;
        },
    },
    methods: {
        change(page) {
            this.currentPage = page;
            this.$emit('change', page);
        },
    },
};
</script>
