<script lang="ts">
    import ChessBoard from '@components/chess/ChessBoard.svelte';
    import { STARTING_FEN } from '@lib/chess/chess';

    let fen = STARTING_FEN;
    // let fen = '8/3P4/8/8/8/8/4p3/8 w KQkq - 0 1';
</script>

<div class="container">
    <ChessBoard mode="INTERACTIVE" {fen} showNotation={true} debug={true} --font-size="18px" />
</div>

<style>
    .container {
        margin: auto;
    }
</style>
