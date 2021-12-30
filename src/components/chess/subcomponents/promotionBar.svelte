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
    style="right: calc(var(--square-width) * {8 - file}); {reversed
        ? `flex-direction: column-reverse; top: calc(var(--square-height) * 3.5);`
        : `flex-direction: column; top: 0px`}
    "
>
    {#each promotionPieceTypes as pieceType}
        <div
            class="chess-piece"
            style="background-image: url({pieceImageUrls[String(pieceColor + pieceType)]});"
            on:click={() => handleClick(String(pieceColor + pieceType))}
        />
    {/each}
    <button class="exit-button" on:click={() => handleClick(null)}>&#x2715</button>
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

        width: var(--square-width);
        height: calc(var(--square-height) * 4.5);
        border-radius: var(--border-radius, 8px);
    }

    .chess-piece {
        z-index: 10;
        user-select: none;

        width: var(--square-width);
        height: var(--square-height);
        background-repeat: no-repeat;
        background-size: contain;
    }

    .exit-button {
        border: none;
        text-align: center;

        height: calc(var(--square-height) / 2);
        background-color: #f1f1f1;
        color: #8c8a88;
        font-weight: 600;
        font-size: var(--font-size, 1em);
    }
</style>
