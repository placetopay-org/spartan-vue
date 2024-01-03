<script setup lang="ts">
import { computed, ref } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/solid';
import { SRadio, SCheckbox } from '../../';
import { translator } from '@/helpers';
import { SBadge, SInput } from '@spartan';
import type { TField } from '../types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
    modelValue?: string[];
    field: TField;
}>();

const { t } = translator('filter');

const interfaceData = computed(() => props.field.interfaces.options!);

const search = ref('');

const checked = computed({
    get() {
        return props.modelValue || [];
    },
    set(value) {
        emit('update:modelValue', value);
    },
});

const computedOptions = computed(() => {
    return interfaceData.value.options.filter((option) => option.toLowerCase().includes(search.value.toLowerCase()));
});

const removeCheck = (option: string) => checked.value = checked.value.filter((item) => item !== option);

const clear = () => {
    checked.value = [];
    search.value = '';
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <SInput
            v-if="!interfaceData.multiple && interfaceData.options.length > 5"
            v-model="search"
            :placeholder="t('inputSelectorPlaceholder')"
        />
        <div
            v-if="interfaceData.multiple"
            :tabindex="-1"
            class="flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2 transition focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-100"
            @focus="
                (event: FocusEvent) =>
                    ((event.target as HTMLDivElement).querySelector('input') as HTMLInputElement).focus()
            "
        >
            <div class="scroll-hide flex max-h-20 w-full flex-wrap gap-3 overflow-auto">
                <template v-if="checked">
                    <SBadge
                        v-for="option in checked"
                        :key="option"
                        removable
                        pill
                        size="sm"
                        @removed="removeCheck(option)"
                    >
                        {{ option }}
                    </SBadge>
                </template>
                <input
                    id="input-search"
                    v-model="search"
                    type="text"
                    :placeholder="checked.length ? '' : t('optionsSelectorPlaceholder')"
                    class="w-full border-0 p-0 text-sm placeholder:text-gray-400 focus:outline-0 focus:ring-0"
                />
            </div>
            <div class="flex items-center">
                <button @click="clear">
                    <XMarkIcon class="h-5 w-5 text-gray-500 duration-75 hover:scale-105 hover:text-gray-700" />
                </button>
            </div>
        </div>
        <div class="scroll-primary flex max-h-32 flex-col gap-2 overflow-y-auto py-1.5 pl-1.5">
            <div v-for="option in computedOptions" :key="option" class="flex items-center gap-2">
                <component
                    :is="interfaceData.multiple ? SCheckbox : SRadio"
                    v-model="checked"
                    :value="option"
                >
                    {{ option }}
                </component>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* width */
.scroll-primary::-webkit-scrollbar {
    width: 5px;
}

/* Track */
.scroll-primary::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
.scroll-primary::-webkit-scrollbar-thumb {
    background: #ff6c0c;
    border-radius: 16px;
}

/* For Webkit-based browsers (Chrome, Safari and Opera) */
.scroll-hide::-webkit-scrollbar {
    display: none;
}

/* For IE, Edge and Firefox */
.scroll-hide {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>
