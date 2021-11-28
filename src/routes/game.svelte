<script lang="ts">
    import * as constants from "$lib/engine/constants";
    import { writable } from "svelte/store";
    import ChessBoard from "$lib/components/chess/ChessBoard.svelte";
</script>

<ChessBoard debug={true} width={800} height={800} />
