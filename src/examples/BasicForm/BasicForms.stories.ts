import PersonalInformationForm from './PersonalInformationForm.vue';
import NotificationsForm from './NotificationsForm.vue';
import { buildDesign } from '../../helpers';

export default {
    title: 'examples/BasicForms',
};

const design = buildDesign('');

export const PersonalInformation = {
    decorators: [() => ({ template: '<div style="width: 720px;"><story/></div>' })],
    render: (args: any) => ({
        components: { PersonalInformationForm },
        setup() {
            return { args };
        },
        template: `<PersonalInformationForm v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                code: `<script setup lang="ts">
                import { ref } from 'vue';
                import { SButton, SInputBlock, SSelectBlock } from '../../';
                
                const firstName = ref('');
                const lastName = ref('');
                const email = ref('');
                const country = ref('colombia');
                const streetAddress = ref('');
                const city = ref('');
                const state = ref('');
                const postalCode = ref('');
                </script>
                
                <template>
                    <div class="bg-gray-50 p-8 shadow-md">
                        <header class="mb-4">
                            <h1 class="text-base font-semibold text-gray-900">Información personal</h1>
                            <p class="mt-1 text-sm text-gray-600">Utilice una dirección permanente donde pueda recibir correo.</p>
                        </header>
                
                        <form class="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
                            <section class="grid grid-cols-6 gap-6">
                                <div class="col-span-3">
                                    <SInputBlock id="firstName" v-model="firstName" label="Nombre" />
                                </div>
                                <div class="col-span-3">
                                    <SInputBlock id="lastName" v-model="lastName" label="Apellido" />
                                </div>
                                <div class="col-span-6 max-w-sm">
                                    <SInputBlock id="email" v-model="email" label="Correo electrónico" />
                                </div>
                
                                <SSelectBlock id="country" v-model="country" label="País" class="col-span-6 max-w-sm">
                                    <option value="colombia">Colombia</option>
                                    <option value="puertoRico">Puerto Rico</option>
                                    <option value="ecuador">Ecuador</option>
                                </SSelectBlock>
                                <div class="col-span-6">
                                    <SInputBlock id="streetAddress" v-model="streetAddress" label="Dirección" />
                                </div>
                                <div class="col-span-2">
                                    <SInputBlock id="city" v-model="city" label="Ciudad" />
                                </div>
                                <div class="col-span-2">
                                    <SInputBlock id="state" v-model="state" label="Estado / Provincia" />
                                </div>
                                <div class="col-span-2">
                                    <SInputBlock id="postalCode" v-model="postalCode" label="Código postal" />
                                </div>
                            </section>
                
                            <hr class="my-8" />
                
                            <section class="flex justify-end gap-2">
                                <SButton variant="secondary"> Cancelar </SButton>
                                <SButton variant="primary"> Guardar </SButton>
                            </section>
                        </form>
                    </div>
                </template>
                `,
                type: 'dynamic',
                language: 'html',
            },
        },
    },
};

export const Notifications = {
    decorators: [() => ({ template: '<div style="width: 720px;"><story/></div>' })],
    render: (args: any) => ({
        components: { NotificationsForm },
        setup() {
            return { args };
        },
        template: `<NotificationsForm v-bind="args" v-model="args.modelValue"/>`,
    }),
    parameters: {
        design,
        docs: {
            canvas: { layout: 'centered' },
            source: {
                code: `<script setup lang="ts">
        import { ref } from 'vue';
        import { SButton, SInput } from '../../';
        
        const firstName = ref('');
        const lastName = ref('');
        const email = ref('');
        const country = ref('colombia');
        const streetAddress = ref('');
        const city = ref('');
        const state = ref('');
        const postalCode = ref('');
        </script>
        
        <template>
          <div class="bg-gray-50 p-8 shadow-md">
            <header class="mb-4">
              <h1 class="text-base font-semibold text-gray-900">Notificaciones</h1>
              <p class="mt-1 text-sm text-gray-600">Siempre te informaremos sobre cambios importantes, pero tú eliges qué más quieres escuchar.</p>
            </header>
        
            <form class="bg-white border border-gray-100 shadow-sm rounded-xl p-8">
              <section class="">
                <fieldset>
                      <legend class="text-sm font-semibold leading-6 text-gray-900">Por correo electrónico</legend>
                      <div class="mt-6 space-y-6">
                        <div class="relative flex gap-x-3">
                          <div class="flex h-6 items-center">
                            <SInput id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          </div>
                          <div class="text-sm leading-6">
                            <label for="comments" class="font-medium text-gray-900">Comentarios</label>
                            <p class="text-gray-500">Reciba notificaciones cuando alguien publique un comentario en una publicación.</p>
                          </div>
                        </div>
        
                        <div class="relative flex gap-x-3">
                          <div class="flex h-6 items-center">
                            <SInput id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          </div>
                          <div class="text-sm leading-6">
                            <label for="candidates" class="font-medium text-gray-900">Candidatos</label>
                            <p class="text-gray-500">Reciba notificaciones cuando un candidato solicite un trabajo.</p>
                          </div>
                        </div>
                        
                        <div class="relative flex gap-x-3">
                          <div class="flex h-6 items-center">
                            <SInput id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                          </div>
                          <div class="text-sm leading-6">
                            <label for="offers" class="font-medium text-gray-900">Ofertas</label>
                            <p class="text-gray-500">Reciba notificaciones cuando un candidato acepte o rechace una oferta.</p>
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
        `,
                type: 'dynamic',
                language: 'html',
            },
        },
    },
};
