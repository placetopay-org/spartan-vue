import {SInput, SInputDate, SInputDropdown} from '../sInputs';

export const OptionsByInputType = {
  text: [
    {label: 'Igual a', value: 'eq'},
    {label: 'No es igual a', value: 'notEq'},
    {label: 'Contiene', value: 'contain'},
    {label: 'No contiene', value: 'notContain'},
    {label: 'Comienza con', value: 'startWith'},
    {label: 'Termina con', value: 'endWith'},
  ],
  date: [
    {label: 'Igual a', value: 'eq'},
    {label: 'Antes de', value: 'beforeAt'},
    {label: 'Despues de', value: 'afterAt'},
    {label: 'Esta en o antes', value: 'eqOrBeforeAt'},
    {label: 'Esta en o despues', value: 'eqOrAfterAt'},
    {label: 'En los últimos', value: 'inTheLast'},
    {label: 'Entre', value: 'between'},
  ],
  amount: [
    {label: 'Igual a', value: 'eq'},
    {label: 'No es igual a', value: 'notEq'},
    {label: 'Menor', value: 'less'},
    {label: 'Menor o igual', value: 'lessOrEq'},
    {label: 'Mayor', value: 'greater'},
    {label: 'Mayor o igual', value: 'greaterOrEq'},
    {label: 'Entre', value: 'between'},
  ],
  checkbox: [
    {label: 'Igual a', value: 'eq'},
    {label: 'No es igual a', value: 'notEq'},
  ],
  radio: [
    {label: 'Igual a', value: 'eq'},
    {label: 'No es igual a', value: 'notEq'},
  ],
}

export const InputByType = {
  text: {
    default: {
      component: SInput,
    },
  },
  date: {
    inTheLast: {
      component: SInputDropdown,
      formatter: (value) => Array.isArray(value) ? '' : value,
      getValue: (value) => `${value.value} ${value.option.label}`,
      props: {
        type: 'number',
        rows: [
          {label: 'Días', value: 'days'},
          {label: 'Meses', value: 'months'},
          {label: 'Años', value: 'years'},
        ],
      },
    },
    between: {
      props: {
        useRange: true,
      }
    },
    default: {
      component: SInputDate,
      formatter: (value) => !value ? [] : Array.isArray(value) ? value : [value],
      getValue: (value) => Array.isArray(value) ? value.join(' - ') : value,
      props: {
        asSingle: true,
        formatter: {
          date: 'YYYY-MM-DD',
          month: 'MMM'
        },
      }
    }
  }
}