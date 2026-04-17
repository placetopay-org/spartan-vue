<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SDefinitionTerm',
});
</script>

<template>
    <dl class="space-y-2">
        <SDefinitionTerm oneline labels="Customer" description="Juan Zea" />
        <SDefinitionTerm oneline labels="Order" description="#A-10294" />
        <SDefinitionTerm oneline labels="Status" description="Approved" />
    </dl>
</template>
