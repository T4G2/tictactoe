

/* ABSTRACT */
export class AbstractAI {
    constructor(symbol, player = false) {
        this.symbol = symbol
        this.player = player
    }

    getNextMove(board) {
        throw Error( "Not implemented getNextMove()")
    }

    onClick() {
        
    }
}