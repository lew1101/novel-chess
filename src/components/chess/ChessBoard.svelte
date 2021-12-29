<script context="module" lang="ts">
    export type ViewMode = 'INTERACTIVE' | 'VIEW';
</script>

<script lang="ts">
    import ChessBoard from './subcomponents/board.svelte';
    import { STARTING_FEN, RANKS, FILES } from '@lib/chess/chess';

    /**
     * Parameters
     * @param {ViewMode} [mode="INTERACTIVE"] -  view mode
     * @param {Writable<ChessBoard120>} [position=writable(new Array())] - writable that reflects board state
     * @param {boolean} [flipped=false] - whether board is flipped
     * @param {boolean} [showNotation=false] - whether notation should be shown
     * @param {boolean} [showHints=true] - whether board should show hints
     * @param {boolean} [debug=false] - whether component is in debug mode
     *
     * CSS Parameters
     * @param [--wrapper-width=800px]
     * @param [--wrapper-height=800px]
     * @param [--notation-font-size=1em]
     * @param [--light-square-color=#fce4b2]
     * @param [--dark-square-color=#d08b18]
     * @param [--light-square-highlight=#fdf158]
     * @param [--light-square-highlight=#e7c50b]
     * @param [--square-outline-color=white]
     * @param [--square-outline-width=10px]
     *
     * @param [--board-width] - not recommended
     * @param [--board-height] - not recommended
     */

    export let mode: ViewMode = 'INTERACTIVE';
    export let fen: string = STARTING_FEN;
    export let flipped: boolean = false;
    export let showNotation: boolean = false;
    export let showHints: boolean = true;
    export let debug: boolean = false;
</script>

<div class="chessboard-wrapper">
    <ChessBoard {fen} {debug} {mode} {flipped} {showNotation} {showHints} />
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
    .chessboard-wrapper {
        width: var(--wrapper-width, 800px);
        height: var(--wrapper-height, 800px);

        position: relative;
        display: grid;
        grid-template-columns: 5% 1fr;
        grid-template-rows: 1fr 5%;
        grid-template-areas:
            'rank-notation chessboard'
            '. file-notation';
        grid-gap: 0.5em;
    }
    .notation-item {
        list-style: none;
        font-size: var(--font-size, 1em);
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
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
