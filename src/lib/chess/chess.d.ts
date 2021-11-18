namespace Chess {
    type Rank = "8" | "7" | "6" | "5" | "4" | "3" | "2" | "1";
    type File = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h";

    type WhitePiece = "K" | "Q" | "R" | "B" | "N" | "P";
    type BlackPiece = "k" | "q" | "r" | "b" | "n" | "p";
    type Piece = BlackPiece | WhitePiece;

    type EmptySquare = ".";

    type MoveType = 0 | 1 | 2 | 3;

    type SquareValidValue = Piece | EmptySquare;
    type SquareInvalidValue = -1;
    type SquareValues = SquareValidValue | SquareInvalidValue;

    // prettier-ignore
    type Board120 = SquareValues[]
    type Board64 = SquareValidValue[];
}
