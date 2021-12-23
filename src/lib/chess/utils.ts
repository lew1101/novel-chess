import {
    Piece,
    Color,
    WhitePiece,
    BlackPiece,
    PieceType,
    PIECE_AS_UNICODE_REPR,
    MAILBOX120,
    MAILBOX64,
} from "./constants";

import type { ChessBoard64, ChessBoard120 } from "./constants";

export function isPiece(x: any): x is Piece {
    return x in Piece;
}

export function getPieceColor(p: Piece): Color | -1 {
    if (p in WhitePiece) return Color.WHITE;
    else if (p in BlackPiece) return Color.BLACK;
    else return -1;
}

export function getPieceType(p: Piece): PieceType | -1 {
    switch (p) {
        case Piece.WHITE_KING:
        case Piece.BLACK_KING:
            return PieceType.KING;
        case Piece.WHITE_QUEEN:
        case Piece.BLACK_QUEEN:
            return PieceType.QUEEN;
        case Piece.WHITE_ROOK:
        case Piece.BLACK_ROOK:
            return PieceType.ROOK;
        case Piece.WHITE_BISHOP:
        case Piece.BLACK_BISHOP:
            return PieceType.BISHOP;
        case Piece.WHITE_KNIGHT:
        case Piece.BLACK_KNIGHT:
            return PieceType.KNIGHT;
        case Piece.WHITE_PAWN:
        case Piece.BLACK_PAWN:
            return PieceType.PAWN;
        default:
            return -1;
    }
}

export function printBoard(board: ChessBoard120): void;
export function printBoard(board: ChessBoard64): void {
    if (board.length === 120) board = getMailboxAsBoard64(board);
    else if (board.length !== 64) return console.log("Board passed does not match any overloads.");
    let output = "",
        rank = 8;
    for (let i = 0; i < 8; i++) {
        output += rank + " ";
        rank--;
        for (let j = 0; j < 8; j++) {
            output += PIECE_AS_UNICODE_REPR[board[i * 8 + j]] + " ";
        }
        output += "\n";
    }
    output += "  a b c d e f g h";
    console.log(output);
}

export function getBoard64AsMailbox(board: ChessBoard64): ChessBoard120 {
    let mailbox = [];
    for (let i of MAILBOX120) {
        if (i === -1) mailbox.push(-1);
        else mailbox.push(board[i]);
    }
    return mailbox;
}

export function getMailboxAsBoard64(mailbox: ChessBoard120): ChessBoard64 {
    let board = [];
    for (let i of MAILBOX64) {
        board.push(mailbox[i]);
    }
    return board;
}
