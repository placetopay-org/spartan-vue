<script setup lang="ts">
import { usePreview } from '~/composables/usePreview';

usePreview({
    component: 'SDefinitionTerm',
});
</script>

<template>
    <SDefinitionTerm>
        <template #default>Email address</template>
        <template #description>
            <a href="mailto:hello@placetopay.com" class="text-spartan-primary-600 underline">
                hello@placetopay.com
            </a>
        </template>
    </SDefinitionTerm>
</template>
