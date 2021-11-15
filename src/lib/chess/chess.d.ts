namespace Chess {
    type Rank = "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1";
    type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

    type WhitePiece = "K" | "Q" | "R" | "B" | "N" | "P";
    type BlackPiece = "k" | "q" | "r" | "b" | "n" | "p";
    type Piece = BlackPiece | WhitePiece;

    type EmptySquare = ".";

    type SquareValidValue = Piece | EmptySquare;
    type SquareInvalidValue = -1;
    type SquareValues = SquareValidValue | SquareInvalidValue;

    type Square = number;

    // prettier-ignore
    type Board = SquareValues[]
}
