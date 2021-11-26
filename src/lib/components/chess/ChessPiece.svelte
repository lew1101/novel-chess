<script lang="ts">
    import * as constants from "$lib/engine/constants";

    const PIECE_SVG = {
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

    export let value: Chess.Piece;
</script>

<div class="chess-piece" style="background-image: url({PIECE_SVG[value]})" on:mousedown />

<style>
    .chess-piece {
        width: 100%;
        height: 100%;
        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
    }
</style>
