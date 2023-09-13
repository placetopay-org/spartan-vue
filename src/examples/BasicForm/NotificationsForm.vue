<script setup lang="ts">
import { SButton, SInput } from '@spartan';
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
            <section class="">
                <fieldset>
                    <legend class="text-sm font-semibold leading-6 text-gray-900">Por correo electrónico</legend>
                    <div class="mt-6 space-y-6">
                        <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <SInput
                                    id="comments"
                                    name="comments"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div class="text-sm leading-6">
                                <label for="comments" class="font-medium text-gray-900">Comentarios</label>
                                <p class="text-gray-500">
                                    Reciba notificaciones cuando alguien publique un comentario en una publicación.
                                </p>
                            </div>
                        </div>

                        <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <SInput
                                    id="candidates"
                                    name="candidates"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div class="text-sm leading-6">
                                <label for="candidates" class="font-medium text-gray-900">Candidatos</label>
                                <p class="text-gray-500">
                                    Reciba notificaciones cuando un candidato solicite un trabajo.
                                </p>
                            </div>
                        </div>

                        <div class="relative flex gap-x-3">
                            <div class="flex h-6 items-center">
                                <SInput
                                    id="offers"
                                    name="offers"
                                    type="checkbox"
                                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div class="text-sm leading-6">
                                <label for="offers" class="font-medium text-gray-900">Ofertas</label>
                                <p class="text-gray-500">
                                    Reciba notificaciones cuando un candidato acepte o rechace una oferta.
                                </p>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </section>

            <hr class="my-8" />

            <section class="flex justify-end gap-2">
                <SButton variant="secondary"> Cancelar </SButton>
                <SButton variant="primary"> Guardar </SButton>
            </section>
        </form>
    </div>
</template>
