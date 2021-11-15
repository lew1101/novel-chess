namespace Chess {
    type WhitePiece = "K" | "Q" | "R" | "B" | "N" | "P";
    type BlackPiece = "k" | "q" | "r" | "b" | "n" | "p";
    type Piece = BlackPiece | WhitePiece;

    type EmptySquare = ".";

    type ValidSquare = Piece | EmptySquare;
    type InvalidSquare = -1;
    type Square = ValidSquare | InvalidSquare;

    // prettier-ignore
    type Board = Square[]
}
