import { EMPTY, EMPTY_BOARD, Color, PieceType } from "./constants";
import type { ChessBoard120 } from "./constants";
import { getPieceColor, getPieceType } from "./utils";

const N = -10;
const E = 1;
const S = 10;
const W = -1;

const PIECE_DIRECTION_MAP = {
    [PieceType.KING]: [N, N + E, E, S + E, S, S + W, W, N + W],
    [PieceType.QUEEN]: [N, N + E, E, S + E, S, S + W, W, N + W],
    [PieceType.ROOK]: [N, E, S, W],
    [PieceType.BISHOP]: [N + E, S + E, S + W, N + W],
    [PieceType.KNIGHT]: [
        N + N + E,
        E + E + N,
        E + E + S,
        S + S + E,
        S + S + W,
        W + W + S,
        W + W + N,
        N + N + W,
    ],
    [PieceType.PAWN]: [N, N + N, N + E, N + W],
};

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

    isValidMove(initial: number, final: number): boolean {
        return this.genMoves(initial).includes(final);
    }

    genMoves(sq: number): number[] {
        const moves = [];

        const val = this.board[sq];
        const type = getPieceType(val);
        const color = getPieceColor(val);

        return moves;
    }
}
