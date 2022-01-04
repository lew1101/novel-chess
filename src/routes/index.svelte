<script lang="ts">
    import ChessBoard from '@components/chess/ChessBoard.svelte';
    import { STARTING_FEN } from '@lib/chess/chess';

    export const ssr = false;
    export const router = false;
    export const prerender = true;
    export const hydrate = true;

    let fen = STARTING_FEN;
</script>

<div class="centered">
    <ChessBoard mode="INTERACTIVE" {fen} showNotation={true} --font-size="18px" />
</div>

<style>
    .centered {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
