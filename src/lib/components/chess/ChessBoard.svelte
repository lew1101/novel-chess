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
    export let width: number = 400;
    export let height: number = 400;
    export let debug: boolean = false;
    export let flipped: boolean = false;
    export let interactive: boolean = true;
    export let showNotation: boolean = false;
    export let showHints: boolean = true;
    export let onMoveCallback: (initial: number, final: number) => boolean = () => true; // (initial: number, final: number) => bool

    // INTERNAL STATE
    let boardRef: HTMLElement; // reference to chessboard itself
    let boardWidth: number; // bound to clientWidth of board
    let boardHeight: number;
    let showingHints = false;
    let isDragging = false;
    let draggedOverSquare = null;
    let selectedSquare = null;

    // COMPUTED MEMBERS
    $: mailbox64 = flipped ? [...constants.MAILBOX64].reverse() : constants.MAILBOX64; //conversion from 8x8 coords to 10x12 coords
    $: boardState = derived(store, ($state) => mailbox64.map((s) => $state[s]));

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
        let square = mailbox64[rank * 8 + file];

        return constants.MAILBOX64.includes(square) ? square : null;
    }

    // HANDLERS
    function onSquareDragStart(e: MouseEvent) {
        if (selectedSquare) return; // selected piece is taking the target, target shouldn't run

        isDragging = true;

        const targetRef = <HTMLElement>e.target; // piece
        const targetRect = getOffsetRect(targetRef);
        const boardRect = getOffsetRect(boardRef);
        const offsetSquareX = targetRect.width / 2;
        const offsetSquareY = targetRect.height / 2;

        let initialSquare = getSquareFromPageXY(e.pageX, e.pageY);

        const tempClone = <HTMLElement>targetRef.cloneNode(); // create clone of piece which the player will drag
        tempClone.style.position = "absolute";
        tempClone.style.left = e.pageX - boardRect.left - offsetSquareX + "px";
        tempClone.style.top = e.pageY - boardRect.top - offsetSquareY + "px";
        boardRef.appendChild(tempClone); // append clone

        targetRef.style.visibility = "hidden"; // hide original piece

        function onDrag(e: MouseEvent) {
            tempClone.style.left = e.pageX - boardRect.left - offsetSquareX + "px";
            tempClone.style.top = e.pageY - boardRect.top - offsetSquareY + "px";

            draggedOverSquare = getSquareFromPageXY(e.pageX, e.pageY);
        }

        function onDrop(e: MouseEvent) {
            const finalSquare = getSquareFromPageXY(e.pageX, e.pageY);
            const parentSquare = <HTMLElement>targetRef.parentNode;

            if (initialSquare !== finalSquare && onMoveCallback(initialSquare, finalSquare)) {
                $store[finalSquare] = $store[initialSquare];
                $store[initialSquare] = constants.EMPTY;

                parentSquare.classList.remove("highlight-square");

                selectedSquare = null;
                draggedOverSquare = null;

                rerender();

                boardRef.removeEventListener("mousemove", onDrag);
                boardRef.removeEventListener("mouseup", onDrop);
            } else {
                targetRef.style.visibility = "visible";

                if (selectedSquare) {
                    parentSquare.classList.remove("highlight-square");
                    selectedSquare = null;

                    rerender();

                    boardRef.removeEventListener("mousemove", onDrag);
                    boardRef.removeEventListener("mouseup", onDrop);
                } else {
                    parentSquare.classList.add("highlight-square");
                    selectedSquare = initialSquare;
                }
            }

            isDragging = false;

            tempClone.remove(); // remove clone
        }

        boardRef.addEventListener("mousemove", onDrag);
        boardRef.addEventListener("mouseup", onDrop);
    }

    function showHintsForSquare(square: number) {}

    function hideHintsForSquare(square: number) {}

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

    function rerender() {
        store.set($store);
    }

    // ==========================

    // DEBUG
    $: if (debug) {
        console.log($store);
    }
</script>

<div class="chessboard-wrapper" style="width: {width}px; height: {height}px">
    <div
        class="chessboard"
        bind:this={boardRef}
        bind:clientWidth={boardWidth}
        bind:clientHeight={boardHeight}
    >
        {#each $boardState as square, i}
            <div
                class="{(~~(i / 8) + (i % 8)) % 2 ? 'light-square' : 'dark-square'} chess-square"
                data-square={i}
            >
                {#if isPiece(square)}
                    <ChessPiece
                        type={square}
                        width={boardWidth / 8}
                        height={boardHeight / 8}
                        on:mousedown={interactive ? onSquareDragStart : undefined}
                    />
                {/if}
            </div>
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

<style global>
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

    .chess-square.highlight-square {
        background-color: yellow;
    }

    .chess-square.dragged-over-square {
        border: solid 20%;
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
