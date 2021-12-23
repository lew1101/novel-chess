/**
 * * -1 - INVALID
 * * 0 - EMPTY
 *
 * * PieceType
 * * 1 - PAWN
 * * 2 - KNIGHT
 * * 3 - BISHOP
 * * 4 - ROOK
 * * 5 - QUEEN
 * * 6 - KING
 *
 * * Color
 * * 10 - WHITE
 * * 20 - BLACK
 *
 * * Piece
 * * 11 - WHITE PAWN
 * * 12 - WHITE KNIGHT
 * * 13 - WHITE BISHOP
 * * 14 - WHITE ROOK
 * * 15 - WHITE QUEEN
 * * 16 - WHITE KING
 *
 * * 21 - BLACK PAWN
 * * 22 - BLACK KNIGHT
 * * 23 - BLACK BISHOP
 * * 24 - BLACK ROOK
 * * 25 - BLACK QUEEN
 * * 26 - BLACK KING
 */
/** */

export type ValidSquare = typeof EMPTY | Piece;
export type InvalidSquare = typeof INVALID_SQUARE;
export type ChessBoard64 = ValidSquare[];
export type ChessBoard120 = (ValidSquare | InvalidSquare)[];

export const EMPTY = 0;
export const INVALID_SQUARE = -1;

export enum Color {
    WHITE = 10,
    BLACK = 20,
}

export enum PieceType {
    PAWN = 1,
    KNIGHT = 2,
    BISHOP = 3,
    ROOK = 4,
    QUEEN = 5,
    KING = 6,
}

export enum Piece {
    WHITE_PAWN = Color.WHITE + PieceType.PAWN,
    WHITE_KNIGHT = Color.WHITE + PieceType.KNIGHT,
    WHITE_BISHOP = Color.WHITE + PieceType.BISHOP,
    WHITE_ROOK = Color.WHITE + PieceType.ROOK,
    WHITE_QUEEN = Color.WHITE + PieceType.QUEEN,
    WHITE_KING = Color.WHITE + PieceType.KING,
    BLACK_PAWN = Color.BLACK + PieceType.PAWN,
    BLACK_KNIGHT = Color.BLACK + PieceType.KNIGHT,
    BLACK_BISHOP = Color.BLACK + PieceType.BISHOP,
    BLACK_ROOK = Color.BLACK + PieceType.ROOK,
    BLACK_QUEEN = Color.BLACK + PieceType.QUEEN,
    BLACK_KING = Color.BLACK + PieceType.KING,
}

export enum WhitePiece {
    PAWN = Piece.WHITE_PAWN,
    KNIGHT = Piece.WHITE_KNIGHT,
    BISHOP = Piece.WHITE_BISHOP,
    ROOK = Piece.WHITE_ROOK,
    QUEEN = Piece.WHITE_QUEEN,
    KING = Piece.WHITE_KING,
}

export enum BlackPiece {
    PAWN = Piece.BLACK_PAWN,
    KNIGHT = Piece.BLACK_KNIGHT,
    BISHOP = Piece.BLACK_BISHOP,
    ROOK = Piece.BLACK_ROOK,
    QUEEN = Piece.BLACK_QUEEN,
    KING = Piece.BLACK_KING,
}

export const SYMBOL_AS_CHAR = {
    [INVALID_SQUARE]: "x",
    [EMPTY]: ".",

    [Piece.WHITE_KING]: "K",
    [Piece.WHITE_QUEEN]: "Q",
    [Piece.WHITE_ROOK]: "R",
    [Piece.WHITE_BISHOP]: "B",
    [Piece.WHITE_KNIGHT]: "N",
    [Piece.WHITE_PAWN]: "P",

    [Piece.BLACK_KING]: "k",
    [Piece.BLACK_QUEEN]: "q",
    [Piece.BLACK_ROOK]: "r",
    [Piece.BLACK_BISHOP]: "b",
    [Piece.BLACK_KNIGHT]: "n",
    [Piece.BLACK_PAWN]: "p",
};

export const CHAR_AS_SYMBOL = {
    x: INVALID_SQUARE,
    ".": EMPTY,

    K: Piece.WHITE_KING,
    Q: Piece.WHITE_QUEEN,
    R: Piece.WHITE_ROOK,
    B: Piece.WHITE_BISHOP,
    N: Piece.WHITE_KNIGHT,
    P: Piece.WHITE_PAWN,

    k: Piece.BLACK_KING,
    q: Piece.BLACK_QUEEN,
    r: Piece.BLACK_ROOK,
    b: Piece.BLACK_BISHOP,
    n: Piece.BLACK_KNIGHT,
    p: Piece.BLACK_PAWN,
};

export const PIECE_AS_UNICODE_REPR = {
    [EMPTY]: ".",
    [Piece.WHITE_KING]: "♚",
    [Piece.WHITE_QUEEN]: "♛",
    [Piece.WHITE_ROOK]: "♜",
    [Piece.WHITE_BISHOP]: "♝",
    [Piece.WHITE_KNIGHT]: "♞",
    [Piece.WHITE_PAWN]: "♟",
    [Piece.BLACK_KING]: "♔",
    [Piece.BLACK_QUEEN]: "♕",
    [Piece.BLACK_ROOK]: "♖",
    [Piece.BLACK_BISHOP]: "♗",
    [Piece.BLACK_KNIGHT]: "♘",
    [Piece.BLACK_PAWN]: "♙",
};

export const COLOR_AS_CHAR = {
    [Color.WHITE]: "w",
    [Color.BLACK]: "b",
};

export const CHAR_AS_COLOR = {
    w: Color.WHITE,
    b: Color.BLACK,
};

export const RANKS = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

//prettier-ignore
export const STARTING_POS = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, 24, 22, 23, 25, 26, 23, 22, 24, -1, 
    -1, 21, 21, 21, 21, 21, 21, 21, 21, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1,
    -1, 11, 11, 11, 11, 11, 11, 11, 11, -1, 
    -1, 14, 12, 13, 15, 16, 13, 12, 14, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];

// prettier-ignore
export const EMPTY_BOARD = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1,  0,  0,  0,  0,  0,  0,  0,  0, -1, 
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
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
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
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
]

// prettier-ignore
export const SQUARE_TO_COORDS = [
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
]
