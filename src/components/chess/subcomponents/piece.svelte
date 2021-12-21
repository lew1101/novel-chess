<script lang="ts">
    import * as constants from "@lib/engine/constants";
    import dragging from "@lib/actions/dragging/dragging";

    export let width: number;
    export let height: number;
    export let type: Chess.Piece;

    export const piece_images = {
        [constants.WHITE_KING]: "/assets/chess-pieces/chess_wK45.svg",
        [constants.WHITE_QUEEN]: "/assets/chess-pieces/chess_wQ45.svg",
        [constants.WHITE_ROOK]: "/assets/chess-pieces/chess_wR45.svg",
        [constants.WHITE_BISHOP]: "/assets/chess-pieces/chess_wB45.svg",
        [constants.WHITE_KNIGHT]: "/assets/chess-pieces/chess_wN45.svg",
        [constants.WHITE_PAWN]: "/assets/chess-pieces/chess_wP45.svg",
        [constants.BLACK_KING]: "/assets/chess-pieces/chess_bK45.svg",
        [constants.BLACK_QUEEN]: "/assets/chess-pieces/chess_bQ45.svg",
        [constants.BLACK_ROOK]: "/assets/chess-pieces/chess_bR45.svg",
        [constants.BLACK_BISHOP]: "/assets/chess-pieces/chess_bB45.svg",
        [constants.BLACK_KNIGHT]: "/assets/chess-pieces/chess_bN45.svg",
        [constants.BLACK_PAWN]: "/assets/chess-pieces/chess_bP45.svg",
    };
</script>

<div
    class="chess-piece"
    style="background-image: url({piece_images[type]}); 
    width: {width}px; height: {height}px"
    use:dragging={{ debug: true }}
    on:move-start
    on:move-end
/>

<style>
    .chess-piece {
        width: var(--piece-width);
        height: var(--piece-height);

        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: grab;
    }
</style>
