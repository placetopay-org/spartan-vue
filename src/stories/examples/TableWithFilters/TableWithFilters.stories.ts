import { computed, ref } from 'vue';
import { SDTable, SDColumn, SInput, SButton, SSelect } from '../../../';
import { createVariation } from '../../../helpers';
import { EnvelopeIcon, MagnifyingGlassIcon, PlusIcon, TagIcon } from '@heroicons/vue/20/solid';

export default {
    title: 'examples/TableWithFilters',
};

export const Manual = createVariation({
    components: { SInput, SButton, SDTable, SDColumn },
    setup() {
        const data = ref([
            { name: 'John Doe', email: 'john.doe@example.com', title: 'Software Engineer', role: 'Developer' },
            { name: 'Jane Smith', email: 'jane.smith@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Jim Beam', email: 'jim.beam@example.com', title: 'Designer', role: 'Designer' },
            { name: 'Jill Johnson', email: 'jill.johnson@example.com', title: 'Developer', role: 'Developer' },
            { name: 'Jack Martin', email: 'jack.martin@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Dave Clark', email: 'dave.clark@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Mike Doe', email: 'mike.doe@example.com', title: 'Product Manager', role: 'Manager' },
            { name: 'Tom Zimmer', email: 'tom.zimmer@example.com', title: 'Product Manager', role: 'Manager' },
        ]);

        const query = ref('');

        const filteredData = computed(() => {
            return data.value.filter((item) => item.name.toLowerCase().includes(query.value.toLowerCase()));
        });

        return { EnvelopeIcon, MagnifyingGlassIcon, PlusIcon, TagIcon, filteredData, query };
    },
    template: `
<div class="flex gap-4 items-center justify-between">
  <h1 class="text-2xl font-bold text-gray-900">Table with Filters</h1>

  <div class="flex -space-x-px">
      <SInput placeholder="Find your product..." rounded="left" required v-model="query" />
      <SButton rounded="right" :icon="MagnifyingGlassIcon">Search</SButton>
  </div>
</div>
<SDTable :data="filteredData">
    <SDColumn field="name" header="Nombre" />
    <SDColumn field="email" header="Correo" />
    <SDColumn field="title" header="Titulo" />
    <SDColumn field="role" header="Rol" />
</SDTable>
`,
    containerClass: 'flex flex-col gap-4',
});

export const WithComponent = createVariation({
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
