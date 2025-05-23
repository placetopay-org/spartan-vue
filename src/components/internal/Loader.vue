<script setup lang="ts">
withDefaults(
    defineProps<{
        variant?: 'spartan' | 'simple';
        size?: number;
        color?: string;
        backgroundColor?: string;
    }>(),
    {
        variant: 'spartan',
        size: 150,
        color: '#FF7E29',
        backgroundColor: '#ff7f29a1',
    },
);

defineOptions({ inheritAttrs: false });
</script>

<template>
    <svg v-if="variant === 'simple'" v-bind="$attrs" :width="size" :height="size" viewBox="20 20 60 60">
        <circle
            cx="50"
            cy="50"
            r="24"
            fill="none"
            stroke="#9ca3af"
            stroke-dasharray="113.0973 39.6991"
            stroke-width="6"
        >
            <animateTransform
                attributeName="transform"
                dur="1s"
                keyTimes="0;1"
                repeatCount="indefinite"
                type="rotate"
                values="0 50 50;360 50 50"
            />
        </circle>
    </svg>

    <svg v-if="variant === 'spartan'" v-bind="$attrs" :width="size" :height="size" viewBox="20 20 60 60">
        <circle cx="75" cy="50" :fill="backgroundColor" r="5">
            <animate
                attributeName="r"
                values="3;3;5;3;3"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.9166666666666666s"
            ></animate>
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
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
            <animate
                attributeName="fill"
                :values="
                    backgroundColor +
                    ';' +
                    backgroundColor +
                    ';' +
                    color +
                    ';' +
                    backgroundColor +
                    ';' +
                    backgroundColor
                "
                repeatCount="indefinite"
                times="0;0.1;0.2;0.3;1"
                dur="1s"
                begin="0s"
            ></animate>
        </circle>
    </svg>
</template>
