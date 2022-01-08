<script lang="ts">
    import { onMount } from 'svelte';

    import ChessBoard from '@components/chess/ChessBoard.svelte';
    import Popup from '@components/popup.svelte';
    import Button from '@components/button.svelte';
    import { STARTING_FEN } from '@lib/chess/chess';

    import type { Move } from '@lib/chess/chess';

    //=============================

    export const ssr = false;
    export const router = false;
    export const prerender = true;
    export const hydrate = true;

    let _boardInstance;

    //=============================

    function newGame(e) {
        _boardInstance.chess.load(STARTING_FEN);
        _boardInstance.updatePosition();
    }

    let _redoMoves: Move[] = [];

    let _canUndo: boolean;
    let _canRedo: boolean;

    let _moveByUndoOrRedo: boolean;

    const _updateUndoState = () => {
        if (!_moveByUndoOrRedo) {
            _redoMoves = [];
        }

        _canUndo = _boardInstance.chess.history.count() > 0;
        _canRedo = _redoMoves.length > 0;
        _moveByUndoOrRedo = false;
    };

    onMount(() => _boardInstance.position.subscribe(_updateUndoState));

    function undoMove(e) {
        if (_canUndo) {
            const move = _boardInstance.chess.undoMove();

            _moveByUndoOrRedo = true;
            _redoMoves.push(move);
            _boardInstance.updatePosition();
        }
    }

    function redoMove(e) {
        if (_canRedo) {
            const move = _redoMoves.pop();

            _moveByUndoOrRedo = true;
            _boardInstance.chess.executeMove(move);
            _boardInstance.updatePosition();
        }
    }

    //=============================
    // Popup
    //=============================

    let _showPopUp = false;
    const _popUpContent = { title: '', desc: '' };

    function handleGameEnd(e: CustomEvent) {
        updatePopupContent(e.detail.message);
        _showPopUp = true;
    }

    function handleClosePopup(e: CustomEvent) {
        clearPopupContent();
        _showPopUp = false;
    }

    function updatePopupContent(message: { title?: string; desc?: string }) {
        _popUpContent.title = message.title;
        _popUpContent.desc = message.desc;
    }

    function clearPopupContent() {
        _popUpContent.title = '';
        _popUpContent.desc = '';
    }
</script>

<div class="main-content">
    <ChessBoard
        bind:this={_boardInstance}
        mode="INTERACTIVE"
        fen={STARTING_FEN}
        showNotation={true}
        on:gameEnd={handleGameEnd}
    />

    <div>
        <Button on:click={newGame}>New Game</Button>
        <Button on:click={undoMove} disabled={!_canUndo}>Undo</Button>
        <Button on:click={redoMove} disabled={!_canRedo}>Redo</Button>
    </div>
</div>

{#if _showPopUp}
    <Popup on:closeEvent={handleClosePopup}>
        <span slot="title">{_popUpContent.title}</span>
        <span slot="desc">{_popUpContent.desc}</span>
    </Popup>
{/if}

<style>
    .main-content {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
