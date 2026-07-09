<script setup lang="ts">
import { onMounted, ref } from 'vue';

type ConfettiPiece = {
    id: number;
    color: string;
    left: string;
    delay: string;
    duration: string;
    size: string;
    rotation: string;
    drift: string;
};

const STORAGE_KEY = 'spartan-docs-confetti-seen';
const colors = [
    '#00a35c',
    '#24c875',
    '#006f43',
    '#ff8a00',
    '#f05a24',
    '#ffb347',
    '#ffffff',
    '#f4f4f5',
    '#18181b',
    '#3f3f46',
];

const visible = ref(false);
const pieces = ref<ConfettiPiece[]>([]);

function hasSeenConfetti(): boolean {
    try {
        return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
        return false;
    }
}

function markConfettiSeen() {
    try {
        localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
}

function createPieces(): ConfettiPiece[] {
    return Array.from({ length: 72 }, (_, id) => ({
        id,
        color: colors[id % colors.length],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.45}s`,
        duration: `${2.3 + Math.random() * 1.4}s`,
        size: `${6 + Math.random() * 6}px`,
        rotation: `${Math.random() * 360}deg`,
        drift: `${(Math.random() - 0.5) * 240}px`,
    }));
}

onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        markConfettiSeen();
        return;
    }

    if (hasSeenConfetti()) return;

    markConfettiSeen();
    pieces.value = createPieces();
    visible.value = true;

    window.setTimeout(() => {
        visible.value = false;
    }, 4200);
});
</script>

<template>
    <Teleport to="body">
        <div v-if="visible" class="pointer-events-none fixed inset-0 z-[100] overflow-hidden" aria-hidden="true">
            <span
                v-for="piece in pieces"
                :key="piece.id"
                class="confetti-piece"
                :style="{
                    '--confetti-color': piece.color,
                    '--confetti-left': piece.left,
                    '--confetti-delay': piece.delay,
                    '--confetti-duration': piece.duration,
                    '--confetti-size': piece.size,
                    '--confetti-rotation': piece.rotation,
                    '--confetti-drift': piece.drift,
                }"
            />
        </div>
    </Teleport>
</template>

<style scoped>
.confetti-piece {
    position: absolute;
    top: -16px;
    left: var(--confetti-left);
    width: var(--confetti-size);
    height: calc(var(--confetti-size) * 1.7);
    border-radius: 2px;
    background: var(--confetti-color);
    opacity: 0;
    transform: translate3d(0, 0, 0) rotate(var(--confetti-rotation));
    animation: spartan-confetti-fall var(--confetti-duration) cubic-bezier(0.2, 0.7, 0.2, 1) var(--confetti-delay)
        forwards;
}

@keyframes spartan-confetti-fall {
    0% {
        opacity: 0;
        transform: translate3d(0, -20px, 0) rotate(var(--confetti-rotation));
    }

    12% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translate3d(var(--confetti-drift), 110vh, 0) rotate(calc(var(--confetti-rotation) + 720deg));
    }
}
</style>
