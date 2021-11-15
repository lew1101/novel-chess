export const RANKS: Chess.Rank[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const FILES: Chess.File[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const EMPTY: Chess.EmptySquare = ".";

export const WHITE_KING: Chess.WhitePiece = "K";
export const WHITE_QUEEN: Chess.WhitePiece = "Q";
export const WHITE_ROOK: Chess.WhitePiece = "R";
export const WHITE_BISHOP: Chess.WhitePiece = "B";
export const WHITE_KNIGHT: Chess.WhitePiece = "N";
export const WHITE_PAWN: Chess.WhitePiece = "P";

export const BLACK_KING: Chess.BlackPiece = "k";
export const BLACK_QUEEN: Chess.BlackPiece = "q";
export const BLACK_ROOK: Chess.BlackPiece = "r";
export const BLACK_BISHOP: Chess.BlackPiece = "b";
export const BLACK_KNIGHT: Chess.BlackPiece = "n";
export const BLACK_PAWN: Chess.BlackPiece = "p";

export const WHITE_PIECES = [
    WHITE_KING,
    WHITE_QUEEN,
    WHITE_ROOK,
    WHITE_BISHOP,
    WHITE_KNIGHT,
    WHITE_PAWN,
];
export const BLACK_PIECES = [
    BLACK_KING,
    BLACK_QUEEN,
    BLACK_ROOK,
    BLACK_BISHOP,
    BLACK_KNIGHT,
    BLACK_PAWN,
];

export const PIECES = [...WHITE_PIECES, ...BLACK_PIECES];

//prettier-ignore
export const STARTING_POS: Chess.Board = [
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1, 
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1, 
    -1, "r", "n", "b", "q", "k", "b", "n", "r",  -1,
    -1, "p", "p", "p", "p", "p", "p", "p", "p",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1, 
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1, 
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1, 
    -1, "P", "P", "P", "P", "P", "P", "P", "P",  -1,
    -1, "R", "N", "B", "Q", "K", "B", "N", "R",  -1,
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1, 
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1, 
];

// prettier-ignore
export const EMPTY_BOARD: Chess.Board = [
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1, ".", ".", ".", ".", ".", ".", ".", ".",  -1,
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,
    -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,
];

// prettier-ignore
export const MAILBOX120 = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 0,  1 ,  2 , 3,  4,  5,  6,  7, -1,
    -1, 8,  9 , 10, 11, 12, 13, 14, 15, -1,
    -1, 16, 17, 18, 19, 20, 21, 22, 23, -1,
    -1, 24, 25, 26, 27, 28, 29, 30, 31, -1,
    -1, 32, 33, 34, 35, 36, 37, 38, 39, -1,
    -1, 40, 41, 42, 43, 44, 45, 46, 47, -1,
    -1, 48, 49, 50, 51, 52, 53, 54, 55, -1,
    -1, 56, 57, 58, 59, 60, 61, 62, 63, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
];

// prettier-ignore
export const MAILBOX64 = [
    21, 22, 23, 24, 25, 26, 27, 28,
    31, 32, 33, 34, 35, 36, 37, 38,
    41, 42, 43, 44, 45, 46, 47, 48,
    51, 52, 53, 54, 55, 56, 57, 58,
    61, 62, 63, 64, 65, 66, 67, 68,
    71, 72, 73, 74, 75, 76, 77, 78,
    81, 82, 83, 84, 85, 86, 87, 88,
    91, 92, 93, 94, 95, 96, 97, 98,
];
