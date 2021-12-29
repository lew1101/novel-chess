<script lang="ts" context="module">
    import { PieceType } from '@lib/chess/chess';

    export const promotionPieceTypes = [
        PieceType.QUEEN,
        PieceType.KNIGHT,
        PieceType.ROOK,
        PieceType.BISHOP,
    ];
</script>

<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { Color } from '@lib/chess/chess';

    export let file: number;
    export let pieceWidth: number;
    export let pieceHeight: number;
    export let pieceColor: Color;
    export let reversed: boolean;
    export let pieceImageUrls: { [key: number]: any };

    let dispatch = createEventDispatcher();

    function handleClick(pieceType) {
        dispatch('promotion-select', {
            pieceType,
        });
    }
</script>

<div
    class="promotion-bar"
    style="width: {pieceWidth}px; height: {pieceHeight * 4.5}px; 
    right: {(8 - file) * pieceWidth}px; {reversed
        ? `flex-direction: column-reverse; top: ${pieceHeight * 3.5}px;`
        : `flex-direction: column; top: 0px`}
    "
>
    {#each promotionPieceTypes as pieceType}
        <div
            class="chess-piece"
            style="background-image: url({pieceImageUrls[String(pieceColor + pieceType)]}); 
            width: {pieceWidth}px; height: {pieceHeight}px"
            on:click={() => handleClick(String(pieceColor + pieceType))}
        />
    {/each}
    <button
        class="exit-button"
        style="height: {pieceHeight / 2}px;"
        on:click={() => handleClick(null)}>&#x2715</button
    >
</div>

<style>
    .promotion-bar {
        position: absolute;
        float: right;
        display: flex;
        z-index: 1000;

        overflow: hidden;
        background-color: #ffffff;
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.45);
        border-radius: var(--border-radius, 8px);
    }

    .chess-piece {
        z-index: 10;
        user-select: none;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .exit-button {
        border: none;
        text-align: center;

        background-color: #f1f1f1;
        color: #8c8a88;
        font-weight: 600;
        font-size: var(--font-size, 1em);
    }
</style>
