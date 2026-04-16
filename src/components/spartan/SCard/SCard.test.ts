import { test, describe } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
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

    test('Renders title when provided', () => {
        render(SCard, { props: { title: 'Card Title' }, slots: { default: 'content' } });

        expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    test('Renders description slot', () => {
        render(SCard, {
            slots: { default: 'content', description: 'Card description' },
        });

        expect(screen.getByText('Card description')).toBeInTheDocument();
    });

    test('Renders closable button and emits close', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SCard, {
            props: { icon: 'danger', closable: true },
            slots: { default: 'content' },
        });

        const closeButton = screen.getByRole('button');
        await user.click(closeButton);

        expect(emitted()).toHaveProperty('close');
    });

    test('Renders with different icon types', () => {
        render(SCard, { props: { icon: 'warning' }, slots: { default: 'content' } });

        expect(screen.getByRole('article')).toBeInTheDocument();
    });

    test('Renders actions slot', () => {
        render(SCard, {
            slots: { default: 'content', actions: '<button>Action</button>' },
        });

        expect(screen.getByText('Action')).toBeInTheDocument();
    });
});
