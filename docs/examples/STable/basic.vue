<script setup lang="ts">
import { usePreview } from '~/composables/usePreview'

usePreview({
    mode: 'playground',
    component: 'STable',
    props: {
        borderless: { type: 'boolean', default: false, label: 'borderless' },
    },
})
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
            <STableRow>
                <STableCell highlight>Carol Davis</STableCell>
                <STableCell>carol@example.com</STableCell>
                <STableCell>Viewer</STableCell>
            </STableRow>
        </STableBody>
    </STable>
</template>
