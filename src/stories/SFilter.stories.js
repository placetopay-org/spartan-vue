import { reactive } from 'vue';
import { SFilter, SFilterItems, SFilterActions, SFilterOption } from '../index';

export default {
  title: "Components/SFilter",
  component: SFilter,
  argTypes: { },
  decorators: [
    () => ({ template: '<div class="max-w-2xl mx-auto border-none"><story /></div>' }),
  ],
};

const Template = (args) => ({
  components: { SFilter, SFilterItems, SFilterActions, SFilterOption },
  setup() {
    const filters = reactive([])

    const applyFilters = (filterApplied) => alert('[applyFilters] ejected: ' + JSON.stringify(filterApplied));

    return { filters, selectors: args.selectors, applyFilters };
  },
  template: `
    <SFilter
      as="div"
      :filters="filters"
      :selectors="selectors"
      class="flex flex-col gap-8 w-full"
      @apply-filters="applyFilters"
    >
      <div class="flex items-center justify-between">
        <h1 class="text-3xl">Title Section</h1>

        <SFilterOption />
      </div>
      <div class="flex justify-between">
        <SFilterItems />

        <SFilterActions class="flex-wrap" />
      </div>
    </SFilter>
  `
})

export const Default = Template.bind({});

Default.args = {
  selectors: [
    {id: 'selector-text', type: 'text', label: 'El label', key: 'label'},
    {id: 'selector-date', type: 'date', label: 'Creado en', key: 'createdAt'},
    {id: 'selector-radio', type: 'radio', label: 'Tipo de documento', key: 'documentType', rows: [
      {value: 'CC', label: 'Cedula de ciudadania'},
      {value: 'CE', label: 'Cedula de extranjeria'},
    ]},
  ],
};