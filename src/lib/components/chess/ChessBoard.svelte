<script lang="ts">
    import * as constants from "$lib/engine/constants";
    import { draggable, dropzone } from "$lib/dragging";
    import { writable, Writable } from "svelte/store";
    import { isPiece } from "$lib/engine/utils";

    // ==========================
    // EXPOSED MEMBERS
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
    export let id: string;
    export let width: number = 800;
    export let height: number = 800;
    export let debug: boolean = false;
    export let mode: string = "INTERACTIVE";
    export let showNotation: boolean = true;
    export let showHints: boolean = true;
    export let verifyMoveCallback: (from: number, to: number) => boolean = () => true;

    // EXPOSED METHODS
    export const flip = () => (_flipped = !_flipped);
    export const clearHighlight = () =>
        boardState.set(
            $boardState.map((s) => {
                s.isHighlighted = false;
                return s;
            })
        );

    // ==========================
    //  INTERNAL MEMBERS
    // ==========================
    // INTERNAL STATE
    const boardState: Writable<{ value: Chess.ValidSquare; isHighlighted: boolean }[]> = writable(
        [...new Array(64)].map(() => ({ value: constants.EMPTY, isHighlighted: false }))
    );
    let _boardRef: HTMLElement; // reference to chessboard itself
    let _boardWidth: number; // bound to clientWidth of board
    let _boardHeight: number;
    let _flipped: boolean = false;
    let _showingHints: boolean = false;

    let _ds: {
        from: number;
        to: number;
        dragging: boolean;
    } = {
        from: null,
        to: null,
        dragging: false,
    };

    // INTERNAL METHODS
    const moveFromTo = (from: number, to: number) => {
        $boardState[to].value = $boardState[from].value;
        $boardState[from].value = constants.EMPTY;
    };

    // ==========================
    // INTERNAL HANDLERS
    // ==========================

    const handleDragStart = (e: DragEvent, sq) => {
        _ds.from = sq;
        _ds.dragging = true;
    };
    const handleDragEnter = (sq) => {
        $boardState[sq].isHighlighted = true;
    };
    const handleDragLeave = (sq) => {
        $boardState[sq].isHighlighted = false;
    };

    const handleDrop = (e: DragEvent, sq) => {
        _ds.to = sq;
        if (_ds.from !== _ds.to && verifyMoveCallback(_ds.from, _ds.to)) {
            moveFromTo(_ds.from, _ds.to);
            clearHighlight();
        } else {
        }
        _ds.dragging = false;
    };

    // ==========================

    // DEBUG

    if (debug) {
        boardState.set(
            $boardState.map((s, i) => {
                s.value = constants.STARTING_POS[constants.MAILBOX64[i]];
                return s;
            })
        );
        console.log($boardState.map((s) => s.value));
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
                use:dropzone={id}
                on:drop={(e) => handleDrop(e, i)}
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
                        use:draggable={id}
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
        outline: 10px solid white; /* what a hack */
        outline-offset: -10px;
    }

    .notation-item {
        list-style: none;
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
