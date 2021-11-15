import * as constants from "./constants";

export function isPiece(x: any): x is Chess.Piece {
    return constants.PIECES.hasOwnProperty(x);
}
