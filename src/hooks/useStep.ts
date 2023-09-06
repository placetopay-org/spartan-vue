import { ref } from 'vue';

export const useStep = () => {
  const step = ref(0);
  const is = (value: number) => step.value === value;
  const next = () => step.value++;
  const prev = () => step.value--;

  return {
    step,
    is,
    next,
    prev,
  };
};
