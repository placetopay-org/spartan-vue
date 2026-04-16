import { test, describe, vi } from 'vitest';
import { render } from '@testing-library/vue';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import SModalConfirm from './SModalConfirm.vue';

describe('SModalConfirm', () => {
    const resizeObserverMock = () => {
        window.ResizeObserver = vi.fn(() => ({
            observe: vi.fn(),
            unobserve: vi.fn(),
            disconnect: vi.fn(),
        }));
    };

    test('Does not render content when closed', () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: false, description: 'Are you sure?' },
        });

        expect(screen.queryByText('Are you sure?')).not.toBeInTheDocument();
    });

    test('Renders description when open', async () => {
        resizeObserverMock();

        const { rerender } = render(SModalConfirm, {
            props: { open: false, description: 'Are you sure?' },
        });

        await rerender({ open: true, description: 'Are you sure?' });

        expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    });

    test('Renders default title from i18n', async () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: true, description: 'Test' },
        });

        expect(screen.getByText('$spartan.modalConfirm.title')).toBeInTheDocument();
    });

    test('Renders custom title', async () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: true, description: 'Test', title: 'Custom Title' },
        });

        expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    test('Renders default confirm and cancel button text from i18n', async () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: true, description: 'Test' },
        });

        expect(screen.getByText('$spartan.modalConfirm.confirmText')).toBeInTheDocument();
        expect(screen.getByText('$spartan.modalConfirm.cancelText')).toBeInTheDocument();
    });

    test('Renders custom confirm and cancel button text', async () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: true, description: 'Test', confirmText: 'Yes', cancelText: 'No' },
        });

        expect(screen.getByText('Yes')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    test('Emits confirm and update:open when confirm button is clicked', async () => {
        resizeObserverMock();
        const user = userEvent.setup();

        const { emitted } = render(SModalConfirm, {
            props: { open: true, description: 'Test', confirmText: 'Yes' },
        });

        await user.click(screen.getByText('Yes'));

        expect(emitted()).toHaveProperty('confirm');
        expect(emitted()['update:open']).toEqual([[false]]);
    });

    test('Emits update:open when cancel button is clicked', async () => {
        resizeObserverMock();
        const user = userEvent.setup();

        const { emitted } = render(SModalConfirm, {
            props: { open: true, description: 'Test', cancelText: 'No' },
        });

        await user.click(screen.getByText('No'));

        expect(emitted()['update:open']).toEqual([[false]]);
    });

    test('Renders custom content via default slot', async () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: true, description: 'Fallback text' },
            slots: { default: '<p>Custom slot content</p>' },
        });

        expect(screen.getByText('Custom slot content')).toBeInTheDocument();
        expect(screen.queryByText('Fallback text')).not.toBeInTheDocument();
    });

    test('Renders with icon', async () => {
        resizeObserverMock();

        render(SModalConfirm, {
            props: { open: true, description: 'Test', icon: 'warning' },
        });

        expect(screen.getByText('$spartan.modalConfirm.title')).toBeInTheDocument();
    });
});
