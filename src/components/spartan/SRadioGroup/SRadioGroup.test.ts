import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SRadioGroup from './SRadioGroup.vue';
import SRadioGroupItem from './SRadioGroupItem.vue';
import userEvent from '@testing-library/user-event';
import { h } from 'vue';

describe('SRadioGroup', () => {
    test('Throw warning for required v-model', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        render(SRadioGroup);

        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', () => {
        const option1 = h(
            SRadioGroupItem,
            { value: 'first' },
            { title: () => 'first', description: () => 'first description', footer: () => 'first footer' },
        );
        const option2 = h(
            SRadioGroupItem,
            { value: 'second' },
            { title: () => 'second', description: () => 'second description', footer: () => 'second footer' },
        );

        render(SRadioGroup, {
            props: { modelValue: 'first' },
            slots: { default: [option1, option2] },
        });

        screen.getByRole('radiogroup');
    });

    test('Can be checked', async () => {
        let modelValue = 'first';
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });
        const option3 = h(SRadioGroupItem, { value: 'third' }, { title: () => 'third' });

        const user = userEvent.setup();

        const { rerender } = render(SRadioGroup, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: { default: [option1, option2, option3] },
        });
        const op2 = screen.getByText('second');

        await user.click(op2);

        expect(modelValue).toEqual('second');
    });

    test('Renders title slot', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { title: () => 'My Title' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        expect(screen.getByText('My Title')).toBeTruthy();
    });

    test('Renders description slot', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { description: () => 'My Description' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        expect(screen.getByText('My Description')).toBeTruthy();
    });

    test('Renders footer slot', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { footer: () => 'My Footer' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        expect(screen.getByText('My Footer')).toBeTruthy();
    });

    test('Renders all slots together', () => {
        const option = h(
            SRadioGroupItem,
            { value: 'opt' },
            { title: () => 'Title', description: () => 'Description', footer: () => 'Footer' },
        );

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.getByText('Description')).toBeTruthy();
        expect(screen.getByText('Footer')).toBeTruthy();
    });

    test('Checked item shows check icon', async () => {
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: 'first' },
            slots: { default: [option1, option2] },
        });

        const icons = container.querySelectorAll('svg');
        expect(icons[0]?.classList.contains('opacity-0')).toBe(false);
        expect(icons[1]?.classList.contains('opacity-0')).toBe(true);
    });

    test('Unchecked item has correct border style', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { title: () => 'Option' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        const itemEl = container.querySelector('[role="radio"]')!;
        expect(itemEl.className).toContain('border-gray-300');
    });

    test('Checked item has primary border style', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { title: () => 'Option' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: 'opt' },
            slots: { default: [option] },
        });

        const itemEl = container.querySelector('[role="radio"]')!;
        expect(itemEl.className).toContain('border-spartan-primary-600');
    });

    test('Group disabled prop disables all items', () => {
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: '', disabled: true },
            slots: { default: [option1, option2] },
        });

        const items = container.querySelectorAll('[role="radio"]');
        expect(items[0]?.getAttribute('aria-disabled')).toBe('true');
        expect(items[1]?.getAttribute('aria-disabled')).toBe('true');
    });

    test('Item disabled prop disables individual item', () => {
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second', disabled: true }, { title: () => 'second' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option1, option2] },
        });

        const items = container.querySelectorAll('[role="radio"]');
        expect(items[0]?.getAttribute('aria-disabled')).not.toBe('true');
        expect(items[1]?.getAttribute('aria-disabled')).toBe('true');
    });

    test('Disabled item applies disabled styles', () => {
        const option = h(SRadioGroupItem, { value: 'opt', disabled: true }, { title: () => 'Option' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        const itemEl = container.querySelector('[role="radio"]')!;
        expect(itemEl.className).toContain('pointer-events-none');
        expect(itemEl.className).toContain('opacity-50');
    });

    test('Disabled item cannot be selected', async () => {
        let modelValue = 'first';
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second', disabled: true }, { title: () => 'second' });

        const user = userEvent.setup();

        render(SRadioGroup, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                },
            },
            slots: { default: [option1, option2] },
        });

        await user.click(screen.getByText('second'));

        expect(modelValue).toEqual('first');
    });

    test('Applies dark mode classes to item container', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { title: () => 'Option' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        const itemEl = container.querySelector('[role="radio"]')!;
        expect(itemEl.className).toContain('dark:bg-white/5');
        expect(itemEl.className).toContain('dark:border-white/10');
    });

    test('Applies dark mode classes to title', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { title: () => 'Dark Title' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        const title = screen.getByText('Dark Title');
        expect(title.className).toContain('dark:text-gray-50');
    });

    test('Applies dark mode classes to description', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { description: () => 'Dark Desc' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        const description = screen.getByText('Dark Desc');
        expect(description.className).toContain('dark:text-gray-400');
    });

    test('Applies dark mode classes to footer', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { footer: () => 'Dark Footer' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        const footer = screen.getByText('Dark Footer');
        expect(footer.className).toContain('dark:text-gray-50');
    });

    test('Multiple items can switch selection', async () => {
        let modelValue = 'first';
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });
        const option3 = h(SRadioGroupItem, { value: 'third' }, { title: () => 'third' });

        const user = userEvent.setup();

        const { rerender } = render(SRadioGroup, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: string) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: { default: [option1, option2, option3] },
        });

        await user.click(screen.getByText('second'));
        expect(modelValue).toEqual('second');

        await user.click(screen.getByText('third'));
        expect(modelValue).toEqual('third');
    });

    test('Emits update:modelValue event', async () => {
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });

        const user = userEvent.setup();

        const { emitted } = render(SRadioGroup, {
            props: { modelValue: 'first' },
            slots: { default: [option1, option2] },
        });

        await user.click(screen.getByText('second'));

        expect(emitted()['update:modelValue'][0]).toEqual(['second']);
    });

    test('Radio group has proper ARIA role', () => {
        const option = h(SRadioGroupItem, { value: 'opt' }, { title: () => 'Option' });

        render(SRadioGroup, {
            props: { modelValue: '' },
            slots: { default: [option] },
        });

        expect(screen.getByRole('radiogroup')).toBeTruthy();
    });

    test('Items have proper radio ARIA role', () => {
        const option1 = h(SRadioGroupItem, { value: 'first' }, { title: () => 'first' });
        const option2 = h(SRadioGroupItem, { value: 'second' }, { title: () => 'second' });

        const { container } = render(SRadioGroup, {
            props: { modelValue: 'first' },
            slots: { default: [option1, option2] },
        });

        const radios = container.querySelectorAll('[role="radio"]');
        expect(radios).toHaveLength(2);
        expect(radios[0]?.getAttribute('aria-checked')).toBe('true');
        expect(radios[1]?.getAttribute('aria-checked')).toBe('false');
    });
});
