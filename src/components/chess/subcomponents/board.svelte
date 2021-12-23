<script lang="ts">
    import ChessSquare from "./square.svelte";
    import ChessPiece from "./piece.svelte";
    import { getOffsetRect } from "@utils/bounding";
    import { MAILBOX64 } from "@lib/chess/constants";
    import { isPiece, getMailboxAsBoard64 } from "@lib/chess/utils";

    import type { ChessPositionInstance } from "@lib/chess/position";
    import type { Writable } from "svelte/store";

    export let position: Writable<ChessPositionInstance>;
    export let mode: ViewMode;
    export let flipped: boolean;
    export let showNotation: boolean;
    export let showHints: boolean;

    let _boardRef;
    let _width: number;
    let _height: number;
    $: _squareWidth = _width / 8;
    $: _squareHeight = _height / 8;

    function getSquareFromXY(x: number, y: number) {
        const boardRect = getOffsetRect(_boardRef); // math time
        const r = ~~(((y - boardRect.y) / boardRect.height) * 8);
        const f = ~~(((x - boardRect.x) / boardRect.width) * 8);
        // rank and file in range ? return square in mailbox form : return null
        return r >= 0 && r <= 7 && f >= 0 && f <= 7 ? MAILBOX64[r * 8 + f] : null;
    }

    let _dragInitial: number = null;
    let _dragFinal: number = null;

    function handleMoveStart(e: CustomEvent): void {
        _dragInitial = getSquareFromXY(e.detail.mouseX, e.detail.mouseY);
    }
    function handleMoveEnd(e: CustomEvent): void {
        _dragFinal = getSquareFromXY(e.detail.mouseX, e.detail.mouseY);

        if (_dragFinal === null || _dragInitial === _dragFinal) {
            e.detail.reject();
            return;
        }
        $position = $position.move(_dragInitial, _dragFinal);
    }
</script>

<div
    class="chess-board"
    bind:this={_boardRef}
    bind:clientWidth={_width}
    bind:clientHeight={_height}
>
    {#each getMailboxAsBoard64(flipped ? $position.board.reverse() : $position.board) as square, i}
        <ChessSquare
            width={_squareWidth}
            height={_squareHeight}
            isDarkSquare={!Boolean((~~(i / 8) + (i % 8)) % 2)}
            hasHighlight={false}
            hasBorder={false}
        >
            {#if isPiece(square)}
                <ChessPiece
                    type={square}
                    width={_squareWidth}
                    height={_squareHeight}
                    on:move-start={handleMoveStart}
                    on:move-end={handleMoveEnd}
                />
            {/if}
        </ChessSquare>
    {/each}
</div>

<style>
    .chess-board {
        width: var(--board-width);
        height: var(--board-height);

        display: inline-grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0, 0;
        justify-items: stretch;
        overflow: hidden;
        border-radius: 0.5%;
        user-select: none;
    }
</style>
