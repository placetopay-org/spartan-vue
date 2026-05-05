<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'STable',
});
</script>

<template>
    <STable>
        <STableHead>
            <STableHeadCell>Name</STableHeadCell>
            <STableHeadCell>Q1</STableHeadCell>
            <STableHeadCell>Q2</STableHeadCell>
            <STableHeadCell>Q3</STableHeadCell>
        </STableHead>

        <STableBody>
            <STableRow>
                <STableCell highlight>Alice Johnson</STableCell>
                <STableCell>$1,200</STableCell>
                <STableCell>$1,800</STableCell>
                <STableCell>$2,400</STableCell>
            </STableRow>
            <STableRow>
                <STableCell highlight>Bob Smith</STableCell>
                <STableCell :colspan="3" class="text-center text-gray-400 italic">No data available</STableCell>
            </STableRow>
            <STableRow>
                <STableCell highlight>Carol Davis</STableCell>
                <STableCell>$900</STableCell>
                <STableCell>$1,100</STableCell>
                <STableCell>$1,500</STableCell>
            </STableRow>
        </STableBody>
    </STable>
</template>
