import { test, describe } from 'vitest';
import { render, waitFor } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import SDefinitionTerm from './SDefinitionTerm.vue';
import userEvent from '@testing-library/user-event';

describe('SDefinitionTerm', () => {
    test('Can be rendered', () => {
        // Act
        render(SDefinitionTerm);

        // Assert
        screen.getByRole('definition');
    });

    test('Can be rendered with label and descriptions by props', () => {
        // Act
        render(SDefinitionTerm, { props: { labels: 'First Name', description: 'John Doe' } });
        const term = screen.getByRole('term');
        const definition = screen.getByRole('definition');

        // Assert
        expect(term).toHaveTextContent('First Name');
        expect(definition).toHaveTextContent('John Doe');
    });

    test('Can be rendered with label and descriptions by slots', () => {
        // Act
        render(SDefinitionTerm, { slots: { default: 'First Name', description: 'John Doe' } });
        const term = screen.getByRole('term');
        const definition = screen.getByRole('definition');

        // Assert
        expect(term).toHaveTextContent('First Name');
        expect(definition).toHaveTextContent('John Doe');
    });

    test('Can be rendered multiple labels by props', () => {
        // Act
        render(SDefinitionTerm, {
            props: { labels: ['Test label 1', 'Test label 2'], description: 'Test description' },
        });
        const terms = screen.getAllByRole('term');
        const definition = screen.getByRole('definition');

        // Assert
        expect(terms[0]).toHaveTextContent('Test label 1');
        expect(terms[1]).toHaveTextContent('Test label 2');
        expect(definition).toHaveTextContent('Test description');
    });

    test('Can be rendered multiple labels by slots', () => {
        // Act
        render(SDefinitionTerm, {
            slots: { '1': 'Test label 1', '2': 'Test label 2', description: 'Test description' },
        });
        const terms = screen.getAllByRole('term');
        const definition = screen.getByRole('definition');

        // Assert
        expect(terms[0]).toHaveTextContent('Test label 1');
        expect(terms[1]).toHaveTextContent('Test label 2');
        expect(definition).toHaveTextContent('Test description');
    });
});
