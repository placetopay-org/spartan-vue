<script setup lang="ts">
import { SDropdown, SDropdownItem } from '../../../';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <footer class="flex w-full justify-center gap-8 bg-white py-6 text-gray-400">
        <span>© Placetopay</span>

        <SDropdown flipped>
            <button class="flex items-center gap-1.5">
                <ChatBubbleBottomCenterTextIcon class="h-4 w-4" />
                Idioma
            </button>

            <template #items>
                <div class="text-sm font-medium text-gray-800 w-36">
                    <SDropdownItem>Español</SDropdownItem>
                    <SDropdownItem>Inglés</SDropdownItem>
                </div>
            </template>
        </SDropdown>
    </footer>
</template>
