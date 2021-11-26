<script lang="ts">
    export let color: "light" | "dark";
    export let isHighlighted: boolean = false;
    export let index: number;
</script>

<div
    class="chess-square"
    class:dark-square={color === "dark"}
    class:light-square={color === "light"}
    class:highlight-square={isHighlighted}
    data-square={index}
>
    <slot />
</div>

<style>
    .chess-square {
        user-select: none;
        box-sizing: border-box;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .chess-square.dark-square {
        background-color: #d08b18;
    }

    .chess-square.light-square {
        background-color: #fce4b2;
    }

    .chess-square.light-square.highlight-square {
        background-color: #fdf158;
    }

    .chess-square.dark-square.highlight-square {
        background-color: #e7c50b;
    }

    .chess-square.dragged-over-square {
        border: solid 20%;
    }
</style>
