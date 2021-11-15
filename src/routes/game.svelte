<script lang="ts">
    import * as constants from "$lib/chess/constants";
    import { writable } from "svelte/store";
    import ChessBoard from "$lib/components/chess/ChessBoard.svelte";

    let chessStore = writable(constants.STARTING_POS);

    function onMoveCallback(initialSquare: number, finalSquare: number): boolean {
        return true;
    }
</script>

<ChessBoard
    debug={true}
    width={800}
    height={800}
    interactive={true}
    showNotation={true}
    store={chessStore}
    {onMoveCallback}
/>
