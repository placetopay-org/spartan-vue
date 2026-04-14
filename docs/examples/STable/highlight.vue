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
            <STableHeadCell>Email</STableHeadCell>
            <STableHeadCell>Role</STableHeadCell>
        </STableHead>

        <STableBody>
            <STableRow>
                <STableCell highlight>Alice Johnson</STableCell>
                <STableCell>alice@example.com</STableCell>
                <STableCell>Admin</STableCell>
            </STableRow>
            <STableRow>
                <STableCell highlight>Bob Smith</STableCell>
                <STableCell>bob@example.com</STableCell>
                <STableCell>Editor</STableCell>
            </STableRow>
        </STableBody>
    </STable>
</template>
