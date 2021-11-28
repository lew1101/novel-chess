export const RANKS: Chess.Rank[] = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const FILES: Chess.File[] = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const EMPTY: Chess.EmptySquare = ".";
export const INVALID_SQUARE: Chess.InvalidSquare = -1;

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

export const WHITE_PIECES: Chess.WhitePiece[] = [
    WHITE_KING,
    WHITE_QUEEN,
    WHITE_ROOK,
    WHITE_BISHOP,
    WHITE_KNIGHT,
    WHITE_PAWN,
];
export const BLACK_PIECES: Chess.BlackPiece[] = [
    BLACK_KING,
    BLACK_QUEEN,
    BLACK_ROOK,
    BLACK_BISHOP,
    BLACK_KNIGHT,
    BLACK_PAWN,
];
export const PIECES: Chess.Piece[] = [...WHITE_PIECES, ...BLACK_PIECES];

export const TYPICAL_MOVE = 0;
export const CASTLE_MOVE = 1;
export const PROMOTION_MOVE = 2;
export const ENPASSANT_MOVE = 3;

export const MOVE_TYPES = [TYPICAL_MOVE, CASTLE_MOVE, PROMOTION_MOVE, ENPASSANT_MOVE];

//prettier-ignore
export const STARTING_POS: Chess.ChessBoard = [
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
export const EMPTY_BOARD: Chess.ChessBoard = [
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
]

// prettier-ignore
export const squareToCoords = [
    "a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8",
    "a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7",
    "a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6",
    "a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5",
    "a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4",
    "a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3",
    "a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2",
    "a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1",
]
