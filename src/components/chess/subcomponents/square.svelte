<script lang="ts">
    export let width: number;
    export let height: number;
    export let isDarkSquare: boolean;
    export let hasHighlight: boolean;
    export let hasBorder: boolean;
</script>

<div
    style="width: {width}px; height: {height}px"
    class="square {isDarkSquare ? 'dark-square' : 'light-square'}"
    class:highlight={hasHighlight}
    class:border={hasBorder}
>
    <slot />
</div>

<style>
    .square {
        user-select: none;
        box-sizing: border-box;
    }
    .square.light-square {
        background-color: var(--light-square-color, #fce4b2);
    }
    .square.dark-square {
        background-color: var(--dark-square-color, #d08b18);
    }
    .square.light-square.highlight {
        background-color: var(--light-square-highlight, #fdf158);
    }
    .square.dark-square.highlight {
        background-color: var(--dark-square-highlight, #e7c50b);
    }
    .square.border {
        /* what a hack */
        outline-color: var(--square-outline-color, white);
        outline-width: var(--square-outline-width, 10px);
        outline-style: solid;
        outline-offset: calc(var(--square-outline-width, 10px) * -1);
    }
</style>
