export const focusFirstChild = (e: Event | HTMLElement | null, asElement?: boolean) => {
    if (!e) return;
    let element;
    if (asElement) element = e as HTMLElement;
    else element = (e as Event).target as HTMLElement;

    (element.firstElementChild as HTMLElement)?.focus();
};
