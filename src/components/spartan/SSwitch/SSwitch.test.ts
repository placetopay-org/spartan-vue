import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SSwitch from './SSwitch.vue';
import userEvent from '@testing-library/user-event';
import {
    switchContainerStyles,
    switchTrackStyles,
    switchKnobStyles,
    switchLabelStyles,
    switchDescriptionStyles,
} from './styles';

describe('SSwitch', () => {
    test('Throw warning for required "model-value"', () => {
        // Arrange
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

        // Act
        render(SSwitch);

        // Assert
        expect(warn).toHaveBeenCalledOnce();
        expect(warn.mock.calls[0][0]).contains('[Vue warn]: Missing required prop: "modelValue"');
    });

    test('Can be rendered', () => {
        // Act
        render(SSwitch);

        // Assert
        screen.getByRole('switch');
    });

    test('Can be rendered with label', () => {
        // Act
        render(SSwitch, { slots: { default: 'Test label' } });
        const label = screen.getByText('Test label');

        // Assert
        expect(label).toHaveAttribute('id');
        expect(label).toHaveClass(switchLabelStyles());
    });

    test('Can be rendered with description', () => {
        // Act
        render(SSwitch, { slots: { description: 'Test description' } });
        const description = screen.getByText('Test description');

        // Assert
        expect(description).toHaveClass(switchDescriptionStyles());
    });

    test('Can be rendered with label and description', () => {
        // Act
        render(SSwitch, { slots: { default: 'Test label', description: 'Test description' } });
        const label = screen.getByText('Test label');
        const description = screen.getByText('Test description');

        // Assert
        expect(label).toHaveAttribute('id');
        expect(label).toHaveClass(switchLabelStyles());
        expect(description).toHaveClass(switchDescriptionStyles());
    });

    test('Can be change clicking in label or description', async () => {
        // Arrange
        let modelValue = false;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SSwitch, {
            props: {
                modelValue,
                'onUpdate:modelValue': (e: boolean) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: { default: 'Test label', description: 'Test description' },
        });

        const button = screen.getByRole('switch');
        const label = screen.getByText('Test label');
        const description = screen.getByText('Test description');

        // Assert
        await user.click(button);
        expect(button).toHaveAttribute('aria-checked', 'true');

        await user.click(label);
        expect(button).toHaveAttribute('aria-checked', 'false');

        await user.click(description);
        expect(button).toHaveAttribute('aria-checked', 'true');
    });

    test('Can be rendered in passive mode', async () => {
        // Arrange
        let modelValue = false;
        const user = userEvent.setup();

        // Act
        const { rerender } = render(SSwitch, {
            props: {
                passive: true,
                modelValue,
                'onUpdate:modelValue': (e: boolean) => {
                    modelValue = e;
                    rerender({ modelValue });
                },
            },
            slots: { default: 'Test label', description: 'Test description' },
        });

        const button = screen.getByRole('switch');
        const label = screen.getByText('Test label');
        const description = screen.getByText('Test description');

        await user.click(label);
        await user.click(description);

        // Assert
        expect(button).toHaveAttribute('aria-checked', 'false');
    });

    test('Can be rendered in reverse mode', async () => {
        // Act
        const { container } = render(SSwitch, {
            props: { reverse: true },
            slots: { default: 'Test label', description: 'Test description' },
        });

        // Assert
        expect(container.firstElementChild).toHaveClass(switchContainerStyles({ reverse: true }));
    });

    test('Can be rendered with default icon', async () => {
        // Act
        render(SSwitch, { props: { icon: true }, slots: { default: 'Test label', description: 'Test description' } });

        const button = screen.getByRole('switch');

        // Assert
        expect(button.firstElementChild?.firstElementChild?.firstElementChild).toHaveClass('h-3 w-3 text-gray-400');
    });

    test('Has dark mode classes on track', () => {
        // Act
        render(SSwitch);
        const button = screen.getByRole('switch');

        // Assert
        const trackClasses = switchTrackStyles({ active: false });
        expect(trackClasses).toContain('dark:bg-gray-900');
        expect(button).toHaveClass(trackClasses);
    });

    test('Has dark mode classes on label and description', () => {
        // Act
        render(SSwitch, { slots: { default: 'Label', description: 'Description' } });
        const label = screen.getByText('Label');
        const description = screen.getByText('Description');

        // Assert
        expect(label.className).toContain('dark:text-gray-50');
        expect(description.className).toContain('dark:text-gray-400');
    });

    test('Track styles change when active', () => {
        // Act
        let modelValue = true;
        render(SSwitch, {
            props: { modelValue },
            slots: { default: 'Label' },
        });

        const button = screen.getByRole('switch');

        // Assert
        expect(button).toHaveClass(switchTrackStyles({ active: true }));
    });

    test('Knob translates when active', () => {
        // Assert
        const activeKnob = switchKnobStyles({ active: true });
        const inactiveKnob = switchKnobStyles({ active: false });

        expect(activeKnob).toContain('translate-x-5');
        expect(inactiveKnob).toContain('translate-x-0');
    });

    test('Can be rendered with custom iconOn and iconOff components', async () => {
        // Arrange
        const IconOff = { template: '<svg data-testid="icon-off"></svg>' };
        const IconOn = { template: '<svg data-testid="icon-on"></svg>' };

        // Act
        render(SSwitch, {
            props: { iconOff: IconOff, iconOn: IconOn },
            slots: { default: 'Label' },
        });

        // Assert
        screen.getByTestId('icon-off');
        screen.getByTestId('icon-on');
    });
});
