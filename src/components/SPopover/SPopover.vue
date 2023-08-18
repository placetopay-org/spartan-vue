<script setup lang="ts">
import { useFloating, autoUpdate, flip, offset, type Placement } from '@floating-ui/vue';
import { useFloatingGate } from '../../hooks/useFloatingGate';
import { ref, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    static?: boolean;
    offset?: number;
    placement?: Placement;
  }>(),
  {
    static: false,
    offset: 0,
    placement: 'bottom-start',
  }
);

const reference = ref(null);
const floating = ref(null);

const middleware = computed(() => {
  const group = [];
  !props.static && group.push(flip());
  props.offset && group.push(offset(props.offset));

  return group;
});

const { isDisplayed, display, focusout } = useFloatingGate(reference, floating);
const { floatingStyles } = useFloating(reference, floating, {
  transform: false,
  placement: computed(() => props.placement),
  middleware: middleware,
  whileElementsMounted: autoUpdate,
});
</script>

<template>
  <div ref="reference">
    <slot name="reference" :display="display" />
  </div>
  <div class="relative">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="isDisplayed" ref="floating" :style="floatingStyles" @focusout="focusout" tabindex="-1">
        <slot />
      </div>
    </Transition>
  </div>
</template>
