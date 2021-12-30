<script lang="ts">
    import dragging from '@lib/actions/dragging/dragging';

    export let draggable: boolean;
    export let type: number;
    export let pieceImageUrls: { [key: number]: any };
</script>

<div
    class="chess-piece"
    style="background-image: url({pieceImageUrls[String(type)]});"
    use:dragging={{ useAction: draggable }}
    on:move-start
    on:move-end
/>

<style>
    .chess-piece {
        z-index: 10;

        width: var(--square-width);
        height: var(--square-height);
        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>
