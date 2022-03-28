<template>
  <div class="flex flex-row">
    <SDropdown v-if="drop"
               :search="true"
               :label="dropLabel"
    >
    </SDropdown>
    <SInput v-bind="inputArgs"
            :class="[drop ? 'rounded-none' : ' rounded-none rounded-l-xl','px-2.5 py-2.5']"
    ></SInput>
    <SButtonSearch
        :icon="btnIcon"
        :label="btnLabel"
    >
    </SButtonSearch>
  </div>
</template>

<script>
import { SButtonSearch, SDropdown, SInput } from "../index.js";

export default {
  components: {
    SButtonSearch,
    SDropdown,
    SInput,
  },
  props: {
    drop: {
      type: Boolean,
      default: false,
    },
    dropLabel: {
      type: String,
      default: '',
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