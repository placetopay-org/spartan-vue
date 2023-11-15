import { Comment, Text, type Slot, type VNode, Fragment } from 'vue';

function asArray<T>(arg: T | T[] | null) {
    return Array.isArray(arg) ? arg : arg !== null ? [arg] : [];
}

function isVNodeEmpty(vnode: VNode | VNode[] | undefined | null) {
    return (
        !vnode ||
        asArray(vnode).every(
            (vnode) =>
                vnode.type === Comment ||
                (vnode.type === Text && !vnode.children?.length) ||
                (vnode.type === Fragment && !vnode.children?.length),
        )
    );
}

function isSlotEmpty(slot: Slot | undefined | null, props: any = {}) {
    return isVNodeEmpty(slot?.(props));
}

export function hasSlotContent(slot: Slot | undefined | null, props: any = {}) {
    return !isSlotEmpty(slot, props);
}

// TODO: export const extractTextContent = https://play.vuejs.org/#eNqFVE1v2zAM/Susd7BTZPaG3lonQVd0X4etWAvsEOfgOUziTpYMSe7SBf7voyTLcdp0NeBEIh/Jxydau+CyruOHBoPzIFWFLGsNCnVTTzNeVrWQGnYgcQUtrKSoICRo2LuuRFV39jgxG5MpvOj9d6Vm2APsziMyXgiuNFRqDRNTIQo/I2MCfgrJlifhCDKeJo4RcaGNxqpmuUbaAaSmml3R2iaebgTLoUfBmw3mS5TTIv+Ff/M06cNTR8SlsaxpOfAH40ArIrcq1/G9EpyU2RlsFhSELRnK77UuiXwWnIP1GF9O3P98tTYtGxx7e7HB4vcR+73aGlsW3EhUKB8wC3qfzuUatXNf337DLa17ZyWWDSP0f5w/UAnWGI4O9qHhS6I9wFm2X+whlXx9p663GrnyTRmiBtlafBbQkRmZXmp9T/csPrNxGW9JRT8Qz0dLDoarUXjLhFZjuKNexmamKuS0+CjztVkdjh6FmtcNjzKBND4+RzS62DvdZFlIvMRV3jDd+c2bnHqkoKFkYh0Rfv5uEevHGmEymVg6o9dAniSN63OkjT5NfMlVwwujHuTqUsr8MSLdRiQjuYyQkrSRHKwrLoeQGdAfnNvfEyrKG8bIOKf9gszzhe2qPdSG2Mu80KaLK8HpeDWpERk5RjCZ7ssOOVuvd5QriE4cvqMWvqUvdxCmgYslmgPwHVl4r7HBJQl8Qg0l5ygNFxAroOlzkU9aP7CZJ67yOoqM+ZCzfwxF431yaMN8cbEp2VIih9mMGhh08HKSbgQHfR+L65zPdXbZfN2ZH75ZHI2cNj5D22ttm70XJY/C0GH600yS4QkdqWYGzY3f/r7sYgd3pi2Ubt5PU3NGkNA1SBtvlmTo1rXE6W53pM7Bl2Sbads0MXBXe3iB9lf90W+fcpQcb6SoVTQP9VaHC6vE6/xdvL30bRs8r3CSBe6qz4K+C4DdjvK2VsU9vG8ycYmGpNt/9rhakQ==
