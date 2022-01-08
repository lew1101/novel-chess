<script context="module" lang="ts">
    export type ViewMode = 'INTERACTIVE' | 'VIEW';
</script>

<script lang="ts">
    import { assets } from '$app/paths';
    import { writable } from 'svelte/store';
    import { createEventDispatcher, onMount } from 'svelte';

    import ChessBoard from './subcomponents/board.svelte';
    import ChessPromotionBar from './subcomponents/promotionBar.svelte';
    import Chess, {
        STARTING_FEN,
        RANKS,
        FILES,
        Color,
        Piece,
        Moves,
        GameEndFlag,
    } from '@lib/chess/chess';

    const PIECE_IMAGE_URLS = {
        [Piece.WHITE_KING]: assets + '/assets/chess-pieces/chess_wK45.svg',
        [Piece.WHITE_QUEEN]: assets + '/assets/chess-pieces/chess_wQ45.svg',
        [Piece.WHITE_ROOK]: assets + '/assets/chess-pieces/chess_wR45.svg',
        [Piece.WHITE_BISHOP]: assets + '/assets/chess-pieces/chess_wB45.svg',
        [Piece.WHITE_KNIGHT]: assets + '/assets/chess-pieces/chess_wN45.svg',
        [Piece.WHITE_PAWN]: assets + '/assets/chess-pieces/chess_wP45.svg',
        [Piece.BLACK_KING]: assets + '/assets/chess-pieces/chess_bK45.svg',
        [Piece.BLACK_QUEEN]: assets + '/assets/chess-pieces/chess_bQ45.svg',
        [Piece.BLACK_ROOK]: assets + '/assets/chess-pieces/chess_bR45.svg',
        [Piece.BLACK_BISHOP]: assets + '/assets/chess-pieces/chess_bB45.svg',
        [Piece.BLACK_KNIGHT]: assets + '/assets/chess-pieces/chess_bN45.svg',
        [Piece.BLACK_PAWN]: assets + '/assets/chess-pieces/chess_bP45.svg',
    };

    export let mode: ViewMode = 'INTERACTIVE';
    export let fen: string = STARTING_FEN;
    export let flipped: boolean = false;
    export let showNotation: boolean = true;
    export let showHints: boolean = true;
    export let debug: boolean = false;

    export const chess = Chess();
    chess.load(fen);

    export const position = writable(chess.board);
    export const updatePosition = () => ($position = chess.board);

    const dispatch = createEventDispatcher();
    onMount(() => (window['Chess'] = chess)); // expose chess object

    // ===============================================

    let _from: number = null;
    let _to: number = null;
    let _dragColor: Color = null;
    let _movesObj: Moves = null;
    let _validMoveSquares: number[] = [];
    // brace yourself for the monster below

    let _showPromotionBar: boolean = false;
    let _promotionBarState: {
        reversed: boolean;
        file: number;
        pieceColor: Color;
    };

    function clearMembers() {
        _from = null;
        _to = null;
        _dragColor = null;
        _movesObj = null;
        _validMoveSquares = [];
        _showPromotionBar = false;
        _promotionBarState = null;
    }

    // ===============================================
    // DRAGGING HANDLERS
    // ===============================================

    function handlePieceMoveStart(e: CustomEvent): void {
        _from = e.detail.square;
        _dragColor = chess.utils.getPieceColor($position[_from]);

        if (_dragColor === chess.turn) {
            _movesObj = chess.getMovesForSquare(_from);
            _validMoveSquares = _movesObj?.moves.map((move) => move.to) || [];
        } else {
            _movesObj = null;
            _validMoveSquares = [];
        }
    }

    function handlePieceMoveEnd(e: CustomEvent): void {
        _to = e.detail.square;
        const moveIndex = _validMoveSquares.indexOf(_to);

        if (_movesObj?.isPromotion) {
            e.detail.reject();
            return showPromotionBar();
        }
        if (_dragColor === chess.turn && moveIndex !== -1) {
            let move = _movesObj?.moves[moveIndex];
            if (move) {
                chess.executeMove(move);
                const endFlag = chess.state.getGameEndFlag();
                if (endFlag !== 0) handleGameEnd(endFlag);
            }
            updatePosition();
        } else e.detail.reject();

        clearMembers();
    }

    function handleGameEnd(flag: GameEndFlag) {
        dispatch('gameEnd', {
            flag,
            message: chess.state.getGameEndMessage(flag, chess.turn),
        });
    }

    // ===============================================
    // PROMOTION HANDLERS
    // ===============================================

    function showPromotionBar() {
        _promotionBarState = {
            reversed: _dragColor === Color.BLACK,
            file: chess.utils.file(_movesObj.square),
            pieceColor: _dragColor,
        };
        _showPromotionBar = true;
    }

    function handlePromotion(e: CustomEvent) {
        const promotionTarget = +e.detail.pieceType; // convert to number
        if (promotionTarget !== null) {
            const promotionMove = _movesObj?.moves.find(
                (move) => move.promoteTo === promotionTarget
            );
            if (promotionMove) chess.executeMove(promotionMove);
            updatePosition();
        }

        clearMembers();
    }

    if (debug) {
        position.subscribe(() => {
            console.log('Position Updated');
            chess.utils.printBoard($position);
        });
    }
</script>

<div class="chessboard-container">
    <ChessBoard
        {chess}
        {position}
        {mode}
        {flipped}
        highlightedSquares={showHints ? _validMoveSquares : []}
        pieceImageUrls={PIECE_IMAGE_URLS}
        on:pienpmce-move-start={handlePieceMoveStart}
        on:piece-move-end={handlePieceMoveEnd}
    />
    {#if _showPromotionBar}
        <ChessPromotionBar
            file={_promotionBarState.file}
            reversed={_promotionBarState.reversed}
            pieceColor={_promotionBarState.pieceColor}
            pieceImageUrls={PIECE_IMAGE_URLS}
            on:promotion-select={handlePromotion}
        />
    {/if}
    {#if showNotation}
        <div class="rank-notation" style="font-size: 10px">
            {#each RANKS as rank}
                <li class="notation-item">{rank}</li>
            {/each}
        </div>
        <div class="file-notation" style="font-size: 10px">
            {#each FILES as file}
                <li class="notation-item">{file}</li>
            {/each}
        </div>
    {/if}
</div>

<style>
    .chessboard-container {
        --board-width: 70vh;
        --board-height: 70vh;
        --border-radius: 8px;

        --square-width: calc(var(--board-width) / 8);
        --square-height: calc(var(--board-height) / 8);

        --light-square-color: #fce4b2;
        --dark-square-color: #d08b18;
        --light-square-highlight: #fdf158;
        --dark-square-highlight: #e7c50b;
        --square-outline-color: white;
        --square-outline-width: 10px;

        --notation-font-size: 2em;
        --notation-width: 30px;
        --notation-color: #989795;
        --notation-gap: 20px;

        position: relative;
        display: grid;
        width: fit-content;
        height: fit-content;
        grid-template-columns: var(--notation-width) var(--board-width);
        grid-template-rows: var(--board-height) var(--notation-width);
        grid-template-areas:
            'rank-notation chessboard'
            '. file-notation';
        grid-gap: var(--notation-gap);
    }

    @media only screen and (orientation: portrait) {
        .chessboard-container {
            --board-width: 70vw;
            --board-height: 70vw;
        }
    }
    .notation-item {
        list-style: none;

        font-size: var(--notation-font-size);
        font-weight: bold;
        font-family: 'Roboto', sans-serif;
        color: var(--notation-color);
    }
    .rank-notation {
        grid-area: rank-notation;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        text-align: center;
    }
    .file-notation {
        grid-area: file-notation;
        display: flex;
        justify-content: space-around;
        text-align: center;
    }
</style>
