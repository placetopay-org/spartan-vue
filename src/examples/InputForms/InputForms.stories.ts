import { computed, ref } from 'vue';
import { SInput, SButton, SSelect } from '../../';
import { createVariation } from '../../helpers';
import { EnvelopeIcon, MagnifyingGlassIcon, PlusIcon, TagIcon } from '@heroicons/vue/20/solid';

export default {
    title: 'examples/InputForms',
};

export const InputWithSubmitButton = createVariation({
    components: { SInput, SButton },
    setup() {
        return { EnvelopeIcon, MagnifyingGlassIcon, PlusIcon, TagIcon };
    },
    template: `
<form @submit.prevent class="flex -space-x-px">
  <SInput class="w-full" placeholder="example@email.com" :icon="EnvelopeIcon" type="email" rounded="left" required />
  <SButton type="submit" rounded="right">Invite</SButton>
</form>

<form @submit.prevent class="flex -space-x-px">
  <SInput class="w-full" :icon="TagIcon" rounded="left" required suffix="tag" />
  <SButton type="submit" rounded="right" :icon="PlusIcon" />
</form>

<form @submit.prevent class="flex -space-x-px">
  <SInput class="w-full" placeholder="Find your product..." rounded="left" required />
  <SButton type="submit" rounded="right" :icon="MagnifyingGlassIcon" >Search</SButton>
</form>
`,
    containerClass: 'flex flex-col gap-4',
});

export const Test = createVariation({
    components: { SInput, SButton, SSelect },
    setup() {
        const currency = ref('JPY');

        const prefix = computed(() => {
            if (currency.value === 'COP') return '$';
            if (currency.value === 'USD') return '$';
            if (currency.value === 'JPY') return '¥';
            if (currency.value === 'EUR') return '€';

            return undefined;
        });

        const placeholder = computed(() => {
            if (currency.value === 'COP') return '100.000,00';
            if (currency.value === 'USD') return '100,000.00';
            if (currency.value === 'JPY') return '100,000.00';
            if (currency.value === 'EUR') return '100,000.00';

            return undefined;
        });

        return { currency, placeholder, prefix };
    },
    template: `<form @submit.prevent class="flex -space-x-px">
    <SSelect v-model="currency" rounded="left">
      <option value="COP">COP</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="JPY">JPY</option>
    </SSelect>
  <SInput :prefix="prefix" :placeholder="placeholder" rounded="right" />
</form>`,
});
