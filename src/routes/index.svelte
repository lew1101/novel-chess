<script lang="ts">
    import ChessBoard from '@components/chess/ChessBoard.svelte';
    import Popup from '@components/popup.svelte';
    import { STARTING_FEN } from '@lib/chess/chess';

    export const ssr = false;
    export const router = false;
    export const prerender = true;
    export const hydrate = true;

    let fen = STARTING_FEN;

    let showPopUp = false;
    const popUpContent = { title: '', desc: '' };

    function handleGameEnd(e: CustomEvent) {
        updatePopupContent(e.detail.message);
        showPopUp = true;
    }

    function handleClosePopup(e: CustomEvent) {
        clearPopupContent();
        showPopUp = false;
    }

    function updatePopupContent(message: { title?: string; desc?: string }) {
        popUpContent.title = message.title;
        popUpContent.desc = message.desc;
    }

    function clearPopupContent() {
        popUpContent.title = '';
        popUpContent.desc = '';
    }
</script>

<div class="centered">
    <ChessBoard
        mode="INTERACTIVE"
        {fen}
        showNotation={true}
        --font-size="18px"
        on:gameEnd={handleGameEnd}
    />
</div>

{#if showPopUp}
    <Popup on:closeEvent={handleClosePopup}>
        <span slot="title">{popUpContent.title}</span>
        <span slot="desc">{popUpContent.desc}</span>
    </Popup>
{/if}

<style>
    .centered {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
