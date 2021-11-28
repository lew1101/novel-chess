<script lang="ts">
    import * as constants from "$lib/engine/constants";
    import { writable, Writable } from "svelte/store";
    import { beforeUpdate } from "svelte";
    import { isPiece } from "$lib/engine/utils";

    // ==========================
    //  EXPOSED MEMBERS
    // ==========================

    // CONST
    export const PIECE_SVG = {
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

    export const MODES = ["INTERACTIVE", "VIEW"];

    // EXPOSED PROPS
    export let width: number = 800;
    export let height: number = 800;
    export let debug: boolean = false;
    export let mode: string = "INTERACTIVE";
    export let showNotation: boolean = true;
    export let showHints: boolean = true;

    // EXPOSED METHODS
    export const flip = () => (_flipped = !_flipped);

    // ==========================
    //  INTERNAL MEMBERS
    // ==========================

    // INTERNAL STATE
    let _boardRef: HTMLElement; // reference to chessboard itself
    let _boardWidth: number; // bound to clientWidth of board
    let _boardHeight: number;
    let _flipped: boolean = false;
    let _showingHints: boolean = false;

    const boardState: Writable<{ value: Chess.ValidSquare; isHighlighted: boolean }[]> = writable(
        [...new Array(64)].map(() => ({ value: constants.EMPTY, isHighlighted: false }))
    );

    function getSquareElement(s: number) {
        return _boardRef.children[s];
    }

    // ==========================
    // INTERNAL HANDLERS
    // ==========================

    function handleDragStart(e: DragEvent, sq) {
        e.dataTransfer.setData("text", sq);
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.effectAllowed = "move";
    }
    function handleDragEnter(sq) {
        $boardState[sq].isHighlighted = true;
    }
    function handleDragLeave(sq) {
        $boardState[sq].isHighlighted = false;
    }

    function handleDragOver(e: DragEvent) {
        e.dataTransfer.dropEffect = "move";
    }

    function handleDrop(e: DragEvent, finalSquare) {
        const initialSquare = parseInt(e.dataTransfer.getData("text"));
        $boardState[finalSquare].isHighlighted = false;
        $boardState[finalSquare].value = $boardState[initialSquare].value;
        $boardState[initialSquare].value = constants.EMPTY;
    }

    // ==========================

    // DEBUG

    if (debug) {
        boardState.set(
            $boardState.map((s, i) => {
                s.value = constants.STARTING_POS[constants.MAILBOX64[i]];
                return s;
            })
        );

        $: console.log($boardState.map((s) => s.value));
    }
</script>

<div class="chessboard-wrapper" style="width: {width}px; height: {height}px">
    <!-- Board -->
    <div
        class="chessboard"
        bind:this={_boardRef}
        bind:clientWidth={_boardWidth}
        bind:offsetHeight={_boardHeight}
    >
        {#each _flipped ? $boardState.reverse() : $boardState as { value, isHighlighted }, i}
            <!-- Square -->
            <div
                class="chess-square {(~~(i / 8) + (i % 8)) % 2 ? 'light-square' : 'dark-square'}"
                class:dragover-square={isHighlighted}
                data-index={i}
                on:drop|preventDefault|stopPropagation={(e) => handleDrop(e, i)}
                on:dragover|preventDefault={(e) => handleDragOver(e)}
                on:dragenter={(e) => handleDragEnter(i)}
                on:dragleave={(e) => handleDragLeave(i)}
            >
                <!-- Piece -->
                {#if isPiece(value)}
                    <div
                        class="chess-piece"
                        alt={value}
                        style="background-image: url({PIECE_SVG[value]}); 
                        width: {_boardWidth / 8}px; height: {_boardHeight / 8}px"
                        draggable={true}
                        on:dragstart={(e) => handleDragStart(e, i)}
                    />
                {/if}
            </div>
        {/each}
    </div>

    <!-- Notation -->
    {#if showNotation}
        <div class="rank-notation" style="font-size: {_boardHeight * 0.03}px">
            {#each constants.RANKS as rank}
                <li class="notation-item">{rank}</li>
            {/each}
        </div>
        <div class="file-notation" style="font-size: {_boardWidth * 0.03}px">
            {#each constants.FILES as file}
                <li class="notation-item">{file}</li>
            {/each}
        </div>
    {/if}
</div>

<style>
    .chessboard-wrapper {
        display: grid;
        grid-template-columns: 5% 1fr;
        grid-template-rows: 1fr 5%;
        grid-template-areas:
            "rank-notation chessboard"
            ". file-notation";
        grid-gap: 0.5em;
    }
    .chessboard {
        grid-area: chessboard;
        display: inline-grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0, 0;
        justify-items: stretch;
        overflow: hidden;
        border-radius: 0.5%;
        user-select: none;
    }

    .chess-piece {
        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
        cursor: grab;
    }

    .chess-square {
        user-select: none;
        box-sizing: border-box;
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

    .chess-square.dragover-square {
        outline: 10px solid white;
        outline-offset: -10px;
    }

    .notation-item {
        list-style: none;
        /* width: 1em;
        height: 1em; */
        font-size: 1em;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
        color: #989795;
    }

    .rank-notation {
        grid-area: rank-notation;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        text-align: center;
    }

    .file-notation {
        grid-area: file-notation;
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
</style>
