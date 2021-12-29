<script lang="ts">
    import dragging from '@lib/actions/dragging/dragging';
    import type { Piece } from '@lib/chess/chess';

    export let width: number;
    export let height: number;
    export let draggable: boolean;
    export let type: Piece;
    export let pieceImageUrls: { [key: number]: any };
</script>

<div
    class="chess-piece"
    style="background-image: url({pieceImageUrls[String(type)]}); 
    width: {width}px; height: {height}px"
    use:dragging={{ useAction: draggable }}
    on:move-start
    on:move-end
/>

<style>
    .chess-piece {
        z-index: 10;
        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>
