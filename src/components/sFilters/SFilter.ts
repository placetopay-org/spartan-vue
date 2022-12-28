import {
  defineComponent,
  Fragment,
  h,
  onMounted,
  provide,
  reactive,
  ref,
} from "vue";
import { SFilterContext } from './SFilterContext';
import type { StateDefinition, Filter, SelectorFilter, SavedFilter } from "./SFilterContext";

/**
 *
 * @param {string} key - Key to get the saved filters
 * @param {string|number} userId - User id to get the saved filters
 * @returns {Array} - Array of saved filters
 */
const getSavedFiltersByKey = (key: string, userId: string | number): Array<SavedFilter> => {
  const savedFilters = localStorage.getItem(key);
  if (!savedFilters) return [];

  const savedFiltersByUser = JSON.parse(savedFilters)[userId];
  return savedFiltersByUser ?? [];
};

const generateId = (value: any) => window.btoa(JSON.stringify(value) + Date.now());

export const SFilter = defineComponent({
  name: "SFilter",
  props: {
    as: {
      type: [Object, String],
      default: "template",
    },
    selectors: {
      type: Array<SelectorFilter>,
      required: true,
      default: () => [
        { id: "example-id", type: "text", label: "Example label" },
      ],
    },
    filters: {
      type: Array<Filter>,
      required: true,
    },
    addItemText: {
      type: String,
      default: "Agregar Filtro",
    },
    savedFiltersKey: {
      type: String,
      default: "savedFilters",
    },
    userId: {
      type: [String, Number],
      default: "userId",
    },
  },
  emits: ["applyFilters"],
  setup(props, { slots, attrs, emit }) {
    const savedFilters = reactive<Array<SavedFilter>>([]);

    const addFilter: StateDefinition['addFilter'] = (filter) => props.filters.push({
      ...filter,
      id: generateId(filter),
    })

    let api: StateDefinition = {
      addItemText: props.addItemText,
      filters: props.filters,
      selectors: props.selectors,
      addItemByTypeId: ref(null),
      findSelectorById: (id) =>
        props.selectors.find((selector) => selector.id === id),
      addFilter,
      removeFilter: (filterId) =>
        props.filters.splice(
          props.filters.findIndex(
            (filterToFind) => filterToFind.id === filterId
          ),
          1
        ),
      updateFilter: (filterId, filter) => {
        const filterIndex = props.filters.findIndex(
          (filterToFind) => filterToFind.id === filterId
        );
        props.filters.splice(filterIndex, 1, filter);
      },
      duplicateFilter: (filterId) => {
        const filterFound = props.filters.find(
          (filterToFind) => filterToFind.id === filterId
        );
        if (!filterFound) return;

        const {id, ...filter} = filterFound;
        addFilter(filter);
      },
      applyFilters: () => emit("applyFilters", props.filters.slice(0)),
      removeFilters: () => props.filters.splice(0, props.filters.length),
      savedFilters,
      saveFilters: (name) => {
        const localSavedFilters = localStorage.getItem(props.savedFiltersKey) ?? '{}';
        const savedFiltersTemp = JSON.parse(localSavedFilters);
        const savedFiltersByUser = savedFiltersTemp[props.userId] ?? [];

        savedFiltersByUser.push({ name, filters: props.filters });
        savedFiltersTemp[props.userId] = savedFiltersByUser;

        localStorage.setItem(
          props.savedFiltersKey,
          JSON.stringify(savedFiltersTemp)
        );
        savedFilters.push({ id: generateId(savedFiltersTemp), name, filters: props.filters });
      },
      applySavedFilter: (savedFilter) => {
        props.filters.splice(0, props.filters.length, ...savedFilter.filters);
      },
    };

    provide(SFilterContext, api);

    onMounted(() => {
      getSavedFiltersByKey(props.savedFiltersKey, props.userId).forEach(
        (savedFilter) => savedFilters.push(savedFilter)
      );
    });

    const slotsToRender = slots.default ? slots.default() : [];

    return () =>
      h(
        props.as === "template" ? Fragment : props.as,
        { ...attrs },
        slotsToRender
      );
  },
});
