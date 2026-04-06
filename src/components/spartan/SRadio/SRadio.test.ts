import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SRadio from './SRadio.vue';
import userEvent from '@testing-library/user-event';

describe('SRadio', () => {
    test('Throw warning for required v-model and value', () => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        render(SRadio);

        expect(warn).toHaveBeenCalledTimes(2);
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
        expect(warn.mock.calls[1][0]).contains('[Vue warn]: Missing required prop: "value"');
    });

    test('Can be rendered', () => {
        render(SRadio);
        screen.getByRole('radio');
    });

    test('Can be checked', async () => {
        const user = userEvent.setup();
        render(SRadio, { props: { modelValue: '', value: 'option1' } });
        const radio = screen.getByRole('radio');

        await user.click(radio);

        expect(radio).toBeChecked();
    });

    test('Can be checked with group', async () => {
        const user = userEvent.setup();
        render(SRadio, { slots: { default: 'first' }, props: { value: 'first', modelValue: '', name: 'group' } });
        render(SRadio, { slots: { default: 'second' }, props: { value: 'second', modelValue: '', name: 'group' } });

        const firstRadio = screen.getByRole('radio', { name: 'first' });
        const secondRadio = screen.getByRole('radio', { name: 'second' });

        await user.click(firstRadio);
        await user.click(secondRadio);

        expect(firstRadio).not.toBeChecked();
        expect(secondRadio).toBeChecked();
    });

    test('Renders disabled state', () => {
        const { container } = render(SRadio, { props: { disabled: true, modelValue: '', value: 'opt' } });

        const radio = screen.getByRole('radio');
        expect(radio).toBeDisabled();
        expect(container.firstElementChild?.className).toContain('pointer-events-none');
        expect(container.firstElementChild?.className).toContain('opacity-50');
    });

    test('Renders reverse layout', () => {
        const { container } = render(SRadio, {
            props: { reverse: true, modelValue: '', value: 'opt' },
            slots: { default: 'Label' },
        });

        expect(container.firstElementChild?.className).toContain('flex-row-reverse');
        expect(container.firstElementChild?.className).toContain('justify-between');
    });

    test('Renders label slot', () => {
        render(SRadio, {
            props: { modelValue: '', value: 'opt' },
            slots: { default: 'My Label' },
        });

        expect(screen.getByText('My Label')).toBeTruthy();
    });

    test('Renders description slot', () => {
        render(SRadio, {
            props: { modelValue: '', value: 'opt' },
            slots: { description: 'My Description' },
        });

        expect(screen.getByText('My Description')).toBeTruthy();
    });

    test('Renders both label and description', () => {
        render(SRadio, {
            props: { modelValue: '', value: 'opt' },
            slots: { default: 'Label Text', description: 'Description Text' },
        });

        expect(screen.getByText('Label Text')).toBeTruthy();
        expect(screen.getByText('Description Text')).toBeTruthy();
    });

    test('Label has for attribute matching radio id', () => {
        render(SRadio, {
            props: { id: 'test-id', modelValue: '', value: 'opt' },
            slots: { default: 'Label' },
        });

        const radio = screen.getByRole('radio');
        const label = screen.getByText('Label');

        expect(radio.id).toBe('test-id');
        expect(label.closest('label')?.getAttribute('for')).toBe('test-id');
    });

    test('Generates id when not provided', () => {
        render(SRadio, {
            props: { modelValue: '', value: 'opt' },
            slots: { default: 'Label' },
        });

        const radio = screen.getByRole('radio');
        expect(radio.id).toBeTruthy();
    });

    test('Renders name attribute', () => {
        render(SRadio, { props: { name: 'my-radio', modelValue: '', value: 'opt' } });

        const radio = screen.getByRole('radio');
        expect(radio.getAttribute('name')).toBe('my-radio');
    });

    test('Inline mode renders label inside description', () => {
        render(SRadio, {
            props: { inline: true, modelValue: '', value: 'opt' },
            slots: { default: 'Inline Label', description: 'Inline Description' },
        });

        const description = screen.getByText('Inline Description');
        const label = screen.getByText('Inline Label');

        expect(description.closest('p')?.contains(label.closest('label'))).toBe(true);
    });

    test('Non-inline mode renders label separately from description', () => {
        render(SRadio, {
            props: { inline: false, modelValue: '', value: 'opt' },
            slots: { default: 'Separate Label', description: 'Separate Description' },
        });

        const description = screen.getByText('Separate Description');
        const label = screen.getByText('Separate Label');

        expect(description.closest('p')?.contains(label.closest('label'))).toBe(false);
    });

    test('Inline mode adds margin between label and description', () => {
        render(SRadio, {
            props: { inline: true, modelValue: '', value: 'opt' },
            slots: { default: 'Label', description: 'Description' },
        });

        const label = screen.getByText('Label').closest('label');
        expect(label?.className).toContain('mr-1');
    });

    test('Applies dark mode classes to input', () => {
        const { container } = render(SRadio, { props: { modelValue: '', value: 'opt' } });
        const radio = container.querySelector('input[type="radio"]');

        expect(radio?.className).toContain('dark:border-white/10');
        expect(radio?.className).toContain('dark:bg-white/5');
    });

    test('Applies dark mode classes to label', () => {
        render(SRadio, {
            props: { modelValue: '', value: 'opt' },
            slots: { default: 'Dark Label' },
        });
        const label = screen.getByText('Dark Label').closest('label');

        expect(label?.className).toContain('dark:text-gray-50');
    });

    test('Applies dark mode classes to description', () => {
        render(SRadio, {
            props: { modelValue: '', value: 'opt' },
            slots: { description: 'Dark Description' },
        });
        const description = screen.getByText('Dark Description').closest('p');

        expect(description?.className).toContain('dark:text-gray-400');
    });

    test('Emits value when selected', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SRadio, {
            props: { modelValue: '', value: 'option1' },
        });

        await user.click(screen.getByRole('radio'));

        expect(emitted()['update:modelValue'][0]).toEqual(['option1']);
    });
});
