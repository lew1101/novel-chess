<script lang="ts">
    import * as constants from "$lib/chess/constants";
    import { writable } from "svelte/store";
    import ChessBoard from "$lib/components/chess/ChessBoard.svelte";

    let chessStore = writable(constants.STARTING_POS);
</script>

<ChessBoard store={chessStore} />
