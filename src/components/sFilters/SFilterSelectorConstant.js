import { SInput, SInputDate, SInputDropdown, SInputRadio } from "../sInputs";

export const OptionsByInputType = {
  text: [
    { label: "Igual a", value: "eq" },
    { label: "No es igual a", value: "notEq" },
    { label: "Contiene", value: "contain" },
    { label: "No contiene", value: "notContain" },
    { label: "Comienza con", value: "startWith" },
    { label: "Termina con", value: "endWith" },
  ],
  date: [
    { label: "Igual a", value: "eq" },
    { label: "Antes de", value: "beforeAt" },
    { label: "Despues de", value: "afterAt" },
    { label: "Esta en o antes", value: "eqOrBeforeAt" },
    { label: "Esta en o despues", value: "eqOrAfterAt" },
    { label: "En los últimos", value: "inTheLast" },
    { label: "Entre", value: "between" },
  ],
  amount: [
    { label: "Igual a", value: "eq" },
    { label: "No es igual a", value: "notEq" },
    { label: "Menor", value: "less" },
    { label: "Menor o igual", value: "lessOrEq" },
    { label: "Mayor", value: "greater" },
    { label: "Mayor o igual", value: "greaterOrEq" },
    { label: "Entre", value: "between" },
  ],
  checkbox: [
    { label: "Igual a", value: "eq" },
    { label: "No es igual a", value: "notEq" },
  ],
  radio: [
    { label: "Igual a", value: "eq" },
    { label: "No es igual a", value: "notEq" },
  ],
};

export const InputByType = {
  text: {
    default: {
      component: SInput,
    },
  },
  date: {
    inTheLast: {
      component: SInputDropdown,
      formatter: (value) => (Array.isArray(value) ? "" : value),
      getValue: (value) => `${value.value} ${value.option.label}`,
      isValid: (value) => value.value && value.option && value.option.label && value.option.value,
      props: {
        type: "number",
        rows: [
          { label: "Días", value: "days" },
          { label: "Meses", value: "months" },
          { label: "Años", value: "years" },
        ],
      },
    },
    between: {
      isValid: (value) => Array.isArray(value) && value.length === 2,
      props: {
        useRange: true,
      },
    },
    default: {
      component: SInputDate,
      formatter: (value) =>
        !value ? [] : Array.isArray(value) ? value : [value],
      getValue: (value) => (Array.isArray(value) ? value.join(" - ") : value),
      isValid: (value) => Array.isArray(value) && value.length === 1,
      props: {
        asSingle: true,
        formatter: {
          date: "YYYY-MM-DD",
          month: "MMM",
        },
      },
    },
  },
  radio: {
    default: {
      component: SInputRadio,
      getValue: (value) => value.label,
      formatter: (value) => typeof value === 'object' ? value : null,
      isValid: (value) => typeof value === 'object' && value.value && value.label, 
    },
  },
};

export const InputTranslations = {
  es: {
    text: {
      eq: "Igual a",
      notEq: "No es igual a",
      contain: "Contiene",
      notContain: "No contiene",
      startWith: "Comienza con",
      endWith: "Termina con",
    },
    date: {
      eq: "Igual a",
      beforeAt: "Antes de",
      afterAt: "Despues de",
      eqOrBeforeAt: "Esta en o antes",
      eqOrAfterAt: "Esta en o despues",
      inTheLast: "En los últimos",
      between: "Entre",
    },
    amount: {
      eq: "Igual a",
      notEq: "No es igual a",
      less: "Menor",
      lessOrEq: "Menor o igual",
      greater: "Mayor",
      greaterOrEq: "Mayor o igual",
      between: "Entre",
    },
    checkbox: {
      eq: "Igual a",
      notEq: "No es igual a",
    },
    radio: {
      eq: "Igual a", 
      notEq: "No es igual a", 
    },
  },
  en: {
    text: {
      eq: "Equal to",
      notEq: "Not equal to",
      contain: "Contain",
      notContain: "Not contain",
      startWith: "Start with",
      endWith: "End With",
    },
    date: {
      eq: "Equal to",
      beforeAt: "Before at",
      afterAt: "After at",
      eqOrBeforeAt: "Equal or before at",
      eqOrAfterAt: "Equal or after at",
      inTheLast: "In the last",
      between: "Between",
    },
    amount: {
      eq: "Equal to",
      notEq: "Not equal to",
      less: "Less",
      lessOrEq: "Less or equal",
      greater: "Greater",
      greaterOrEq: "Greater or equal",
      between: "Between",
    },
    checkbox: {
      eq: "Equal to",
      notEq: "Not equal to",
    },
    radio: {
      eq: "Equal to", 
      notEq: "Not equal to", 
    },
  },
  pt: { 
    text: {
      eq: "Igual a",
      notEq: "Diferente de",
      contain: "Conter",
      notContain: "Não contém",
      startWith: "Começar com",
      endWith: "FimCom",
    },
    date: {
      eq: "Igual a",
      beforeAt: "Antes em",
      afterAt: "Depois de",
      eqOrBeforeAt: "Igual ou antes de",
      eqOrAfterAt: "Igual ou depois de",
      inTheLast: "No último",
      between: "Entre",
    },
    amount: {
      eq: "Igual a",
      notEq: "Diferente de",
      less: "Menos",
      lessOrEq: "Menor ou igual",
      greater: "Maior",
      greaterOrEq: "Maior ou igual",
      between: "Entre",
    },
    checkbox: {
      eq: "Igual a",
      notEq: "Diferente de",
    },
    radio: {
      eq: "Igual a",
      notEq: "Diferente de",
    },
  },
  it: {
    text: {
      eq: "Uguale a",
      notEq: "Diverso da",
      contain: "Contiene",
      notContain: "Non contiene",
      startWith: "Inizia con",
      endWith: "Termina con",
    },
    date: {
      eq: "Uguale a",
      beforeAt: "Prima di",
      afterAt: "Dopo di",
      eqOrBeforeAt: "Uguale o prima di",
      eqOrAfterAt: "Uguale o dopo di",
      inTheLast: "Nell'ultimo",
      between: "Fra",
    },
    amount: {
      eq: "Uguale a",
      notEq: "Diverso da",
      less: "Minore",
      lessOrEq: "Minore o uguale",
      greater: "Maggiore",
      greaterOrEq: "Maggiore o uguale",
      between: "Fra",
    },
    checkbox: {
      eq: "Uguale a",
      notEq: "Diverso da",
    },
    radio: {
      eq: "Uguale a",
      notEq: "Diverso da",
    },
  }
};
