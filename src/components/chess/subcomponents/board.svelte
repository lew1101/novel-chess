<script lang="ts">
    import ChessSquare from './square.svelte';
    import ChessPiece from './piece.svelte';
    import { createEventDispatcher } from 'svelte';
    import { getOffsetRect } from '@utils/bounding';
    import { ChessInstance, MAILBOX64 } from '@lib/chess/chess';

    import type { ViewMode } from '../ChessBoard.svelte';
    import type { Writable } from 'svelte/store';
    import type { ChessBoard120 } from '@lib/chess/chess';

    // ===============================================

    export let chess: ChessInstance;
    export let position: Writable<ChessBoard120>;
    export let mode: ViewMode;
    export let flipped: boolean;
    export let highlightedSquares: number[];
    export let pieceImageUrls: { [key: number]: string };

    const dispatch = createEventDispatcher();

    // ===============================================

    let _boardRef;
    function getSquareFromXY(x: number, y: number) {
        const boardRect = getOffsetRect(_boardRef); // math time
        const r = ~~(((y - boardRect.y) / boardRect.height) * 8);
        const f = ~~(((x - boardRect.x) / boardRect.width) * 8);
        // rank and file in range ? return square in mailbox form : return null
        return r >= 0 && r <= 7 && f >= 0 && f <= 7 ? MAILBOX64[r * 8 + f] : null;
    }

    function handleMoveStart(e: CustomEvent) {
        dispatch('piece-move-start', {
            square: getSquareFromXY(e.detail.mouseX, e.detail.mouseY),
        });
    }

    function handleMoveEnd(e: CustomEvent) {
        dispatch('piece-move-end', {
            square: getSquareFromXY(e.detail.mouseX, e.detail.mouseY),
            accept: e.detail.accept,
            reject: e.detail.reject,
        });
    }
</script>

<div class="chess-board" bind:this={_boardRef}>
    {#each chess.utils.getMailboxAsBoard64(flipped ? $position.reverse() : $position) as square, i}
        <ChessSquare
            isDarkSquare={Boolean((~~(i / 8) + (i % 8)) % 2)}
            hasHighlight={highlightedSquares.includes(MAILBOX64[i])}
            hasBorder={false}
        >
            {#if chess.utils.isPiece(square)}
                <ChessPiece
                    type={square}
                    draggable={mode === 'INTERACTIVE'}
                    {pieceImageUrls}
                    on:move-start={handleMoveStart}
                    on:move-end={handleMoveEnd}
                />
            {/if}
        </ChessSquare>
    {/each}
</div>

<style>
    .chess-board {
        display: inline-grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0, 0;
        justify-items: stretch;
        overflow: hidden;
        border-radius: var(--border-radius);
        user-select: none;
    }
</style>
