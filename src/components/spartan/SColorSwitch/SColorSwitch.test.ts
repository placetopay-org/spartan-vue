import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SColorSwitch from './SColorSwitch.vue';

describe('SColorSwitch', () => {
    test('renders three radio buttons', () => {
        render(SColorSwitch);

        const radios = screen.getAllByRole('radio');
        expect(radios).toHaveLength(3);
    });

    test('renders with default system mode selected', () => {
        render(SColorSwitch);

        const systemButton = screen.getByRole('radio', { name: 'System' });
        expect(systemButton).toHaveAttribute('aria-checked', 'true');

        const lightButton = screen.getByRole('radio', { name: 'Light' });
        expect(lightButton).toHaveAttribute('aria-checked', 'false');

        const darkButton = screen.getByRole('radio', { name: 'Dark' });
        expect(darkButton).toHaveAttribute('aria-checked', 'false');
    });

    test('renders with light mode selected', () => {
        render(SColorSwitch, { props: { modelValue: 'light' } });

        expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'true');
        expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'false');
    });

    test('renders with dark mode selected', () => {
        render(SColorSwitch, { props: { modelValue: 'dark' } });

        expect(screen.getByRole('radio', { name: 'System' })).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('radio', { name: 'Light' })).toHaveAttribute('aria-checked', 'false');
        expect(screen.getByRole('radio', { name: 'Dark' })).toHaveAttribute('aria-checked', 'true');
    });

    test('emits update:modelValue when clicking a mode button', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SColorSwitch, { props: { modelValue: 'system' } });

        await user.click(screen.getByRole('radio', { name: 'Dark' }));

        expect(emitted()['update:modelValue']).toEqual([['dark']]);
    });

    test('emits correct value for each mode', async () => {
        const user = userEvent.setup();
        const { emitted } = render(SColorSwitch, { props: { modelValue: 'system' } });

        await user.click(screen.getByRole('radio', { name: 'Light' }));
        await user.click(screen.getByRole('radio', { name: 'Dark' }));
        await user.click(screen.getByRole('radio', { name: 'System' }));

        expect(emitted()['update:modelValue']).toEqual([['light'], ['dark'], ['system']]);
    });

    test('has radiogroup role on container', () => {
        render(SColorSwitch);

        expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    test('container has aria-label', () => {
        render(SColorSwitch);

        expect(screen.getByRole('radiogroup')).toHaveAttribute('aria-label', 'Color mode');
    });

    test('active button has highlighted styles', () => {
        render(SColorSwitch, { props: { modelValue: 'light' } });

        const lightButton = screen.getByRole('radio', { name: 'Light' });
        expect(lightButton.className).toContain('bg-white');
        expect(lightButton.className).toContain('shadow-sm');
    });

    test('inactive buttons do not have highlighted styles', () => {
        render(SColorSwitch, { props: { modelValue: 'light' } });

        const systemButton = screen.getByRole('radio', { name: 'System' });
        expect(systemButton.className).not.toContain('bg-white');
        expect(systemButton.className).not.toContain('shadow-sm');
    });
});
