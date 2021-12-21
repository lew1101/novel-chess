import * as constants from "./constants";

export function isPiece(x: any): x is Chess.Piece {
    return constants.PIECES.includes(x);
}

export function getColorOfPiece(x: Chess.Piece) {
    if (!isPiece(x)) return -1;
    else if (isWhitePiece(x)) return "w";
    else return "b";
}

export function isWhitePiece(x: any): x is Chess.WhitePiece {
    return constants.WHITE_PIECES.includes(x);
}

export function isBlackPiece(x: any): x is Chess.BlackPiece {
    return constants.BLACK_PIECES.includes(x);
}
