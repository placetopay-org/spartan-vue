<script setup lang="ts">
import { SDropdown, SDropdownItem } from '@spartan';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <footer class="flex w-full justify-center gap-8 bg-white text-gray-400">
        <span>© Placetopay</span>

        <SDropdown placement="top-start">
            <template #reference>
                <button class="flex items-center gap-1.5">
                    <ChatBubbleBottomCenterTextIcon class="h-4 w-4" />
                    Idioma
                </button>
            </template>

            <div class="w-36 text-sm font-medium text-gray-800">
                <SDropdownItem>Español</SDropdownItem>
                <SDropdownItem>Inglés</SDropdownItem>
            </div>
        </SDropdown>
    </footer>
</template>
