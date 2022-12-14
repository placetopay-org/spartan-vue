import { computed, defineComponent, Fragment, h, provide, reactive, ref } from "vue";
import { SFilterContext } from "./SFilterContext";

export const SFilter = defineComponent({
  name: 'SFilter',
  props: {
    as: {
      type: [Object, String],
      default: 'template',
    },
    selectors: {
      type: Array,
      required: true,
      default: () => [{ id: 'example-id', type: 'text', label: 'Example label' }],
    },
    filters: {
      type: Array,
      required: true,
    },
    addItemText: {
      type: String,
      default: 'Agregar Filtro',
    },
  },
  emits: ['applyFilters'],
  setup(props, { slots, attrs, emit }) {
    const addFilter = (filter) => props.filters.push({
      id: window.btoa(JSON.stringify(filter) + props.filters.length),
      ...filter
    });

    let api = {
      addItemText: props.addItemText,
      filters: props.filters,
      selectors: props.selectors,
      addItemByTypeId: ref(null),
      findSelectorById: (id) => props.selectors.find(selector => selector.id === id),
      addFilter,
      removeFilter: (filterId) => props.filters.splice(
        props.filters.findIndex((filterToFind) => filterToFind.id === filterId),
        1
      ),
      updateFilter: (filterId, filter) => {
        const filterIndex = props.filters.findIndex((filterToFind) => filterToFind.id === filterId);
        props.filters.splice(filterIndex, 1, filter);
      },
      duplicateFilter: (filterId) => {
        const {id, ...filter} = props.filters.find((filterToFind) => filterToFind.id === filterId);
        addFilter(filter);
      },
      applyFilters: () => emit('applyFilters', props.filters),
      removeFilters: () => props.filters.splice(0, props.filters.length),
    };

    provide(SFilterContext, api);

    return () => h(props.as === 'template' ? Fragment : props.as, { ...attrs }, slots);
  }
});