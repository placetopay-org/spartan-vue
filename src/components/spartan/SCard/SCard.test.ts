import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SCard from './SCard.vue';

describe('SCard', () => {
    test('Can be rendered', () => {
        // Act
        render(SCard, { slots: { default: 'test content' } });

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card).toBeInTheDocument();
    });

    test('Can be render with small size', () => {
        // Act
        render(SCard, { props: { size: 'sm' }, slots: { default: 'test content' } });

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card).toHaveClass('rounded-md');
    });

    test('Can be render with icon', () => {
        // Act
        render(SCard, { props: { icon: 'success' }, slots: { default: 'test content' } });

        // Assert
        screen.getByText('test content');
        const card = screen.getByRole('article');
        expect(card?.firstElementChild?.firstElementChild?.firstElementChild).toHaveClass('h-6 w-6 text-green-600');
    });
});
