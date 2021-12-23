import { EMPTY, EMPTY_BOARD, Color } from "./constants";
import type { ChessBoard120 } from "./constants";
import { getPieceColor, getPieceType } from "./utils";

export type ChessPositionInstance = InstanceType<typeof ChessPosition>;
export default class ChessPosition {
    board: ChessBoard120;
    turn: Color;
    castlingRights: boolean[]; // [K, Q, k, q]
    enpassant: number;
    halfmoveClock: number;
    fullmoveNumber: number;

    constructor(
        board: ChessBoard120 = EMPTY_BOARD,
        turn: Color = Color.WHITE,
        castlingRights: boolean[] = [true, true, true, true],
        enpassant: number = null,
        halfmoveClock: number = 0,
        fullmoveNumber: number = 1
    ) {
        this.board = board;
        this.turn = turn;
        this.castlingRights = castlingRights;
        this.enpassant = enpassant;
        this.halfmoveClock = halfmoveClock;
        this.fullmoveNumber = fullmoveNumber;
    }

    move(initial: number, final: number): ChessPosition {
        // DOES NOT DO VALIDITY CHECKS
        const ret = this.copy();
        ret.board[final] = ret.board[initial];
        ret.board[initial] = EMPTY;
        return ret;
    }

    copy(): ChessPosition {
        return new ChessPosition(
            [...this.board],
            this.turn,
            this.castlingRights,
            this.enpassant,
            this.halfmoveClock,
            this.fullmoveNumber
        );
    }
}
