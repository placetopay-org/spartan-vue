import { inject } from "vue";
import type { Ref, InjectionKey } from "vue";

export type Filter = {
  id: string;
  key: string;
  label: string;
  value: string;
};

type FilterType = "text" | "date" | "amount" | "checkbox" | "radio";

export type SelectorFilter = {
  id: string;
  type: FilterType;
  label: string;
};

export type SavedFilter = {
  id: string;
  name: string;
  filters: Array<Filter>;
};

export type StateDefinition = {
  addItemText: string;
  filters: Array<Filter>;
  selectors: Array<SelectorFilter>;
  addItemByTypeId: Ref<SelectorFilter["id"] | null>;
  savedFilters: Array<SavedFilter>;
  findSelectorById: (id: SelectorFilter["id"]) => SelectorFilter | undefined;
  addFilter: (filter: Omit<Filter, "id">) => void;
  removeFilter: (filterId: Filter["id"]) => void;
  updateFilter: (filterId: Filter["id"], filter: Filter) => void;
  duplicateFilter: (filterId: Filter["id"]) => void;
  applyFilters: () => void;
  removeFilters: () => void;
  saveFilters: (name: string) => void;
  applySavedFilter: (savedFilter: SavedFilter) => void;
};

export let SFilterContext = Symbol(
  "SFilterContext"
) as InjectionKey<StateDefinition>;

export const useSFilterContext = (component: string) => {
  const context = inject(SFilterContext, null);
  if (context === null) {
    const err = new Error(
      `<${component} /> is missing parent <SFilter /> component`
    );
    throw err;
  }
  return context;
};
