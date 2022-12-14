import { reactive } from 'vue';
import { SFilter, SFilterItems, SFilterActions } from '../index';

export default {
  title: "Components/SFilter",
  component: SFilter,
  argTypes: { },
  decorators: [
    () => ({ template: '<div class="max-w-lg border-none"><story /></div>' }),
  ],
};

const Template = (args) => ({
  components: { SFilter, SFilterItems, SFilterActions },
  setup() {
    const filters = reactive([])

    const applyFilters = (filterApplied) => console.log('[applyFilters] ejected', filterApplied);

    return { filters, selectors: args.selectors, applyFilters };
  },
  template: `
    <SFilter
      as="div"
      :filters="filters"
      :selectors="selectors"
      class="flex flex-col gap-2 w-full"
      @apply-filters="applyFilters"
    >
      <h1>Title Section</h1>
      <div class="flex justify-between">
        <SFilterItems />

        <SFilterActions />
      </div>
    </SFilter>
  `
})

export const Default = Template.bind({});

Default.args = {
  selectors: [
    {id: 'selector-text', type: 'text', label: 'El label'},
    {id: 'selector-text-2', type: 'text', label: 'El texto'},
  ],
};