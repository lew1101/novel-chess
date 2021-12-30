<script lang="ts">
    export let isDarkSquare: boolean;
    export let hasHighlight: boolean;
    export let hasBorder: boolean;
</script>

<div
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

        width: var(--square-width);
        height: var(--square-height);
    }
    .square.light-square {
        background-color: var(--light-square-color);
    }
    .square.dark-square {
        background-color: var(--dark-square-color);
    }
    .square.light-square.highlight {
        background-color: var(--light-square-highlight);
    }
    .square.dark-square.highlight {
        background-color: var(--dark-square-highlight);
    }
    .square.border {
        /* what a hack */
        outline-color: var(--square-outline-color);
        outline-width: var(--square-outline-width);
        outline-style: solid;
        outline-offset: calc(var(--square-outline-width) * -1);
    }
</style>
