import LoginPage from './LoginPage.vue';
import AuthPage from './AuthPage.vue';
import HomePage from './HomePage.vue';
import EditProfilePage from './EditProfilePage.vue';
import { LinkButton } from '@internal';
import { createDefault } from '@/helpers';

export default {
    title: 'examples/AccountsDemo/pages',
};

export const Login = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="login">
        <LoginPage route="login" />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const LoginUW = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="login">
        <LoginPage route="login" variant="uw" />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const LoginBento = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="login-bento">
        <LoginPage route="login" variant="bento" />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const Register = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LinkButton, LoginPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="register">
        <LoginPage route="signup" />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const RestorePassword = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LoginPage },
    args: {},
    template: `<LoginPage route="restore-password" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const OTP = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LoginPage },
    args: {},
    template: `<LoginPage route="otp" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const RecoveryCode = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full',
    components: { LoginPage },
    args: {},
    template: `<LoginPage route="recovery-code" />`,
    transform: () => `<script setup lang="ts">
    import VForm from './VForm.vue';
    import VFooter from './VFooter.vue';
    </script>
    
    <template>
        <div class="flex h-full w-full flex-1">
            <!-- Bento grid -->
    
            <section class="px-4 sm:px-16 flex flex-col justify-center items-center bg-white flex-1 relative">
                <div class="mx-auto w-full max-w-sm lg:w-96">
                    <VForm />
                </div>
    
                <VFooter class="absolute bottom-0 py-6" /> 
            </section>
        </div>
    </template>
    `
});

export const Auth = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full bg-white',
    components: { LinkButton, AuthPage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="auth">
    <AuthPage />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import { SPlacetopayLogo, SDropdown, SDropdownItem, SAvatar, SButton } from '@spartan';
    import { MessageText1Icon } from '@placetopay/iconsax-vue/twotone';
    import { ShieldTickIcon, ProfileCircleIcon } from '@placetopay/iconsax-vue/linear';
    import { ChevronDownIcon } from '@heroicons/vue/24/outline';
    import { ref } from 'vue';
    
    const langs = [
        'Español (Colombia)',
        'Español (Chile)',
        'Español (Panamá)',
        'Español (Puerto Rico)',
        'Inglés',
        'Portugués',
        'Francés',
    ]
    const lang = ref(0);
    </script>
    
    <template>
        <div class="container mx-auto h-full flex flex-col items-center">
            <div class="py-8 px-4 lg:px-0 flex-1 space-y-8 max-w-lg">
                <header class="gap-6 flex flex-col items-center">
                    <div class="border border-gray-200 rounded-full p-3">
                        <ShieldTickIcon class="h-8 w-8" />
                    </div>
                    <h1 class="text-2xl font-semibold text-gray-900">Autorizar Panel-dev</h1>
                </header>
    
                <main class="py-5 px-4 space-y-8 border border-gray-200 rounded-lg">
                    <section class="flex gap-3">
                        <SAvatar class="bg-gray-700 text-base font-semibold text-white" name="Jhon Doe"/>
                        <div class="text-sm space-y-2">
                            <span class="font-medium text-gray-900">Jhon Doe - jhon@example.com</span>
                            <p class="font-normal">
                                <span class="text-gray-900">Panel-dev </span>
                                <span class="text-gray-500">quiere acceder a su cuenta</span>
                            </p>
                        </div>
                    </section>
                    <section class="flex gap-3">
                        <ProfileCircleIcon class="h-10 w-10 text-gray-500"/>
                        <div class="text-sm space-y-2">
                            <span class="font-medium text-gray-900">Datos personales del usuario</span>
                            <div class="font-normal space-y-1">
                                <p class="text-gray-500">Al autorizar, <span class="text-gray-900">Panel-dev</span> podrá leer la información básica de tu perfil en <span class="text-gray-900">Placetopay Accounts</span>.</p>
                                <p class="text-gray-500">Puedes administrar tu cuenta de Placetopay Accounts en <span class="text-gray-900 underline">Editar Perfil</span>.</p>
                            </div>
                        </div>
                    </section>
                </main>
    
                <section class="space-y-7">
                    <div class="space-y-4">
                        <SButton class="w-full" variant="primary">Autorizar</SButton>
                        <SButton class="w-full" variant="secondary">Cancelar</SButton>
                    </div>
    
                    <p class="text-center text-sm text-gray-500 font-normal">Al autorizar, serás redireccionado a https://panel-co.placetopay.dev</p>
                </section>
            </div>
    
            <footer class="flex justify-center gap-8 py-6">
                <SPlacetopayLogo :height="24" />
                <SDropdown placement="top-start">
                    <template #reference>
                        <div class="flex items-center gap-1.5 text-sm font-medium text-gray-400">
                            <MessageText1Icon class="h-4 w-4" />
                            <span>{{ langs[lang] }}</span>
                            <ChevronDownIcon class="h-4 w-4" />
                        </div>
                    </template>
    
                    <SDropdownItem v-for="(item, index) in langs" @click="lang = index">{{ item }}</SDropdownItem>
                </SDropdown>
            </footer>
        </div>
    </template>
    `,
});

export const Home = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'h-full w-full bg-white',
    components: { LinkButton, HomePage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="home">
    <HomePage />
    </LinkButton>`,
    transform: () => `<script setup lang="ts">
    import { SSidebar, SSidebarItem, SSidebarSeparator, SAvatar, SButton, SCard } from '@spartan';
    import {
        HomeIcon,
        ShieldTickIcon,
        MonitorMobbileIcon,
        KeySquareIcon,
        CodeIcon,
        LockIcon,
        Setting2Icon,
        ProfileCircleIcon,
        RepeatIcon,
        FlagIcon,
        CalendarSearchIcon,
    } from '@placetopay/iconsax-vue/linear';
    
    import { ArrowRightIcon } from '@heroicons/vue/24/solid';
    </script>
    
    <template>
        <div class="flex h-full w-full">
            <SSidebar class="border-r border-gray-200" placetopay-header>
                <SSidebarItem :icon="HomeIcon">Inicio</SSidebarItem>
                <SSidebarItem :icon="ShieldTickIcon">Autenticación</SSidebarItem>
                <SSidebarItem :icon="MonitorMobbileIcon">Aplicaciones</SSidebarItem>
                <SSidebarItem :icon="KeySquareIcon">Sesiones de acceso</SSidebarItem>
    
                <SSidebarSeparator title="Administrador" />
    
                <SSidebarItem :icon="CodeIcon">Apps registradas</SSidebarItem>
                <SSidebarItem :icon="HomeIcon">Roles y permisos</SSidebarItem>
                <SSidebarItem :icon="ProfileCircleIcon">Usuarios</SSidebarItem>
                <SSidebarItem :icon="Setting2Icon">Configuración</SSidebarItem>
                <SSidebarItem :icon="LockIcon">Logs de seguridad</SSidebarItem>
            </SSidebar>
    
            <main class="relative flex flex-1 flex-col items-center">
                <div class="absolute inset-x-0 flex h-44 justify-between overflow-hidden">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" class="h-[150px] w-full blur-2xl">
                        <defs>
                            <pattern id="patt" x="0" y="0" width="1100" height="150" patternUnits="userSpaceOnUse">
                                <ellipse cx="0" cy="150" rx="500" ry="50" class="fill-primary-600/50" />
                                <ellipse cx="550" cy="0" rx="150" ry="50" class="fill-primary-600/30" />
                                <ellipse cx="850" cy="150" rx="100" ry="90" class="fill-primary-600/20" />
                            </pattern>
                        </defs>
    
                        <rect width="100%" height="100%" x="0" y="0" stroke="black" fill="url(#patt)" />
                    </svg>
                </div>
    
                <section class="mt-36 w-full space-y-8 px-10 max-w-6xl">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <SAvatar
                                class="h-32 w-32 border-4 border-white"
                                size="2xl"
                                borderless
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256"
                            />
    
                            <div>
                                <h1 class="text-2xl font-bold">John Doe</h1>
                                <p class="text-gray-500">john.doe@example.com</p>
                            </div>
                        </div>
    
                        <SButton class="h-8 px-3" variant="secondary">Editar perfil</SButton>
                    </div>
    
                    <div class="flex gap-4">
                        <div class="w-full rounded-xl border border-gray-200 overflow-hidden">
                            <header class="bg-gray-50 border-b border-gray-100 p-3 text-gray-900 flex gap-3 items-center">
                                <FlagIcon class="h-6 w-6 m-2"/>
    
                                <div class="text-xs flex flex-col">
                                    <span>Actual inicio de sesión desde</span>
                                    <span class="font-semibold">24 ago 2023, 15:19:59</span>
                                </div>
                            </header>
    
                            <ul class="divide-y px-4">
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Navegador</span>
                                    <span>Chrome 116.0.0</span>
                                </li>
    
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Dispositivo</span>
                                    <span>Computador</span>
                                </li>
    
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Sistema operativo</span>
                                    <span>Mac OS X 10.15.7</span>
                                </li>
    
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Ip</span>
                                    <span>2800:486:803:900:390d:c713:64a:6e82</span>
                                </li>
                            </ul>
                        </div>
    
                        <div class="w-full rounded-xl border border-gray-200 overflow-hidden">
                            <header class="bg-gray-50 border-b border-gray-100 p-3 text-gray-900 flex gap-3 items-center">
                                <CalendarSearchIcon class="h-6 w-6 m-2"/>
    
                                <div class="text-xs flex flex-col">
                                    <span>Último inicio de sesión desde</span>
                                    <span class="font-semibold">24 ago 2023, 15:19:59</span>
                                </div>
                            </header>
    
                            <ul class="divide-y px-4">
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Navegador</span>
                                    <span>Chrome 116.0.0</span>
                                </li>
    
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Dispositivo</span>
                                    <span>Computador</span>
                                </li>
    
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Sistema operativo</span>
                                    <span>Mac OS X 10.15.7</span>
                                </li>
    
                                <li class="flex justify-between py-3">
                                    <span class="text-gray-500 text-sm font">Ip</span>
                                    <span>2800:486:803:900:390d:c713:64a:6e82</span>
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <div class="flex gap-4">
                        <div class="flex flex-col w-full rounded-xl border border-gray-200 p-4">
                            <ShieldTickIcon class="h-6 w-6 mb-3"/>
                            <div class="flex-1 mb-2">
                                <h3 class="mb-1 text-gray-900 font-semibold text-base">Doble factor de autenticación</h3>
                                <p class="text-gray-600 text-xs font-normal">Autenticación de dos factores agrega una capa adicional de seguridad a tu cuenta</p>
                            </div>
                            
                            <footer class="flex justify-end">
                                <a href="#" class="flex gap-2 items-center text-primary-600 text-xs font-normal">
                                    <span class="whitespace-nowrap">Ver detalle</span>
                                    <ArrowRightIcon class="h-4 w-4" />
                                </a>
                            </footer>
                        </div>
    
                        <div class="flex flex-col w-full rounded-xl border border-gray-200 p-4">
                            <MonitorMobbileIcon class="h-6 w-6 mb-3"/>
                            <div class="flex-1 mb-2">
                                <h3 class="mb-1 text-gray-900 font-semibold text-base">Aplicaciones</h3>
                                <p class="text-gray-600 text-xs font-normal">Administra todas las cuentas vinculadas a la tuya en las que tienes autorización</p>
                            </div>
                            
                            <footer class="flex justify-end">
                                <a href="#" class="flex gap-2 items-center text-primary-600 text-xs font-normal">
                                    <span class="whitespace-nowrap">Ver detalle</span>
                                    <ArrowRightIcon class="h-4 w-4" />
                                </a>
                            </footer>
                        </div>
    
                        <div class="flex flex-col w-full rounded-xl border border-gray-200 p-4">
                            <RepeatIcon class="h-6 w-6 mb-3"/>
                            <div class="flex-1 mb-2">
                                <h3 class="mb-1 text-gray-900 font-semibold text-base">Registro de accesos</h3>
                                <p class="text-gray-600 text-xs font-normal">Supervisa tus sesiones para tener el control de quién y cuándo accede a tu cuenta</p>
                            </div>
                            
                            <footer class="flex justify-end">
                                <a href="#" class="flex gap-2 items-center text-primary-600 text-xs font-normal">
                                    <span class="whitespace-nowrap">Ver detalle</span>
                                    <ArrowRightIcon class="h-4 w-4" />
                                </a>
                            </footer>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </template>
    `,
});

export const EditProfile = createDefault({
    design: 'https://www.figma.com/file/L7Q1hYhhz42H3zHPngVnbw/Accounts-V2?type=design&node-id=408-1756',
    containerClass: 'bg-white min-h-full flex',
    components: { LinkButton, EditProfilePage },
    args: { buttonPreviewMode: true },
    template: `<LinkButton :mode="args.buttonPreviewMode" example="accountsdemo-pages" name="edit-profile">
    <EditProfilePage />
    </LinkButton>`,
    transform: () => ``,
});