import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SLabel from './SLabel.vue';

describe('SLabel', () => {
    test('Can be rendered', () => {
        // Act
        render(SLabel, { slots: { default: 'Test content' } });

        // Assert
        const label = screen.getByText('Test content');
        expect(label).toBeInTheDocument();
        expect(label).toHaveClass('mb-1 block text-sm font-medium text-gray-700');
    });

    test('Can be rendered in sr-only mode', () => {
        // Act
        render(SLabel, { props: { srOnly: true }, slots: { default: 'Test content' } });

        // Assert
        const label = screen.getByText('Test content');
        expect(label).toHaveClass('sr-only');
    });
});
