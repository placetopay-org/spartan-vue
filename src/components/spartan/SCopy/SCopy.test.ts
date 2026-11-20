import { expect, test, describe, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import SCopy from './SCopy.vue';
import { h, defineComponent } from 'vue';

const clickCopyControl = async (user: ReturnType<typeof userEvent.setup>) => {
    await user.click(document.querySelector('[class*="cursor-pointer"]')!);
};

const stubExecCommand = (result: boolean | (() => boolean)) => {
    const execCommand = vi.fn(typeof result === 'function' ? result : () => result);

    Object.defineProperty(document, 'execCommand', {
        configurable: true,
        value: execCommand,
    });

    return execCommand;
};

afterEach(() => {
    vi.restoreAllMocks();
    Reflect.deleteProperty(document, 'execCommand');
});

describe('SCopy', () => {
    test('Can be rendered', () => {
        // Act
        render(SCopy, {
            slots: {
                default: 'Test Content',
            },
        });

        // Assert
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('Can copy a value from slot', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: 'Test Content',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        await waitFor(() => expect(emitted().copied[0]).toEqual(['Test Content']));
    });

    test('Can copy a value from prop', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: 'Test Content',
            },
            props: {
                value: 'Test from prop',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        await waitFor(() => expect(emitted().copied[0]).toEqual(['Test from prop']));
    });

    test('Can copy a value from slot scrapping', async () => {
        // Arrange
        const user = userEvent.setup();

        // Act
        const { emitted } = render(SCopy, {
            slots: {
                default: () => [h('div', [h('main', [h('span', 'Test Content')])])],
            },
            props: {
                value: 'Test from prop',
            },
        });

        const element = screen.getByText('Test Content');
        await user.click(element);

        // Assert
        await waitFor(() => expect(emitted().copied[0]).toEqual(['Test from prop']));
    });

    test('Resets copying state after timeout', async () => {
        vi.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

        const { emitted } = render(SCopy, {
            slots: { default: 'Copy me' },
        });

        await user.click(screen.getByText('Copy me'));
        await waitFor(() => expect(emitted().copied[0]).toEqual(['Copy me']));

        vi.advanceTimersByTime(3100);
        vi.useRealTimers();
    });

    test('Copies empty string when no value and no slot content', async () => {
        const user = userEvent.setup();

        const { emitted } = render(SCopy);

        await clickCopyControl(user);

        await waitFor(() => expect(emitted().copied[0]).toEqual(['']));
    });

    test('Falls back to slot.el.innerText for non-string slot children', async () => {
        const user = userEvent.setup();

        const NestedComponent = defineComponent({
            render() {
                return h('div', 'Nested Text');
            },
        });

        const { emitted } = render(SCopy, {
            slots: {
                default: () => [h(NestedComponent)],
            },
        });

        await clickCopyControl(user);

        await waitFor(() => expect(emitted().copied).toBeTruthy());

        const copied = emitted().copied[0][0];
        expect(typeof copied).toBe('string');
    });
});

describe('SCopy clipboard failures', () => {
    test('Uses the fallback and emits copied when the Clipboard API rejects', async () => {
        // Arrange
        const user = userEvent.setup();
        vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(
            new DOMException('Clipboard write is not allowed.', 'NotAllowedError'),
        );
        const execCommand = stubExecCommand(true);

        const { emitted } = render(SCopy, {
            props: { value: 'Fallback value' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => expect(emitted().copied[0]).toEqual(['Fallback value']));
        expect(execCommand).toHaveBeenCalledWith('copy');
        expect(emitted().failed).toBeUndefined();
    });

    test('Emits failed and does not emit copied when the Clipboard API and fallback fail', async () => {
        // Arrange
        const user = userEvent.setup();
        const rejection = new DOMException('Clipboard write is not allowed.', 'NotAllowedError');
        vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(rejection);
        stubExecCommand(false);

        const { emitted } = render(SCopy, {
            props: { value: 'Never copied' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => {
            const [error] = emitted().failed[0];

            expect(error).toBeInstanceOf(Error);
            expect(error.message).toBe(rejection.message);
        });
        expect(emitted().copied).toBeUndefined();
    });

    test('Uses the fallback when the Clipboard API is unavailable', async () => {
        // Arrange
        const user = userEvent.setup();
        vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined);
        const execCommand = stubExecCommand(true);

        const { emitted } = render(SCopy, {
            props: { value: 'No Clipboard API' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => expect(emitted().copied[0]).toEqual(['No Clipboard API']));
        expect(execCommand).toHaveBeenCalledWith('copy');
    });

    test('Emits failed when the Clipboard API is unavailable and the fallback fails', async () => {
        // Arrange
        const user = userEvent.setup();
        vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined);
        stubExecCommand(false);

        const { emitted } = render(SCopy, {
            props: { value: 'Never copied' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => expect(emitted().failed[0][0]).toBeInstanceOf(Error));
        expect(emitted().copied).toBeUndefined();
    });

    test('Emits failed when no clipboard API is available', async () => {
        // Arrange
        const user = userEvent.setup();
        vi.spyOn(navigator, 'clipboard', 'get').mockReturnValue(undefined);

        const { emitted } = render(SCopy, {
            props: { value: 'Never copied' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => expect(emitted().failed[0][0]).toBeInstanceOf(Error));
        expect(emitted().copied).toBeUndefined();
    });

    test('Emits failed when the fallback throws', async () => {
        // Arrange
        const user = userEvent.setup();
        vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('Clipboard denied'));
        stubExecCommand(() => {
            throw new Error('execCommand is not supported');
        });

        const { emitted } = render(SCopy, {
            props: { value: 'Never copied' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => expect(emitted().failed[0][0]).toBeInstanceOf(Error));
        expect(emitted().copied).toBeUndefined();
    });

    test('Normalizes a non-Error rejection before emitting failed', async () => {
        // Arrange
        const user = userEvent.setup();
        vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce('Clipboard denied');
        stubExecCommand(false);

        const { emitted } = render(SCopy, {
            props: { value: 'Never copied' },
        });

        // Act
        await clickCopyControl(user);

        // Assert
        await waitFor(() => expect(emitted().failed[0][0]).toBeInstanceOf(Error));
        expect((emitted().failed[0][0] as Error).message).toBe('Clipboard write failed');
    });
});
