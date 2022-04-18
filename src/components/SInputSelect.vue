<template>
  <Listbox as="div" v-model="selected">
    <div class="mt-1 relative">
      <ListboxButton :disabled="disabled" class="bg-white relative w-full border border-gray-300 rounded-xl shadow p-2 text-left cursor-default focus:border-2 focus:border-solid focus:border-gray-900 sm:text-sm">
        <span :class="[selected ? 'text-gray-900' : '', disabled ? '!text-gray-500' : '', 'block truncate text-gray-500 font-normal text-base']">{{ selected.name }}</span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <ListboxOption as="template" v-for="item in items" :value="item" v-slot="{ active, selected }">
            <li :class="[active ? 'text-white bg-gray-900' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
            <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
              {{ item.name }}
            </span>

            <span v-if="selected" :class="[active ? 'text-white' : 'text-gray-900', 'absolute inset-y-0 right-0 flex items-center pr-4']">
              <CheckIcon class="h-5 w-5" aria-hidden="true" />
            </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'


export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxLabel,
    ListboxOption,
    ListboxOptions,
    CheckIcon,
    SelectorIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    items: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const selected = ref({name: props.label})

    return {
      selected,
    }
  },
}
</script>