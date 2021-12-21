import { EMPTY_BOARD, WHITE, PIECE_TO_UNICODE_REPR } from "./constants";
import * as constants from "./constants";

export type ChessPositionInstance = InstanceType<typeof ChessPosition>;
export class ChessPosition {
    board: Chess.ChessBoard;
    turn: Chess.Player;
    castlingRights: boolean[];
    enpassant: number;
    halfmoveClock: number;
    fullmoveNumber: number;

    constructor(
        board: Chess.ChessBoard = EMPTY_BOARD,
        turn: Chess.Player = WHITE,
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

    // ====================================
    // NUCLEAR METHODS
    // ====================================

    move(initial: number, final: number) {
        // DOES NOT DO VALIDITY CHECKS
        const ret = this.copy();
        ret.board[final] = ret.board[initial];
        ret.board[initial] = constants.EMPTY;
        return ret;
    }

    copy() {
        return new ChessPosition(
            [...this.board],
            this.turn,
            this.castlingRights,
            this.enpassant,
            this.halfmoveClock,
            this.fullmoveNumber
        );
    }

    // ====================================
    // NON-NUCLEAR METHODS
    // ====================================

    genMove(sq: number) {
        let pseudoLegal = new Array();
    }

    print() {
        let output = "",
            rank = 8;
        for (let i = 0; i < 8; i++) {
            output += rank + " ";
            rank--;
            for (let j = 0; j < 8; j++) {
                output += PIECE_TO_UNICODE_REPR[this.board[i * 8 + j]] + " ";
            }
            output += "\n";
        }
        output += "  a b c d e f g h";
        console.log(output);
    }
}
