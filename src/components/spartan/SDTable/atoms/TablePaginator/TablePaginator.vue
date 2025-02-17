<script setup lang="ts">
import { SPaginator } from '@spartan';
import { useContext } from '../../api';
import { twMerge } from 'tailwind-merge';
import { computed } from 'vue';

const { PtPaginator } = defineProps<{
    PtPaginator: any[];
}>();

const context = useContext('TablePaginator');

const [paginatorClass, paginatorProps] = PtPaginator;

const count = computed(() => {
    return (
        context.props.paginator?.count ||
        (context.props.paginator?.total &&
            context.props.paginator?.size &&
            Math.ceil(context.props.paginator.total / context.props.paginator.size))
    );
});
</script>

<template>
    <section
        data-s-paginator
        v-if="!context.props.paginator?.hideWhenSinglePage || (count && count > 1)"
        v-bind="paginatorProps"
        :class="twMerge('overflow-auto border-t border-gray-300 bg-gray-50 p-[14px]', paginatorClass)"
    >
        <SPaginator
            :class="context.props.paginator?.pageSizes ? '' : 'justify-end'"
            v-bind="context.props.paginator"
            @change="(newState) => context.emit('paginatorChange', newState)"
        />
    </section>
</template>
