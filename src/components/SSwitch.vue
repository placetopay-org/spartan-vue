<template>
  <label class="s-switch" >
    <input
        v-model="state"
        aria-hidden="true"
        class="s-switch-input"
        type="checkbox"
        :disabled="disabled"
        @click="onTrigger()"
    />
    <div class="s-switch-slider" />
    <span v-if="label" class="s-switch-label">
      {{ label }}
    </span>
  </label>
</template>

<script>

export default {
  name: "SToggle",
  props: {
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    modelValue: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      state: this.modelValue,
    }
  },
  computed: {
    switchAttributes() {
      return {
        'aria-disabled': this.disabled,
        tabindex: this.disabled ? undefined : '0',
      }
    },
  },
  watch: {
    modelValue(newModelValue) {
      this.state = newModelValue
    },
    state(newValue) {
      this.$emit('update:modelValue', newValue)
    },
  },
  methods: {
    onTrigger() {
      this.state = !this.state
    },
  },
}
</script>

<style scoped>
.s-switch {
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  width: -moz-fit-content;
  width: fit-content;
}

.s-switch input {
  display: none;
}

.s-switch-slider {
  position: relative;
  display: block;
  width: 48px;
  height: 24px;
  border: 2px solid #E5E7EB;
  border-radius: 24px;
  background-color: #E5E7EB;
  transition: 0.15s;
}

.s-switch-slider:before {
  content: '';
  border-radius: 24px;
  position: absolute;
  height: 16px;
  width: 16px;
  left: 2px;
  top: 2px;
  background-color: white;
  transition: 0.15s;
}

.s-switch-label {
  user-select: none;
  margin-left: 8px;
}

/* Checked */
.s-switch-input:checked + .s-switch-slider {
  border-color: #4F46E5;
  background-color: #4F46E5;
}

.s-switch-input:focus + .s-switch-slider {
  box-shadow: 0 0 1px #101010;
}

.s-switch-input:checked + .s-switch-slider:before {
  background-color: white;
  transform: translate(24px);
}

/* Disabled */
.s-switch[aria-disabled='true'] {
  cursor: not-allowed;
}

.s-switch[aria-disabled='true'] .s-switch-slider {
  border: 2px solid #757575;
  background-color: #e0e0e0;
}

.s-switch[aria-disabled='true'] .s-switch-input:checked + .s-switch-slider {
  border: 2px solid #757575;
  background-color: #757575;
}

.s-switch[aria-disabled='true'] .s-switch-slider:before {
  background-color: #E5E7EB;
}

.s-switch[aria-disabled='true'] .s-switch-input:checked + .s-switch-slider:before {
  background-color: #e0e0e0;
  transform: translate(24px);
}
</style>