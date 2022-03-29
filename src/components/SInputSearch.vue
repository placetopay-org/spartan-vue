<template>
  <div class="flex flex-row">
    <slot/>
    <SInput v-bind="inputArgs"
            :class="[dropdown ? 'rounded-none' : ' rounded-none rounded-l-xl','px-2.5 !py-2.5']"
    ></SInput>
    <SButtonSearch
        :icon="btnIcon"
        :label="btnLabel"
    >
    </SButtonSearch>
  </div>
</template>

<script>
import { SButtonSearch, SInput } from "../index.js";

export default {
  components: {
    SButtonSearch,
    SInput,
  },
  props: {
    dropdown: {
      type: Boolean,
      default: false,
    },
    inputArgs: {
      type: Object
    },
    btnIcon: {
      type: [Object, String, Function],
      default: undefined,
    },
    btnLabel: {
      type: String,
      default: '',
    }
  }
}
</script>