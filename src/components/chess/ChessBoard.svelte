<script context="module" lang="ts">
    export type ViewMode = 'INTERACTIVE' | 'VIEW';
</script>

<script lang="ts">
    import ChessBoard from './subcomponents/board.svelte';
    import { STARTING_FEN, RANKS, FILES } from '@lib/chess/chess';

    export let mode: ViewMode = 'INTERACTIVE';
    export let fen: string = STARTING_FEN;
    export let flipped: boolean = false;
    export let showNotation: boolean = true;
    export let showHints: boolean = true;
    export let debug: boolean = false;
</script>

<div class="chessboard-container">
    <ChessBoard {mode} {fen} {flipped} {showNotation} {showHints} {debug} />
    {#if showNotation}
        <div class="rank-notation" style="font-size: 10px">
            {#each RANKS as rank}
                <li class="notation-item">{rank}</li>
            {/each}
        </div>
        <div class="file-notation" style="font-size: 10px">
            {#each FILES as file}
                <li class="notation-item">{file}</li>
            {/each}
        </div>
    {/if}
</div>

<style>
    .chessboard-container {
        --board-width: 800px;
        --board-height: 800px;
        --border-radius: 8px;

        --square-width: calc(var(--board-width) / 8);
        --square-height: calc(var(--board-height) / 8);

        --light-square-color: #fce4b2;
        --dark-square-color: #d08b18;
        --light-square-highlight: #fdf158;
        --dark-square-highlight: #e7c50b;
        --square-outline-color: white;
        --square-outline-width: 10px;

        --notation-font-size: 18px;
        --notation-width: 30px;
        --notation-color: #989795;
        --notation-gap: 20px;

        position: relative;
        display: grid;
        width: fit-content;
        height: fit-content;
        grid-template-columns: var(--notation-width) var(--board-width);
        grid-template-rows: var(--board-height) var(--notation-width);
        grid-template-areas:
            'rank-notation chessboard'
            '. file-notation';
        grid-gap: var(--notation-gap);
    }
    .notation-item {
        list-style: none;

        font-size: var(--font-size);
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        color: var(--notation-color);
    }
    .rank-notation {
        grid-area: rank-notation;

        width: var(--notation-width);
        height: var(--board-height);
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        text-align: center;
    }
    .file-notation {
        width: var(--board-height);
        height: var(--notation-width);
        grid-area: file-notation;
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
</style>
