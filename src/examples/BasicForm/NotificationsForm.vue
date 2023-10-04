<script setup lang="ts">
import { SButton, SCheckbox } from '@spartan';
</script>

<template>
    <div class="bg-gray-50 p-8 shadow-md">
        <header class="mb-4">
            <h1 class="text-base font-semibold text-gray-900">Notificaciones</h1>
            <p class="mt-1 text-sm text-gray-600">
                Siempre te informaremos sobre cambios importantes, pero tú eliges qué más quieres escuchar.
            </p>
        </header>

        <form class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
            <fieldset>
                <legend class="text-sm font-semibold leading-6 text-gray-900">Por correo electrónico</legend>
                <div class="mt-6 space-y-6">
                    <SCheckbox
                        id="comments"
                        name="comments"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    >
                        Comentarios
                        <template #description>
                            Reciba notificaciones cuando alguien publique un comentario en una publicación.
                        </template>
                    </SCheckbox>

                    <SCheckbox
                        id="comments"
                        name="comments"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    >
                        Candidatos
                        <template #description>
                            Reciba notificaciones cuando un candidato solicite un trabajo.
                        </template>
                    </SCheckbox>

                    <SCheckbox
                        id="comments"
                        name="comments"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    >
                        Ofertas
                        <template #description>
                            Reciba notificaciones cuando un candidato acepte o rechace una oferta.
                        </template>
                    </SCheckbox>
                </div>
            </fieldset>

            <hr class="my-8" />

            <section class="flex justify-end gap-2">
                <SButton variant="secondary"> Cancelar </SButton>
                <SButton variant="primary"> Guardar </SButton>
            </section>
        </form>
    </div>
</template>
