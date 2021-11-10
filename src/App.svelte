<script>
    import { writable } from "svelte/store";
    import { STARTING_POS } from "./chess/constants";

    import ChessBoard from "./components/chess/Chessboard.svelte";

    let chessStore = writable(STARTING_POS);
</script>

<main>
    <div class="wrapper">
        <ChessBoard debug={true} class="chessboard" size="800" store={chessStore} />
    </div>
</main>

<style>
    .wrapper {
        display: table;
        margin: 0 auto;
    }
</style>
