import * as constants from "./constants";
let position: Chess.ChessBoard = [...constants.EMPTY_BOARD];

function isValidMove(from: number, to: number) {
    return true;
}

function performMove(from: number, to: number) {}

export default {
    getState() {
        return [...position];
    },
    setState(state: Chess.ChessBoard) {
        position = state;
    },
    isValidMove,
    performMove,
};
