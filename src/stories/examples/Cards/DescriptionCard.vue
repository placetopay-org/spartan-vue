<script setup lang="ts">
import { SButton, SCard, SSectionTitle, SSectionDescription, SDefinitionTerm, SLink } from '../../../';
</script>

<template>
    <SCard class="mx-auto w-full max-w-4xl">
        <div class="flex justify-between gap-8">
            <div>
                <SSectionTitle>Sites Admin</SSectionTitle>
                <SSectionDescription>Role given to Operations administrator of sites</SSectionDescription>
            </div>
            <div class="space-x-3">
                <SButton variant="danger">Delete</SButton>
                <SButton>Edit</SButton>
            </div>
        </div>
        <div class="mt-6">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <SDefinitionTerm class="sm:col-span-1">
                    Permissions
                    <template #description>32 Permissions assigned</template>
                </SDefinitionTerm>

                <SDefinitionTerm class="sm:col-span-1">
                    Used by
                    <template #description>23 Users are using this role</template>
                </SDefinitionTerm>

                <SDefinitionTerm class="sm:col-span-1">
                    Created by
                    <template #description>
                        <SLink href="#"> Jane Doe </SLink>
                        - 20 May 2021, 13:45
                    </template>
                </SDefinitionTerm>

                <SDefinitionTerm class="sm:col-span-1">
                    Updated by
                    <template #description>
                        <SLink href="#"> James Doe </SLink>
                        - 22 May 2021, 11:45
                    </template>
                </SDefinitionTerm>
            </dl>
        </div>
    </SCard>
</template>
