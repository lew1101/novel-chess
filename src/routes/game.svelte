<script lang="ts">
    import * as constants from "$lib/engine/constants";
    import { writable } from "svelte/store";
    import ChessBoard from "$lib/components/chess/ChessBoard.svelte";

    const chessStore = writable([...constants.STARTING_POS]);
</script>

<ChessBoard id="bruh" debug={true} width={800} height={800} store={chessStore} />
