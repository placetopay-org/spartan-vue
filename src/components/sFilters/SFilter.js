import { defineComponent, Fragment, h, onMounted, provide, reactive, ref } from "vue";
import { SFilterContext } from "./SFilterContext";
/**
 * 
 * @param {string} key - Key to get the saved filters
 * @param {string} userId - User id to get the saved filters
 * @returns {Array} - Array of saved filters
 */
const getSavedFiltersByKey = (key, userId) => {
  const savedFilters = localStorage.getItem(key);
  if (!savedFilters) return [];

  const savedFiltersByUser = JSON.parse(savedFilters)[userId];
  return savedFiltersByUser ?? [];
};

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
    savedFiltersKey: {
      type: String,
      default: 'savedFilters',
    },
    userId: {
      type: [String, Number],
      default: 'userId',
    },
  },
  emits: ['applyFilters'],
  setup(props, { slots, attrs, emit }) {
    const savedFilters = reactive([]);

    let api = {
      addItemText: props.addItemText,
      filters: props.filters,
      selectors: props.selectors,
      addItemByTypeId: ref(null),
      findSelectorById: (id) => props.selectors.find(selector => selector.id === id),
      addFilter: (filter) => props.filters.push({
        id: window.btoa(JSON.stringify(filter) + props.filters.length),
        ...filter
      }),
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
      applyFilters: () => emit('applyFilters', props.filters.slice(0)),
      removeFilters: () => props.filters.splice(0, props.filters.length),
      savedFilters,
      saveFilters: (name) => {
        const savedFiltersTemp = JSON.parse(localStorage.getItem(props.savedFiltersKey)) ?? {};
        const savedFiltersByUser = savedFiltersTemp[props.userId] ?? [];

        savedFiltersByUser.push({ name, filters: props.filters });
        savedFiltersTemp[props.userId] = savedFiltersByUser;

        localStorage.setItem(props.savedFiltersKey, JSON.stringify(savedFiltersTemp));
        savedFilters.push({ name, filters: props.filters });
      },
      applySavedFilter: (savedFilter) => {
        props.filters.splice(0, props.filters.length, ...savedFilter.filters);
      },
    };

    provide(SFilterContext, api);

    onMounted(() => {
      getSavedFiltersByKey(props.savedFiltersKey, props.userId).forEach(savedFilter => savedFilters.push(savedFilter));
    });

    const slotsToRender = slots.default ? slots.default() : [];

    return () => h(props.as === 'template' ? Fragment : props.as, { ...attrs }, slotsToRender);
  }
});