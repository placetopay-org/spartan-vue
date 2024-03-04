<script setup lang="ts">
import VForm from './VForm.vue';
import VFooter from './VFooter.vue';

defineProps<{
    route: string;
}>();
</script>

<template>
    <div class="flex h-full w-full flex-1 justify-center bg-white">
        <div class="ml-6 mr-0 hidden h-full max-h-[1148px] w-full max-w-max flex-1 self-center py-6 text-white lg:flex">
            <div class="w-full flex-1 justify-center gap-1.5 overflow-hidden rounded-3xl bg-black lg:flex">
                <div class="flex shrink-0 flex-col justify-center gap-1.5 overflow-hidden">
                    <div class="space-y-1.5">
                        <img class="h-[320px] w-[380px] rounded-2xl opacity-80" src="./assets/bento-1.png" />
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-50"
                            src="./assets/bento-2.jpg"
                        />
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-80"
                            src="./assets/bento-3.png"
                        />
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-50"
                            src="./assets/bento-4.png"
                        />
                    </div>
                </div>
                <div class="flex shrink-0 flex-col justify-center gap-1.5 overflow-hidden">
                    <div class="space-y-1.5">
                        <img
                            class="h-[250px] w-[320px] rounded-2xl object-cover opacity-50"
                            src="./assets/bento-5.png"
                        />
                        <div
                            class="box-border flex h-[218px] w-[320px] items-center justify-center rounded-2xl bg-teal-500 px-6 text-sm opacity-90"
                        >
                            <p>Encontrarás un listado de todas nuestras aplicaciones disponibles en nuestra empresa.</p>
                        </div>
                        <img
                            class="h-[280px] w-[320px] rounded-2xl object-cover opacity-80"
                            src="./assets/bento-6.png"
                        />
                        <div
                            class="box-border flex h-[208px] w-[320px] items-center justify-center rounded-2xl bg-primary-600 px-6 text-sm opacity-90"
                        >
                            <p>
                                Aquí, tendrás el control total sobre tu perfil y acceso a las diversas secciones y
                                herramientas que necesitas para llevar a cabo tus responsabilidades de manera eficiente.
                            </p>
                        </div>
                        <img
                            class="h-[192px] w-[320px] rounded-2xl object-cover opacity-80"
                            src="./assets/bento-3.png"
                        />
                    </div>
                </div>
                <div class="flex shrink-0 flex-col justify-center gap-1.5 overflow-hidden">
                    <div class="space-y-1.5">
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-50"
                            src="./assets/bento-8.png"
                        />
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-80"
                            src="./assets/bento-9.png"
                        />
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-50"
                            src="./assets/bento-5.png"
                        />
                        <img
                            class="h-[320px] w-[380px] rounded-2xl object-cover opacity-80"
                            src="./assets/bento-8.png"
                        />
                    </div>
                </div>
            </div>
        </div>

        <section class="relative flex flex-1 flex-col items-center justify-center bg-white px-4 sm:px-16 lg:flex-none">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <VForm :route-param="route" />
            </div>

            <VFooter class="absolute bottom-0 py-6" />
        </section>
    </div>
</template>
