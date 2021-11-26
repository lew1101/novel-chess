<script lang="ts">
    import ChessSquare from "./ChessSquare.svelte";
    import ChessPiece from "./ChessPiece.svelte";
    import * as constants from "$lib/engine/constants";
    import { derived, writable, Writable } from "svelte/store";
    import { getOffsetRect } from "$lib/svelteUtils";
    import { isPiece } from "$lib/engine/utils";

    // ==========================
    // MEMBERS
    // ==========================

    // EXPOSED PROPS
    export let width: number = 800;
    export let height: number = 800;
    export let debug: boolean = false;
    export let interactive: boolean = true;
    export let showNotation: boolean = false;
    export let showHints: boolean = true;

    // EXPOSED METHODS
    export const flip = () => (flipped = !flipped);

    // INTERNAL STATE
    let boardRef: HTMLElement; // reference to chessboard itself
    let boardWidth: number; // bound to clientWidth of board
    let boardHeight: number;
    let flipped: boolean = false;
    let showingHints = false;
    let isDragging = false;
    let draggedOverSquare = null;
    let selectedSquare = null;

    const boardState: Writable<Chess.ChessBoard> = writable([...constants.EMPTY_BOARD]);
    const squareIsHighlighted: Writable<boolean[]> = writable([...new Array(64)].fill(false));
    const combinedState = derived(
        [boardState, squareIsHighlighted],
        ([$chessStore, $highlightStore]) => {
            let combinedState = new Array(64);
            for (let i = 0; i < 64; i++) {
                combinedState[i] = {
                    value: $chessStore[constants.MAILBOX64[i]],
                    isHighlighted: $highlightStore[i],
                };
            }
            return combinedState;
        }
    );

    // ==========================
    // FUNCTIONS
    // ==========================

    function getSquareElement(s: number) {
        return constants.MAILBOX64.includes(s) ? boardRef.children[constants.MAILBOX120[s]] : null;
    }

    function getSquareFromPageXY(x: number, y: number) {
        const boardRect = getOffsetRect(boardRef);
        let rank = ~~((y - boardRect.y) / (boardRect.height / 8));
        let file = ~~((x - boardRect.x) / (boardRect.width / 8));
        let square = constants.MAILBOX64[rank * 8 + file];

        return constants.MAILBOX64.includes(square) ? square : null;
    }

    // ==========================

    boardState.set([...constants.STARTING_POS]);

    // DEBUG
    $: if (debug) {
        console.log($boardState);
    }
</script>

<div class="chessboard-wrapper" style="width: {width}px; height: {height}px">
    <div class="chessboard" bind:this={boardRef}>
        {#each flipped ? $combinedState.reverse() : $combinedState as { value, isHighlighted }, i}
            <ChessSquare
                color={(~~(i / 8) + (i % 8)) % 2 ? "light" : "dark"}
                {isHighlighted}
                index={i}
            >
                {#if isPiece(value)}
                    <ChessPiece {value} />
                {/if}
            </ChessSquare>
        {/each}
    </div>

    {#if showNotation}
        <div class="rank-notation" style="font-size: {boardHeight * 0.03}px">
            {#each constants.RANKS as rank}
                <li class="notation-item">{rank}</li>
            {/each}
        </div>
        <div class="file-notation" style="font-size: {boardWidth * 0.03}px">
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
