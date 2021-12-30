<script lang="ts" context="module">
    import { Piece } from '@lib/chess/chess';
    export const PIECE_IMAGE_URLS = {
        [Piece.WHITE_KING]: '/assets/chess-pieces/chess_wK45.svg',
        [Piece.WHITE_QUEEN]: '/assets/chess-pieces/chess_wQ45.svg',
        [Piece.WHITE_ROOK]: '/assets/chess-pieces/chess_wR45.svg',
        [Piece.WHITE_BISHOP]: '/assets/chess-pieces/chess_wB45.svg',
        [Piece.WHITE_KNIGHT]: '/assets/chess-pieces/chess_wN45.svg',
        [Piece.WHITE_PAWN]: '/assets/chess-pieces/chess_wP45.svg',
        [Piece.BLACK_KING]: '/assets/chess-pieces/chess_bK45.svg',
        [Piece.BLACK_QUEEN]: '/assets/chess-pieces/chess_bQ45.svg',
        [Piece.BLACK_ROOK]: '/assets/chess-pieces/chess_bR45.svg',
        [Piece.BLACK_BISHOP]: '/assets/chess-pieces/chess_bB45.svg',
        [Piece.BLACK_KNIGHT]: '/assets/chess-pieces/chess_bN45.svg',
        [Piece.BLACK_PAWN]: '/assets/chess-pieces/chess_bP45.svg',
    };
</script>

<script lang="ts">
    import ChessSquare from './square.svelte';
    import ChessPiece from './piece.svelte';
    import ChessPromotionBar from './promotionBar.svelte';
    import { getOffsetRect } from '@utils/bounding';
    import type { ViewMode } from '../ChessBoard.svelte';

    import { writable } from 'svelte/store';
    import type { Writable } from 'svelte/store';

    import Chess, { Color } from '@lib/chess/chess';
    import type { ChessInstance, ChessBoard120, Moves } from '@lib/chess/chess';

    // ===============================================

    const chess: ChessInstance = Chess();
    const { constants, utils } = chess;

    export let fen: string;
    export let debug: boolean;
    export let mode: ViewMode;
    export let flipped: boolean;
    export let showNotation: boolean;
    export let showHints: boolean;

    // ===============================================

    chess.load(fen);

    let position: Writable<ChessBoard120> = writable(chess.board);
    let _boardRef;

    // ===============================================

    function getSquareFromXY(x: number, y: number) {
        const boardRect = getOffsetRect(_boardRef); // math time
        const r = ~~(((y - boardRect.y) / boardRect.height) * 8);
        const f = ~~(((x - boardRect.x) / boardRect.width) * 8);
        // rank and file in range ? return square in mailbox form : return null
        return r >= 0 && r <= 7 && f >= 0 && f <= 7 ? constants.MAILBOX64[r * 8 + f] : null;
    }

    function updatePosition() {
        $position = chess.board;
    }

    // ===============================================

    let _from: number = null;
    let _to: number = null;
    let _dragColor: Color = null;
    let _movesObj: Moves = null;
    let _validMoveSquares: number[] = [];
    // brace yourself for the monster below

    let _showPromotionBar: boolean = false;
    let _promotionBarConfig: {
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
        _promotionBarConfig = null;
    }

    // ===============================================
    // DRAGGING HANDLERS
    // ===============================================

    function handleMoveStart(e: CustomEvent): void {
        _from = getSquareFromXY(e.detail.mouseX, e.detail.mouseY);
        _dragColor = utils.getPieceColor($position[_from]);

        if (_dragColor === chess.turn) {
            _movesObj = chess.getMovesForSquare(_from);
            _validMoveSquares = _movesObj?.moves.map((move) => move.to) || [];
        } else {
            _movesObj = null;
            _validMoveSquares = [];
        }
    }

    function handleMoveEnd(e: CustomEvent): void {
        _to = getSquareFromXY(e.detail.mouseX, e.detail.mouseY); // board64
        const moveIndex = _validMoveSquares.indexOf(_to);

        if (_movesObj?.isPromotion) {
            e.detail.reject();
            return showPromotionBar();
        }
        if (_dragColor === chess.turn && moveIndex !== -1) {
            let move = _movesObj?.moves[moveIndex];
            if (move) chess.executeMove(move);
            updatePosition();
        } else e.detail.reject();

        clearMembers();
    }

    // ===============================================
    // PROMOTION HANDLERS
    // ===============================================

    function showPromotionBar() {
        _promotionBarConfig = {
            reversed: _dragColor === Color.BLACK,
            file: utils.file(_movesObj.square),
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

    const printBoard = (board: ChessBoard120) => console.log(utils.boardAsUnicode(board));

    if (debug) {
        position.subscribe(() => {
            console.log('Position Updated');
            printBoard($position);
        });
    }
</script>

<div class="chess-board" bind:this={_boardRef}>
    {#each utils.getMailboxAsBoard64(flipped ? $position.reverse() : $position) as square, i}
        <ChessSquare
            isDarkSquare={!Boolean((~~(i / 8) + (i % 8)) % 2)}
            hasHighlight={showHints && _validMoveSquares.includes(constants.MAILBOX64[i])}
            hasBorder={false}
        >
            {#if utils.isPiece(square)}
                <ChessPiece
                    type={square}
                    draggable={mode === 'INTERACTIVE'}
                    pieceImageUrls={PIECE_IMAGE_URLS}
                    on:move-start={handleMoveStart}
                    on:move-end={handleMoveEnd}
                />
            {/if}
        </ChessSquare>
    {/each}
</div>

{#if _showPromotionBar}
    <ChessPromotionBar
        file={_promotionBarConfig.file}
        reversed={_promotionBarConfig.reversed}
        pieceColor={_promotionBarConfig.pieceColor}
        pieceImageUrls={PIECE_IMAGE_URLS}
        on:promotion-select={handlePromotion}
    />
{/if}

<style>
    .chess-board {
        width: var(--board-width, 800px);
        height: var(--board-height, 800px);

        display: inline-grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        gap: 0, 0;
        justify-items: stretch;
        overflow: hidden;
        border-radius: var(--border-radius, 8px);
        user-select: none;
    }
</style>
