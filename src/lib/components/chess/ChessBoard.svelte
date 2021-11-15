<script lang="ts">
    import * as constants from "$lib/chess/constants";
    import { isPiece } from "$lib/chess/utils";
    import { derived, Writable } from "svelte/store";
    import ChessPiece from "./ChessPiece.svelte";

    // ==========================
    // MEMBERS
    // ==========================

    // EXPOSED PROPS
    export let store: Writable<Chess.Board>;
    export let debug: boolean = false;
    export let size: number = 800; // in px
    export let flipped: boolean = false;
    export let interactive: boolean = true;
    export let showNotation: boolean = true;
    export let showHints: boolean = true;
    export let onMoveCallback: (initial: number, final: number) => boolean = () => true; // (initial: number, final: number) => bool

    // LOCAL MEMBERS
    let boardRef: HTMLElement; // reference to chessboard itself
    let boardSize: number; // bound to clientWidth of board
    let showingHints = false;
    let selectedSquare = null;
    let highlightedSquare = null;

    // COMPUTED MEMBERS
    $: mailbox64 = flipped ? [...constants.MAILBOX64].reverse() : constants.MAILBOX64; //conversion from 8x8 coords to 10x12 coords
    $: boardState = derived(store, ($state) => mailbox64.map((s) => $state[s]));

    // FUNCTIONS
    function getSquare(s: number) {
        return boardRef.querySelectorAll("div[data-square='" + s + "']");
    }

    function getSquareFromOffsetXY(x: number, y: number) {
        const boardRect = getOffsetRect(boardRef);
        let rank = ~~((y - boardRect.y) / (boardRect.height / 8));
        let file = ~~((x - boardRect.x) / (boardRect.width / 8));

        return mailbox64[rank * 8 + file];
    }

    function showHintsForSquare(square: number) {}

    function hideHintsForSquare(square: number) {}

    // ==========================
    // HANDLERS
    // ==========================

    function onSquareDragStart(e: MouseEvent) {
        if (selectedSquare) return; // selected piece is taking target, target shouldn't run

        const targetRef = <HTMLElement>e.target; // piece
        const targetRect = getOffsetRect(targetRef);
        const boardRect = getOffsetRect(boardRef);
        const offsetSquareX = targetRect.width / 2;
        const offsetSquareY = targetRect.height / 2;

        selectedSquare = getSquareFromOffsetXY(e.pageX, e.pageY);

        const tempClone = <HTMLElement>targetRef.cloneNode(); // create clone of piece which the player will drag
        tempClone.style.position = "absolute";
        tempClone.style.left = e.pageX - boardRect.left - offsetSquareX + "px";
        tempClone.style.top = e.pageY - boardRect.top - offsetSquareY + "px";
        boardRef.appendChild(tempClone); // append clone

        targetRef.style.visibility = "hidden"; // hide original piece

        function onDrag(e: MouseEvent) {
            tempClone.style.left = e.pageX - boardRect.left - offsetSquareX + "px";
            tempClone.style.top = e.pageY - boardRect.top - offsetSquareY + "px";
        }

        function onDrop(e: MouseEvent) {
            const finalSquare = getSquareFromOffsetXY(e.pageX, e.pageY);

            if (selectedSquare !== finalSquare) {
                if (onMoveCallback(selectedSquare, finalSquare)) {
                    $store[finalSquare] = $store[selectedSquare];
                    $store[selectedSquare] = constants.EMPTY;

                    selectedSquare = null;
                    highlightedSquare = null;

                    rerender();

                    boardRef.removeEventListener("mousemove", onDrag);
                    boardRef.removeEventListener("mouseup", onDrop);
                } else {
                    // * TODO
                }
            } else {
                targetRef.style.visibility = "visible";
                highlightedSquare = finalSquare;
            }

            tempClone.remove(); // remove clone
        }

        boardRef.addEventListener("mousemove", onDrag);
        boardRef.addEventListener("mouseup", onDrop);
    }

    // ==========================
    // UTILS
    // ==========================
    function getOffsetRect(el: HTMLElement) {
        let rect = el.getBoundingClientRect();

        let scrollX = window.scrollX || window.pageXOffset;
        let scrollY = window.scrollY || window.pageYOffset;

        let left = rect.left + scrollX;
        let top = rect.top + scrollY;

        return {
            left,
            top,
            right: rect.right + scrollX,
            bottom: rect.bottom + scrollY,
            x: rect.x === undefined ? left : rect.x + scrollX,
            y: rect.y === undefined ? top : rect.y + scrollY,
            width: rect.width,
            height: rect.height,
        };
    }

    function rerender(): void {
        store.set($store);
    }

    // ==========================

    console.log(isPiece("k"));
    // DEBUG
    $: if (debug) {
        console.log($store);
    }
</script>

<div class="chessboard-wrapper" style="width: {size}px; height: {size}px">
    <div class="chessboard" bind:this={boardRef} bind:clientWidth={boardSize}>
        {#each $boardState as square, i}
            <div
                class="{(~~(i / 8) + (i % 8)) % 2 ? 'light-square' : 'dark-square'} chess-square"
                class:highlight-square-1={i === highlightedSquare}
                data-square={i}
            >
                {#if isPiece(square)}
                    <ChessPiece
                        type={square}
                        size={boardSize / 8}
                        on:mousedown={interactive ? onSquareDragStart : undefined}
                    />
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
    .chessboard-wrapper {
        display: flex;
    }
    .chessboard {
        width: 100%;
        height: 100%;
        display: inline-grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0, 0;
        justify-items: stretch;
        border: solid black 3px;
        border-radius: 5px;
        user-select: none;
    }

    .chess-square {
        user-select: none;
    }

    .chess-square.dark-square {
        background-color: #d08b18;
    }

    .chess-square.light-square {
        background-color: #fce4b2;
    }

    .chess-square.highlight-square-1 {
        border: solid yellow 1em;
        box-sizing: border-box;
    }

    .chess-square.highlight-square-2 {
        border: solid red 1em;
        box-sizing: border-box;
    }
</style>
