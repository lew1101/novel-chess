// ==========================
// Type Declarations
// ==========================

export type ValidValue = typeof EMPTY | Piece;
export type InvalidValue = typeof INVALID_SQUARE;
export type ChessBoard64 = ValidValue[];
export type ChessBoard120 = (ValidValue | InvalidValue)[];

export interface Move {
    from: number;
    to: number;
    piece: Piece;
    flags: Flag;
    promoteTo?: Piece;
    captured?: Piece;
}

export interface Moves {
    piece: Piece;
    square: number;
    moves: Move[];
    isPromotion: boolean;
}

export interface HistoryEntry {
    move: Move;
    kings: {
        [Color.WHITE]: number;
        [Color.BLACK]: number;
    };
    turn: Color;
    castlingRights: {
        [Color.WHITE]: boolean[];
        [Color.BLACK]: boolean[];
    };
    enpassant: number | null;
    halfmoveClock: number;
    fullmoveNumber: number;
}

// ==========================
// EXPORTED CONSTANTS
// ==========================

export const STARTING_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
export const EMPTY_FEN = '8/8/8/8/8/8/8/8 w KQkq - 0 1';

export enum Flag {
    NORMAL = 1,
    CAPTURE = 2,
    DOUBLE_PAWN_MOVE = 4,
    EP_CAPTURE = 8, // enpassant is a capture
    PROMOTION = 16,
    KSIDE_CASTLE = 32,
    QSIDE_CASTLE = 64,
}

export enum GameEndFlag {
    CHECKMATE = 1,
    STALEMATE = 2,
    FIFTY_MOVE_RULE = 4,
    INSUFFICIENT_MATERIAL = 8,
    THREEFOLD_REPETITION = 16,
}

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

export const RANKS = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// ==========================
// LOCAL CONSTANTS
// ==========================

export const SYMBOL_AS_CHAR = {
    [INVALID_SQUARE]: 'x',
    [EMPTY]: '.',

    [Piece.WHITE_KING]: 'K',
    [Piece.WHITE_QUEEN]: 'Q',
    [Piece.WHITE_ROOK]: 'R',
    [Piece.WHITE_BISHOP]: 'B',
    [Piece.WHITE_KNIGHT]: 'N',
    [Piece.WHITE_PAWN]: 'P',

    [Piece.BLACK_KING]: 'k',
    [Piece.BLACK_QUEEN]: 'q',
    [Piece.BLACK_ROOK]: 'r',
    [Piece.BLACK_BISHOP]: 'b',
    [Piece.BLACK_KNIGHT]: 'n',
    [Piece.BLACK_PAWN]: 'p',
};

export const CHAR_AS_SYMBOL = {
    x: INVALID_SQUARE,
    '.': EMPTY,

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

export const COLOR_AS_CHAR = {
    [Color.WHITE]: 'w',
    [Color.BLACK]: 'b',
};

export const CHAR_AS_COLOR = {
    w: Color.WHITE,
    b: Color.BLACK,
};

export const N = -10;
export const E = 1;
export const S = 10;
export const W = -1;

export const PAWN_OFFSETS = {
    [Color.WHITE]: [N, N + N, N + E, N + W],
    [Color.BLACK]: [S, S + S, S + E, S + W],
};

// prettier-ignore
export const PIECE_OFFSETS = {
    [PieceType.KING]: [N, N + E, E, S + E, S, S + W, W, N + W],
    [PieceType.QUEEN]: [N, N + E, E, S + E, S, S + W, W, N + W],
    [PieceType.ROOK]: [N, E, S, W],
    [PieceType.BISHOP]: [N + E, S + E, S + W, N + W],
    [PieceType.KNIGHT]: [N + N + E, E + E + N, E + E + S, S + S + E, S + S + W, W + W + S, W + W + N, N + N + W],
}

export const CASTLE_SQUARES = {
    [Color.WHITE]: [97, 93],
    [Color.BLACK]: [27, 23],
};

export const PIECE_AS_UNICODE_REPR = {
    [EMPTY]: '.',
    [Piece.WHITE_KING]: '♚',
    [Piece.WHITE_QUEEN]: '♛',
    [Piece.WHITE_ROOK]: '♜',
    [Piece.WHITE_BISHOP]: '♝',
    [Piece.WHITE_KNIGHT]: '♞',
    [Piece.WHITE_PAWN]: '♟',
    [Piece.BLACK_KING]: '♔',
    [Piece.BLACK_QUEEN]: '♕',
    [Piece.BLACK_ROOK]: '♖',
    [Piece.BLACK_BISHOP]: '♗',
    [Piece.BLACK_KNIGHT]: '♘',
    [Piece.BLACK_PAWN]: '♙',
};
// prettier-ignore
export const RANK_FROM_SQUARE = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  8,  8,  8,  8,  8,  8,  8,  8, -1,
    -1,  7,  7,  7,  7,  7,  7,  7,  7, -1,
    -1,  6,  6,  6,  6,  6,  6,  6,  6, -1,
    -1,  5,  5,  5,  5,  5,  5,  5,  5, -1,
    -1,  4,  4,  4,  4,  4,  4,  4,  4, -1,
    -1,  3,  3,  3,  3,  3,  3,  3,  3, -1,
    -1,  2,  2,  2,  2,  2,  2,  2,  2, -1,
    -1,  1,  1,  1,  1,  1,  1,  1,  1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];

// prettier-ignore
export const FILE_FROM_SQUARE = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1,  1,  2,  3,  4,  5,  6,  7,  8, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];
// prettier-ignore
export const MAILBOX120 = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1,  0,  1,  2,  3,  4,  5,  6,  7, -1,
    -1,  8,  9, 10, 11, 12, 13, 14, 15, -1,
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
export const ALGEBRAIC = [
    'a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8',
    'a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7',
    'a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6',
    'a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5',
    'a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4',
    'a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3',
    'a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2',
    'a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1',
]

export type ChessInstance = ReturnType<typeof Chess>;
export default function Chess(fen?: string) {
    // Reference material: https://github.com/jhlywa/chess.js/blob/74d1e1d715ab992f0837f4ed6c1f06d2bd55531e/chess.js

    // ==========================
    // MEMBERS
    // ==========================
    let _history: HistoryEntry[] = [];

    let _board: ChessBoard120 = new Array(120);
    let _turn: Color = Color.WHITE;
    let _castlingRights = {
        [Color.WHITE]: [true, true], // kingside, queenside
        [Color.BLACK]: [true, true],
    };
    let _enpassant: number = null;
    let _halfmoveClock: number = 0;
    let _fullmoveNumber: number = 1;

    let _turnCounter = 0;

    let _kings = {
        [Color.WHITE]: null,
        [Color.BLACK]: null,
    };

    // INIT

    if (fen) {
        loadFen(fen);
    } else {
        loadFen(STARTING_FEN);
    }

    // ==========================
    // GENERAL METHODS
    // ==========================

    function executeMove(move: Move): void {
        // DOES NOT DO VALIDITY CHECKS
        pushHistory(move);

        let friendly = _turn;
        let pieceType = getPieceType(move.piece);

        _board[move.to] = _board[move.from];
        _board[move.from] = EMPTY;

        // PAWN PROMOTION
        if (move.flags & Flag.PROMOTION) {
            _board[move.to] = move.promoteTo;
        }

        // KING WAS MOVED
        if (pieceType === PieceType.KING) {
            _kings[friendly] = move.to; // UPDATE KING POSITION

            // IF CASTLED, MOVE ROOK NEXT TO KING
            if (move.flags & Flag.KSIDE_CASTLE) {
                _board[move.to - 1] = _board[move.to + 1];
                _board[move.to + 1] = EMPTY;
            } else if (move.flags & Flag.QSIDE_CASTLE) {
                _board[move.to + 1] = _board[move.to - 2];
                _board[move.to - 2] = EMPTY;
            }

            // MOVED KING, CASTLE RIGHTS REVOKED
            _castlingRights[friendly] = [false, false];
        }

        // ROOKS WERE MOVED
        if (pieceType === PieceType.ROOK) {
            if (friendly === Color.WHITE) {
                if (_castlingRights[Color.WHITE][0] && move.from === 98) {
                    _castlingRights[Color.WHITE][0] = false;
                }
                if (_castlingRights[Color.WHITE][1] && move.from === 91) {
                    _castlingRights[Color.WHITE][1] = false;
                }
            } else {
                if (_castlingRights[Color.BLACK][0] && move.from === 28) {
                    _castlingRights[Color.BLACK][0] = false;
                }
                if (_castlingRights[Color.BLACK][1] && move.from === 21) {
                    _castlingRights[Color.BLACK][1] = false;
                }
            }
        }

        // DOUBLE PAWN MOVE
        if (move.flags & Flag.DOUBLE_PAWN_MOVE) {
            if (_turn === Color.WHITE) {
                _enpassant = move.to + S;
            } else {
                _enpassant = move.to + N;
            }
        } else {
            _enpassant = null;
        }

        if (move.flags & Flag.EP_CAPTURE) {
            if (_turn === Color.WHITE) {
                _board[move.to + S] = EMPTY;
            } else {
                _board[move.to + N] = EMPTY;
            }
        }

        // RESET halmoveClock IF PAWN MOVE OR PIECE CAPTURE
        if (pieceType === PieceType.PAWN || move.flags & Flag.CAPTURE) {
            _halfmoveClock = 0;
        } else {
            _halfmoveClock++;
        }

        if (_turn === Color.WHITE) {
            _fullmoveNumber++;
        }

        _turn = swapColor(_turn);
        _turnCounter++;
    }

    function undoMove(): Move {
        let undo = _history.pop();
        if (!undo) return null;

        let move = undo.move;
        _kings = undo.kings;
        _turn = undo.turn;
        _castlingRights = undo.castlingRights;
        _enpassant = undo.enpassant;
        _halfmoveClock = undo.halfmoveClock;
        _fullmoveNumber = undo.fullmoveNumber;

        const friendly = _turn;

        _board[move.from] = move.piece; // TO UNDO PROMOTIONS
        _board[move.to] = EMPTY;

        if (move.flags & Flag.EP_CAPTURE) {
            // UNDO ENPASSANT
            if (friendly === Color.WHITE) {
                _board[move.to + S] = Piece.BLACK_PAWN;
            } else {
                _board[move.to + N] = Piece.WHITE_PAWN;
            }
        } else if (move.flags & Flag.CAPTURE) {
            // UNDO CAPTURE
            _board[move.to] = move.captured;
        }

        // UNDO CASTLING
        if (move.flags & Flag.KSIDE_CASTLE) {
            _board[move.to + 1] = _board[move.to - 1];
            _board[move.to - 1] = EMPTY;
        } else if (move.flags & Flag.QSIDE_CASTLE) {
            _board[move.to - 2] = _board[move.to + 1];
            _board[move.to + 1] = EMPTY;
        }

        _turnCounter--;
        return move;
    }

    function reset() {
        loadFen(STARTING_FEN);
    }

    function clear() {
        loadFen(EMPTY_FEN);
    }

    // FEN
    // ==========================
    // ==========================
    function loadFen(fen: string) {
        const res = validateFen(fen);
        if (!res.valid) throw new Error(res.error);

        _history = []; // clear history

        const segments = fen.split(' ');
        if (segments.length !== 6) throw new Error('There are not enought segments in the fen');

        // 1. Piece Placement
        let boardAs64 = new Array(64);
        let ranks = segments[0].split('/');

        if (ranks.length !== 8)
            throw new Error(
                'There are not enough ranks in the piece placement in the fen provided'
            );

        for (const [i, rank] of ranks.entries()) {
            let file = 0;
            let piece: Piece;
            let sq: number;
            for (let char of rank.split('')) {
                let jmp = +char;

                if (!isNaN(jmp) && jmp <= 8) {
                    // JUMP
                    while (jmp--) {
                        sq = i * 8 + file;
                        boardAs64[sq] = EMPTY;
                        file++;
                    }
                } else if (char in CHAR_AS_SYMBOL) {
                    // ADD PIECE
                    piece = CHAR_AS_SYMBOL[char];
                    sq = i * 8 + file;
                    boardAs64[sq] = piece;
                    if (sq === Piece.WHITE_KING) {
                        // RECORD KING LOCATIONS
                        _kings[Color.WHITE] = sq;
                    } else if (sq === Piece.BLACK_KING) {
                        _kings[Color.BLACK] = sq;
                    }
                    file++;
                } else {
                    throw new Error('Invalid token in piece placement segment in fen provided');
                }
            }
            if (file !== 8) throw new Error('Invalid piece placement segment in fen provided');
        }
        _board = getBoard64AsMailbox(boardAs64);

        // 2. Turn
        let turnAsString = segments[1];
        if (turnAsString !== 'w' && turnAsString !== 'b') {
            throw new Error('Invalid token in turn segment in fen provided');
        }
        _turn = CHAR_AS_COLOR[turnAsString];

        // 3. Castling
        if (segments[2] === '-') {
            _castlingRights[Color.WHITE] = [false, false];
            _castlingRights[Color.BLACK] = [false, false];
        } else {
            const rights = segments[2].split('');
            _castlingRights[Color.WHITE] = [rights.includes('K'), rights.includes('Q')];
            _castlingRights[Color.BLACK] = [rights.includes('k'), rights.includes('q')];
        }

        // 4. Enpassant
        if (segments[3] !== '-' && !ALGEBRAIC.includes(segments[3]))
            throw new Error('Invalid token in enpassant segment in fen provided');
        _enpassant = segments[3] !== '-' ? MAILBOX64[ALGEBRAIC.indexOf(segments[3])] : null;

        // 5. Halfmove Clock
        _halfmoveClock = parseInt(segments[4]);
        if (String(_halfmoveClock) !== segments[4] || _halfmoveClock < 0)
            throw new Error('Invalid token in halfmove clock segment in fen provided');

        // 6. Fullmove Clock
        _fullmoveNumber = parseInt(segments[5]);
        if (String(_fullmoveNumber) !== segments[5] || _fullmoveNumber < 1)
            throw new Error('Invalid token in fullmove clock segment in fen provided');

        _kings[Color.WHITE] = getKingSquare(Color.WHITE);
        _kings[Color.BLACK] = getKingSquare(Color.BLACK);
        _turnCounter = 0;
    }

    // TODO

    function generateFen(): string {
        return '';
    }

    function validateFen(fen: string): { valid: boolean; error?: string } {
        return { valid: true };
    }

    // ==========================
    // MOVE GENERATION
    // ==========================

    function buildMove(
        board: ChessBoard120,
        from: number,
        to: number,
        flags: number,
        promoteTo?: Piece
    ): Move {
        const move: Move = {
            from,
            to,
            piece: board[from],
            flags,
            promoteTo,
        };

        if (promoteTo) {
            move.flags |= Flag.PROMOTION;
        }
        if (isPiece(board[to])) {
            move.captured = board[to];
        } else if (flags & Flag.EP_CAPTURE) {
            move.captured = swapColor(getPieceColor(board[from])) + PieceType.PAWN;
        }
        return move;
    }

    // DECORATOR THAT PREVENTS REEVALUATION

    function genAllLegalMoves(color: Color): Moves[] {
        const moves = [];
        for (const square of MAILBOX64) {
            if (
                square !== EMPTY &&
                square !== INVALID_SQUARE &&
                getPieceColor(_board[square]) === color
            ) {
                const movesForSquare = genLegalMoves(square);
                moves.push(movesForSquare);
            }
        }
        return moves;
    }

    function genAllPeusdoLegalMoves(color: Color): Moves[] {
        const moves = [];
        for (const square of MAILBOX64) {
            if (
                square !== EMPTY &&
                square !== INVALID_SQUARE &&
                getPieceColor(_board[square]) === color
            ) {
                const movesForSquare = genPseudoLegalMoves(square);
                if (movesForSquare.moves.length !== 0) moves.push(movesForSquare);
            }
        }
        return moves;
    }

    function genLegalMoves(sq: number): Moves {
        const legalMoves: Move[] = [];
        const { piece, square, moves, isPromotion } = genPseudoLegalMoves(sq);
        const color = getPieceColor(piece);

        for (const move of moves) {
            executeMove(move);
            if (!inCheck(color)) legalMoves.push(move);
            undoMove();
        }
        return {
            piece,
            square,
            moves: legalMoves,
            isPromotion,
        };
    }

    function genPseudoLegalMoves(sq: number): Moves {
        const moves: Move[] = [];
        const addMove = (...args) => moves.push((buildMove as any)(...args));

        // reference material: https://github.com/thomasahle/sunfish/blob/master/sunfish.py
        const piece = _board[sq];

        const pieceType = getPieceType(piece);
        const friendly = getPieceColor(piece);
        const enemy = swapColor(friendly);

        // Move Generation
        let targetSq;
        let targetVal;
        let isPromotion;

        if (pieceType === PieceType.PAWN) {
            // PAWN MOVE GENERATION
            targetSq = sq + PAWN_OFFSETS[friendly][0]; // single move
            targetVal = _board[targetSq];

            if (targetVal === EMPTY) {
                if (rank(targetSq) === (friendly === Color.WHITE ? 8 : 1)) {
                    // PROMOTION!!!!
                    for (const pieceType of [
                        PieceType.QUEEN,
                        PieceType.ROOK,
                        PieceType.BISHOP,
                        PieceType.KNIGHT,
                    ]) {
                        addMove(_board, sq, targetSq, Flag.PROMOTION, friendly + pieceType);
                        isPromotion = true;
                    }
                } else addMove(_board, sq, targetSq, Flag.NORMAL); // NO PROMOTION, NORMAL MOVE

                // PAWN CAN MOVE TWO MOVES ?
                targetSq = sq + PAWN_OFFSETS[friendly][1]; // double move
                targetVal = _board[targetSq];

                if (rank(sq) === (friendly === Color.WHITE ? 2 : 7) && targetVal === EMPTY) {
                    // PAWN CAN ADVANCE TWO MOVES
                    addMove(_board, sq, targetSq, Flag.DOUBLE_PAWN_MOVE);
                }
            }

            for (let captureMove of PAWN_OFFSETS[friendly].slice(2)) {
                targetSq = sq + captureMove;
                targetVal = _board[targetSq];

                if (targetSq === _enpassant) {
                    // ENPASSANT
                    addMove(_board, sq, targetSq, Flag.EP_CAPTURE);
                } else if (
                    targetVal !== EMPTY &&
                    targetVal !== INVALID_SQUARE &&
                    getPieceColor(targetVal) === enemy
                ) {
                    // NORMAL CAPTURE
                    addMove(_board, sq, targetSq, Flag.CAPTURE);
                }
            }
        } else {
            // PIECE MOVE GENERATION
            for (const offset of PIECE_OFFSETS[pieceType]) {
                targetSq = sq;
                while (true) {
                    targetSq += offset;
                    targetVal = _board[targetSq];

                    if (targetVal === INVALID_SQUARE || getPieceColor(targetVal) === friendly)
                        break;
                    if (targetVal === EMPTY) {
                        // NO PIECE ON SQUARE, VALID MOVE
                        addMove(_board, sq, targetSq, Flag.NORMAL);
                    } else if (getPieceColor(targetVal) === enemy) {
                        // ENEMY PIECE, CAPTURE
                        addMove(_board, sq, targetSq, Flag.CAPTURE);
                        break;
                    }

                    // PREVENT CRAWLERS FROM SLIDING
                    if (pieceType === PieceType.KNIGHT || pieceType === PieceType.KING) break;
                }
            }
        }

        if (pieceType === PieceType.KING) {
            let canCastle = colorCanCastle(friendly);
            if (canCastle[0]) addMove(_board, sq, CASTLE_SQUARES[friendly][0], Flag.KSIDE_CASTLE);
            if (canCastle[1]) addMove(_board, sq, CASTLE_SQUARES[friendly][1], Flag.QSIDE_CASTLE);
        }
        return {
            piece,
            square: sq,
            moves,
            isPromotion,
        };
    }

    function colorCanCastle(color: Color): boolean[] {
        const kingSquare = color === Color.WHITE ? 95 : 25;
        const enemy = swapColor(color);
        // The king and the squares the king will pass over when castling cannot be
        // attacked by enemy pieces when perfroming the castle
        return [
            // king-side
            _castlingRights[color][0] &&
                _board[kingSquare + 1] === EMPTY &&
                _board[kingSquare + 2] === EMPTY &&
                !inCheck(color) &&
                !squareIsAttacked(kingSquare + 1, enemy) &&
                !squareIsAttacked(kingSquare + 2, enemy),
            // queen-side
            _castlingRights[color][1] &&
                _board[kingSquare - 1] === EMPTY &&
                _board[kingSquare - 2] === EMPTY &&
                _board[kingSquare - 3] === EMPTY &&
                !inCheck(color) &&
                !squareIsAttacked(kingSquare - 1, enemy) &&
                !squareIsAttacked(kingSquare - 2, enemy) &&
                !squareIsAttacked(kingSquare - 3, enemy),
        ];
    }

    function squareIsAttacked(sq: number, attacker: Color): boolean {
        // requires fixing
        // Travel backwards to find enemy attacking pieces
        const friendly = swapColor(attacker);
        let targetSq;
        let targetVal;

        // CHECK IF ENEMY PAWNS ARE ABLE TO ATTACK SQUARE
        for (const offset of PAWN_OFFSETS[friendly].slice(2)) {
            targetSq = sq + offset;
            targetVal = _board[targetSq];

            if (
                targetVal !== EMPTY &&
                targetVal !== INVALID_SQUARE &&
                targetVal === attacker + PieceType.PAWN
            ) {
                return true;
            }
        }

        // CHECK IF OTHER PIECES ARE ABLE TO ATTACK SQUARE
        for (const pieceTypeAsString in PIECE_OFFSETS) {
            // iterate over keys
            const pieceType = +pieceTypeAsString; // convert into number

            for (const offset of PIECE_OFFSETS[pieceTypeAsString]) {
                targetSq = sq;
                while (true) {
                    targetSq += offset;
                    targetVal = _board[targetSq];

                    if (targetVal === INVALID_SQUARE || getPieceColor(targetVal) === friendly)
                        break;
                    if (targetVal !== EMPTY) {
                        // ENEMY PIECE PRESENT
                        if (targetVal === attacker + pieceType) return true;
                        else break;
                    }
                    // PREVENT CRAWLERS FROM SLIDING
                    if (pieceType === PieceType.KNIGHT || pieceType === PieceType.KING) break;
                }
            }
        }

        return false; // NO PIECES ATTACKING KING
    }

    // ==========================
    // GAME STATE
    // ==========================

    function inCheck(color: Color) {
        return squareIsAttacked(_kings[color], swapColor(color));
    }

    function fiftyMoveRule() {
        return _halfmoveClock >= 50;
    }

    function getGameEndFlag(moves: Moves[] = genAllLegalMoves(_turn)): GameEndFlag | 0 {
        if (inCheckMate(_turn, moves)) return GameEndFlag.CHECKMATE;
        else if (inStaleMate(_turn, moves)) return GameEndFlag.STALEMATE;
        else if (fiftyMoveRule()) return GameEndFlag.FIFTY_MOVE_RULE;
        else if (insufficientMaterial()) return GameEndFlag.INSUFFICIENT_MATERIAL;
        else if (inThreefoldRepetition()) return GameEndFlag.THREEFOLD_REPETITION;
        else return 0;
    }

    function getGameEndMessage(flag: GameEndFlag, turn: Color): { title: string; desc: string } {
        switch (flag) {
            case GameEndFlag.CHECKMATE:
                return {
                    title: 'Checkmate',
                    desc: `${turn === Color.WHITE ? 'Black' : 'White'} wins!`,
                };
            case GameEndFlag.STALEMATE:
                return {
                    title: 'Stalemate',
                    desc: 'Draw!',
                };
            case GameEndFlag.FIFTY_MOVE_RULE:
                return {
                    title: 'Fifty Move Rule',
                    desc: 'Draw!',
                };
            case GameEndFlag.INSUFFICIENT_MATERIAL:
                return {
                    title: 'Insufficient Material',
                    desc: 'Draw!',
                };
            case GameEndFlag.THREEFOLD_REPETITION:
                return {
                    title: 'Threefold Repetition',
                    desc: `Draw!`,
                };
            default:
                return {
                    title: '',
                    desc: '',
                };
        }
    }

    function inCheckMate(color: Color, moves?: Moves[]) {
        return inCheck(color) && (moves ?? genAllLegalMoves(color)).length === 0;
    }

    function inStaleMate(color: Color, moves?: Moves[]) {
        return !inCheck(color) && (moves ?? genAllLegalMoves(color)).length === 0;
    }

    function insufficientMaterial() {
        const pieces = {};
        let bishops = 0; // 1 = blacks square, 0 = white square
        let piece_count = 0;

        for (const i of MAILBOX64) {
            const piece = _board[i];
            if (piece === EMPTY || piece == INVALID_SQUARE) continue;
            const pieceType = getPieceType(piece);

            pieces[pieceType] = pieceType in pieces ? pieces[pieceType] + 1 : 1;
            if (pieceType === PieceType.BISHOP) {
                bishops += (~~(i / 8) + (i % 8)) % 2;
            }
            piece_count++;
        }
        // k vs K
        if (piece_count === 2) return true;
        // k vs. kn or k vs. kb
        else if (
            piece_count === 3 &&
            (pieces[PieceType.BISHOP] === 1 || pieces[PieceType.KNIGHT] === 1)
        )
            return true;
        // kb vs KB, bishops are on same colored squares
        else if (piece_count === pieces[PieceType.BISHOP] + 2 && (bishops === 0 || bishops === 2))
            return true;
        else return false;
    }

    // TODO
    function inThreefoldRepetition(): boolean {
        return false;
    }

    // ==========================
    // HISTORY
    // ==========================

    function pushHistory(move: Move): void {
        _history.push({
            move,
            kings: {
                [Color.WHITE]: _kings[Color.WHITE],
                [Color.BLACK]: _kings[Color.BLACK],
            },
            turn: _turn,
            castlingRights: {
                [Color.WHITE]: [..._castlingRights[Color.WHITE]],
                [Color.BLACK]: [..._castlingRights[Color.BLACK]],
            },
            enpassant: _enpassant,
            halfmoveClock: _halfmoveClock,
            fullmoveNumber: _fullmoveNumber,
        });
    }

    // ==========================
    // CHESS UTILS
    // ==========================

    function getState() {
        return {
            history: _history,
            board: _board,
            turn: _turn,
            castlingRights: _castlingRights,
            enpassant: _enpassant,
            halfmoveClock: _halfmoveClock,
            fullmoveNumber: _fullmoveNumber,
            kings: _kings,
            turnCounter: _turnCounter,
        };
    }

    function rank(sq: number) {
        return RANK_FROM_SQUARE[sq];
    }

    function file(sq: number) {
        return FILE_FROM_SQUARE[sq];
    }

    function swapColor(c: Color) {
        return c === Color.WHITE ? Color.BLACK : Color.WHITE;
    }

    function getKingSquare(color: Color): number {
        return color === Color.WHITE
            ? _board.findIndex((v) => v === Piece.WHITE_KING)
            : _board.findIndex((v) => v === Piece.BLACK_KING);
    }

    function isPiece(x: any): x is Piece {
        return x in Piece;
    }

    function getPieceColor(p: Piece): Color | -1 {
        if (p in WhitePiece) return Color.WHITE;
        else if (p in BlackPiece) return Color.BLACK;
        else return -1;
    }

    function getPieceType(p: Piece): PieceType | -1 {
        switch (p) {
            case Piece.WHITE_KING:
            case Piece.BLACK_KING:
                return PieceType.KING;
            case Piece.WHITE_QUEEN:
            case Piece.BLACK_QUEEN:
                return PieceType.QUEEN;
            case Piece.WHITE_ROOK:
            case Piece.BLACK_ROOK:
                return PieceType.ROOK;
            case Piece.WHITE_BISHOP:
            case Piece.BLACK_BISHOP:
                return PieceType.BISHOP;
            case Piece.WHITE_KNIGHT:
            case Piece.BLACK_KNIGHT:
                return PieceType.KNIGHT;
            case Piece.WHITE_PAWN:
            case Piece.BLACK_PAWN:
                return PieceType.PAWN;
            case INVALID_SQUARE:
                return INVALID_SQUARE;
            case EMPTY:
                return EMPTY;
            default:
                return -1;
        }
    }

    function boardAsUnicode(board: ChessBoard120);
    function boardAsUnicode(board: ChessBoard64) {
        if (board.length === 120) board = getMailboxAsBoard64(board);
        if (board.length !== 64) return new Error('Board passed does not match any overloads.');
        let output = '',
            rank = 8;
        for (let i = 0; i < 8; i++) {
            output += rank + ' ';
            rank--;
            for (let j = 0; j < 8; j++) {
                output += PIECE_AS_UNICODE_REPR[board[i * 8 + j]] + ' ';
            }
            output += '\n';
        }
        output += '  a b c d e f g h';
        return output;
    }

    function boardAsAscii(board: ChessBoard120);
    function boardAsAscii(board: ChessBoard64) {
        if (board.length === 120) board = getMailboxAsBoard64(board);
        if (board.length !== 64) return new Error('Board passed does not match any overloads.');
        let output = '',
            rank = 8;
        for (let i = 0; i < 8; i++) {
            output += rank + ' ';
            rank--;
            for (let j = 0; j < 8; j++) {
                output += SYMBOL_AS_CHAR[board[i * 8 + j]] + ' ';
            }
            output += '\n';
        }
        output += '  a b c d e f g h';
        return output;
    }

    function getBoard64AsMailbox(board: ChessBoard64): ChessBoard120 {
        let mailbox = [];
        for (let n of MAILBOX120) {
            if (n === -1) mailbox.push(-1);
            else mailbox.push(board[n]);
        }
        return mailbox;
    }

    function getMailboxAsBoard64(mailbox: ChessBoard120): ChessBoard64 {
        return MAILBOX64.map((n) => mailbox[n]);
    }

    // ==========================
    // PUBLIC API
    // ==========================

    return {
        utils: {
            boardAsUnicode,
            boardAsAscii,
            printBoard: (board: ChessBoard120 | ChessBoard64) => console.log(boardAsUnicode(board)),
            rank,
            file,
            getKingSquare,
            isPiece,
            getPieceColor,
            getPieceType,
            getBoard64AsMailbox,
            getMailboxAsBoard64,
            getHumanReadableBoard: () => getMailboxAsBoard64(_board).map((x) => SYMBOL_AS_CHAR[x]),
        },
        history: {
            get() {
                return _history;
            },
            clear() {
                _history = [];
            },
            push: pushHistory,
            pop() {
                return _history.pop();
            },
            count() {
                return _history.length;
            },
        },
        state: {
            currentPlayerInCheck: () => inCheck(_turn),
            currentPlayerInCheckMate: () => inCheckMate(_turn),
            currentPlayerInStalement: () => inStaleMate(_turn),
            getGameEndFlag,
            getGameEndMessage,
            inCheck,
            inCheckMate,
            inStaleMate,
            insufficientMaterial,
            inThreefoldRepetition,
        },
        get board() {
            return _board;
        },
        get turn() {
            return _turn;
        },
        get castlingRights() {
            return _castlingRights;
        },
        get enpassant() {
            return _enpassant;
        },
        get halfmoveClock() {
            return _halfmoveClock;
        },
        get fullmoveNumber() {
            return _fullmoveNumber;
        },
        getState,
        load: loadFen,
        executeMove,
        undoMove,
        reset,
        clear,
        getMoves: genAllLegalMoves,
        colorCanCastle,
        getPseudoMoves: genAllPeusdoLegalMoves,
        getMovesForSquare: genLegalMoves,
        getPseudoMovesForSquare: genPseudoLegalMoves,
        squareIsAttacked: squareIsAttacked,
    };
}
