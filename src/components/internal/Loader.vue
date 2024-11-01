<script setup lang="ts">
withDefaults(defineProps<{
    size?: number;
    color?: string;
    backgroundColor?: string;
}>(), {
    size: 150,
    color: 'rgb(var(--color-spartan-primary-600))',
    backgroundColor: 'rgb(var(--color-spartan-primary-600))',
});
</script>

<template>
    <svg :width="size" :height="size" viewBox="20 20 60 60">
        <circle cx="75" cy="50" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.9166666666666666s"
            ></animate>
        </circle>
        <circle cx="71.65063509461098" cy="62.5" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.8333333333333334s"
            ></animate>
        </circle>
        <circle cx="62.5" cy="71.65063509461096" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.75s"
            ></animate>
        </circle>
        <circle cx="50" cy="75" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.6666666666666666s"
            ></animate>
        </circle>
        <circle cx="37.50000000000001" cy="71.65063509461098" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.5833333333333334s"
            ></animate>
        </circle>
        <circle cx="28.34936490538903" cy="62.5" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.5s"
            ></animate>
        </circle>
        <circle cx="25" cy="50" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.4166666666666667s"
            ></animate>
        </circle>
        <circle cx="28.34936490538903" cy="37.50000000000001" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.3333333333333333s"
            ></animate>
        </circle>
        <circle cx="37.499999999999986" cy="28.349364905389038" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.25s"
            ></animate>
        </circle>
        <circle cx="49.99999999999999" cy="25" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.16666666666666666s"
            ></animate>
        </circle>
        <circle cx="62.5" cy="28.349364905389034" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.08333333333333333s"
            ></animate>
        </circle>
        <circle cx="71.65063509461096" cy="37.499999999999986" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="0s"
            ></animate>
        </circle>
    </svg>
</template>
