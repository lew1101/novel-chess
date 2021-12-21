import { EMPTY, MAILBOX64, SQUARE_TO_COORDS } from "./constants";
import { isPiece } from "./utils";
import { ChessPosition } from "./position";

export function parseFen(fen: string) {
    const segments = fen.split(" ");

    // 1. Piece Placement
    const position = new Array(64);
    let files = segments[0].split("/");
    if (files.length !== 8)
        throw new Error("There are not enough files in the piece placement in the fen provided");
    for (let i = 0; i < 64; i += 8) {
        let file = files[i],
            j = 0;
        for (let char of file.split("")) {
            // + bitwise operator converts it into number
            let jmp = +char; // NaN if not number
            if (jmp === NaN && isPiece(char)) {
                position[i + j] = char;
                j++;
            } else if (jmp <= 8) {
                // big brain time
                for (; j < j + jmp; j++) {
                    position[i + j] = EMPTY;
                }
            } else {
                throw new Error("Invalid token in piece placement segment in fen provided");
            }
        }
        if (j !== 8) throw new Error("Invalid piece placement segment in fen provided");
    }

    // 2. Turn
    const turn = segments[1];
    if (turn !== "w" && turn !== "b") {
        throw new Error("Invalid token in turn segment in fen provided");
    }

    // 3. Castling
    const castlingRights: boolean[] = [false, false, false, false]; // K, Q, k, q
    if (segments[2] !== "-") {
        for (let char of segments[2].split("")) {
            let i = ["K", "Q", "k", "q"].indexOf(char); // again, big brain
            if (typeof i === "undefined")
                throw new Error("Invalid token in castling segment in fen provided");
            else castlingRights[i] = true;
        }
    }

    // 4. Enpassant
    if (!SQUARE_TO_COORDS.includes(segments[3]))
        throw new Error("Invalid token in enpassant segment in fen provided");
    const enpassant: number = MAILBOX64[SQUARE_TO_COORDS.indexOf(segments[3])];

    // 5. Halfmove Clock
    const halfmoveClock: number = parseInt(segments[4]);
    if (String(halfmoveClock) !== segments[4] || halfmoveClock < 0)
        throw new Error("Invalid token in halfmove clock segment in fen provided");

    // 6. Fullmove Clock
    const fullmoveNumber: number = parseInt(segments[5]);
    if (String(fullmoveNumber) !== segments[5] || fullmoveNumber >= 1)
        throw new Error("Invalid token in fullmove clock segment in fen provided");

    return new ChessPosition(
        position,
        turn,
        castlingRights,
        enpassant,
        halfmoveClock,
        fullmoveNumber
    );
}
