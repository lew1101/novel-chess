<script>
    import * as constants from "../../chess/constants";
    import { derived } from "svelte/store";
    import ChessPiece from "./ChessPiece.svelte";

    // ==========================
    // MEMBERS
    // ==========================

    // EXPOSED PROPS
    export let store; // instance of writable
    export let debug = false;
    export let size = 800; // in px
    export let showNotation = false;
    export let allowResize = true;
    export let interactive = true;
    export let showHints = true;
    export let onMoveCallback = (initial, final) => true; // (initial: number, final: number) => bool

    // LOCAL MEMBERS
    let nodeRef; // reference to chessboard itself
    let boardSize; // bound to clientWidth of board
    let showingHints = false;
    let selectedSquare = null;

    // COMPUTED MEMBERS
    // read-only, used only for rendering purposes
    $: boardState = derived(store, ($state) => constants.MAILBOX64.map((s) => $state[s]));

    // ==========================
    // HANDLERS
    // ==========================

    function handleMouseDown(e) {
        const targetRef = e.target; // ref to clicked piece
        const initialX = e.pageX;
        const initialY = e.pageY;

        const boardBoundingRect = nodeRef.getBoundingClientRect();
        const targetBoundingRect = targetRef.getBoundingClientRect();

        const offsetX = targetBoundingRect.width / 2;
        const offsetY = targetBoundingRect.height / 2;

        const initialR = ~~((initialY - boardBoundingRect.top) / targetBoundingRect.height);
        const initialF = ~~((initialX - boardBoundingRect.left) / targetBoundingRect.width);
        selectedSquare = constants.MAILBOX64[initialR * 8 + initialF];

        const tempClone = targetRef.cloneNode(); // clone of targetRef
        targetRef.style.display = "none"; // hide targetRef

        // styles for clone
        tempClone.style.position = "absolute";
        tempClone.style.top = initialY - boardBoundingRect.top - offsetY + "px";
        tempClone.style.left = initialX - boardBoundingRect.left - offsetX + "px";

        nodeRef.appendChild(tempClone); // append to dom

        function handleMouseMove(e) {
            tempClone.style.top = e.pageY - boardBoundingRect.top - offsetY + "px";
            tempClone.style.left = e.pageX - boardBoundingRect.left - offsetX + "px";
        }

        function handleMouseUp(e) {
            const finalR = ~~((e.pageY - boardBoundingRect.top) / targetBoundingRect.height);
            const finalF = ~~((e.pageX - boardBoundingRect.left) / targetBoundingRect.width);
            const finalSquare = constants.MAILBOX64[finalR * 8 + finalF];

            if (selectedSquare !== finalSquare && onMoveCallback(selectedSquare, finalSquare)) {
                // valid move
                $store[finalSquare] = $store[selectedSquare];
                $store[selectedSquare] = constants.EMPTY;

                $store = $store; // force rerender
            } else {
                // invalid move
                targetRef.style.display = "block"; // prevent rerender
            }
            tempClone.remove(); // delete clone

            selectedSquare = null;

            //remove listeners
            nodeRef.removeEventListener("mousemove", handleMouseMove);
            nodeRef.removeEventListener("mouseup", handleMouseUp);
        }

        // bind listeners
        nodeRef.addEventListener("mousemove", handleMouseMove);
        nodeRef.addEventListener("mouseup", handleMouseUp);
    }

    function handleClick(e) {
        const boardBoundingRect = nodeRef.getBoundingClientRect();
        const targetBoundingRect = e.target.getBoundingClientRect();

        const clickedR = ~~((e.pageY - boardBoundingRect.top) / targetBoundingRect.height);
        const clickedF = ~~((e.pageX - boardBoundingRect.left) / targetBoundingRect.width);
        const clickedSquare = constants.MAILBOX64[clickedR * 8 + clickedF];

        console.log(clickedSquare);

        if (!selectedSquare) {
            // no square selected
            selectedSquare = clickedSquare;
            return;
        } else if (
            clickedSquare !== selectedSquare &&
            onMoveCallback(selectedSquare, finalSquare)
        ) {
            $store[clickedSquare] = $store[selectedSquare];
            $store[selectedSquare] = constants.EMPTY;

            $store = $store; // force rerender
        }

        selectedSquare = null;
    }

    // ==========================

    // DEBUG
    $: if (debug) {
        console.log($store);
    }
</script>

<div class="wrapper" style="width: {size}px; height: {size}px">
    <div bind:this={nodeRef} class="chessboard" bind:clientWidth={boardSize}>
        {#each $boardState as square, i}
            <div class={(~~(i / 8) + (i % 8)) % 2 ? "light-square" : "dark-square"}>
                {#if square != constants.EMPTY}
                    <ChessPiece
                        on:click={interactive ? handleClick : undefined}
                        on:mousedown={interactive ? handleMouseDown : undefined}
                        type={square}
                        size={boardSize / 8}
                    />
                {/if}
            </div>
        {/each}
    </div>
</div>

<style>
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
    }

    .dark-square {
        background-color: #d08b18;
    }

    .light-square {
        background-color: #fce4b2;
    }
</style>
