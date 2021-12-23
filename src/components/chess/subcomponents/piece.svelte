<script lang="ts">
    import { Piece } from "@lib/chess/constants";
    import dragging from "@lib/actions/dragging/dragging";

    export let width: number;
    export let height: number;
    export let type: Piece;

    export const PIECE_URLS = {
        [Piece.WHITE_KING]: "/assets/chess-pieces/chess_wK45.svg",
        [Piece.WHITE_QUEEN]: "/assets/chess-pieces/chess_wQ45.svg",
        [Piece.WHITE_ROOK]: "/assets/chess-pieces/chess_wR45.svg",
        [Piece.WHITE_BISHOP]: "/assets/chess-pieces/chess_wB45.svg",
        [Piece.WHITE_KNIGHT]: "/assets/chess-pieces/chess_wN45.svg",
        [Piece.WHITE_PAWN]: "/assets/chess-pieces/chess_wP45.svg",
        [Piece.BLACK_KING]: "/assets/chess-pieces/chess_bK45.svg",
        [Piece.BLACK_QUEEN]: "/assets/chess-pieces/chess_bQ45.svg",
        [Piece.BLACK_ROOK]: "/assets/chess-pieces/chess_bR45.svg",
        [Piece.BLACK_BISHOP]: "/assets/chess-pieces/chess_bB45.svg",
        [Piece.BLACK_KNIGHT]: "/assets/chess-pieces/chess_bN45.svg",
        [Piece.BLACK_PAWN]: "/assets/chess-pieces/chess_bP45.svg",
    };
</script>

<div
    class="chess-piece"
    style="background-image: url({PIECE_URLS[type]}); 
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
