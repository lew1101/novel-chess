namespace Chess {
    type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";
    type Rank = "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1";
    type Notation = File & Rank;

    type WhitePiece = "K" | "Q" | "R" | "B" | "N" | "P";
    type BlackPiece = "k" | "q" | "r" | "b" | "n" | "p";
    type Piece = BlackPiece | WhitePiece;

    type EmptySquare = ".";

    type ValidSquare = Piece | EmptySquare | InvalidSquare;
    type InvalidSquare = -1;

    type ChessBoard = ValidSquare[];
}
