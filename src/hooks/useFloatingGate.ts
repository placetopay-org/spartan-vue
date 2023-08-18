import { nextTick, onMounted, ref, type Ref } from 'vue';

export const useFloatingGate = (reference: Ref<HTMLElement | null>, floating: Ref<HTMLElement | null>) => {
  const isDisplayed = ref(false);

  const display = () => {
    isDisplayed.value = true;
    nextTick(() => {
      floating.value?.focus();
    });
  };

  const isDown = ref(false);

  onMounted(() => {
    reference.value?.addEventListener('mousedown', () => (isDown.value = true));
    reference.value?.addEventListener('mouseup', () => (isDown.value = false));
  });

  const focusout = () => {
    if (!isDown.value) isDisplayed.value = false;
  };

  return {
    isDisplayed,
    display,
    focusout,
  };
};
