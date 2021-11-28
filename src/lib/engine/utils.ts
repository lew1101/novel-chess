import * as constants from "./constants";

export function isPiece(x: any): x is Chess.Piece {
    return constants.PIECES.includes(x);
}

export function printBoard(board: Chess.ChessBoard) {
    const PIECE_UNICODE = {
        [constants.WHITE_KING]: "/assets/chess-pieces/chess_wK45.svg",
        [constants.WHITE_QUEEN]: "/assets/chess-pieces/chess_wQ45.svg",
        [constants.WHITE_ROOK]: "/assets/chess-pieces/chess_wR45.svg",
        [constants.WHITE_BISHOP]: "/assets/chess-pieces/chess_wB45.svg",
        [constants.WHITE_KNIGHT]: "/assets/chess-pieces/chess_wN45.svg",
        [constants.WHITE_PAWN]: "/assets/chess-pieces/chess_wP45.svg",
        [constants.BLACK_KING]: "/assets/chess-pieces/chess_bK45.svg",
        [constants.BLACK_QUEEN]: "/assets/chess-pieces/chess_bQ45.svg",
        [constants.BLACK_ROOK]: "/assets/chess-pieces/chess_bR45.svg",
        [constants.BLACK_BISHOP]: "/assets/chess-pieces/chess_bB45.svg",
        [constants.BLACK_KNIGHT]: "/assets/chess-pieces/chess_bN45.svg",
        [constants.BLACK_PAWN]: "/assets/chess-pieces/chess_bP45.svg",
    };
}
