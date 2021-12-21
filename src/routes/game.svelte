<script lang="ts">
    import ChessBoard from "@components/chess/ChessBoard.svelte";
    import { STARTING_POS } from "@lib/engine/constants";
    import { ChessPosition } from "@lib/engine/position";
    import { writable } from "svelte/store";

    let chessBoard;
    let position = new ChessPosition(STARTING_POS);
</script>

<ChessBoard
    bind:this={chessBoard}
    mode="INTERACTIVE"
    position={writable(position)}
    showNotation={true}
    debug={true}
    --notation-font-size="16px"
/>
