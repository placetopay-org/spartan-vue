<script setup>
import { useI18n } from 'vue-i18n';
import SBadge from '../SBadge.vue';
import { useSFilterContext } from './SFilterContext';

const api = useSFilterContext();

const { t } = useI18n({
  useScope: 'local',
  messages: {
    en: {
      spartan: {
        sfilters: {
          applyFilters: 'Apply filters',
          deleteFilters: 'Delete filters',
        },
      }
    },
    es: {
      spartan: {
        sfilters: {
          applyFilters: 'Aplicar filtros',
          deleteFilters: 'Borrar filtros',
        },
      }
    },
    it: {
      spartan: {
        sfilters: {
          applyFilters: 'Applica filtri',
          deleteFilters: 'Elimina filtri',
        },
      }
    },
    pt: {
      spartan: {
        sfilters: {
          applyFilters: 'Aplicar filtros',
          deleteFilters: 'Excluir filtros',
        },
      }
    },
  }
});
</script>

<template>
    <div class="flex flex-row gap-1">
        <SBadge as="button" size="lg" color="primary" class="bg-primary-500 px-6 text-white" @click="api.applyFilters">{{ t('spartan.sfilters.applyFilters') }}</SBadge>
        <SBadge as="button" size="lg" class="px-6 border border-gray-300" color="white" @click="api.removeFilters">{{ t('spartan.sfilters.deleteFilters') }}</SBadge>
    </div>
</template>