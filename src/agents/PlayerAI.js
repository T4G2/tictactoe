import { AbstractAI } from './AbstractAI.js'

const timeout = async ms => new Promise(res => setTimeout(res, ms));

export class PlayerAI extends AbstractAI {
    constructor(symbol) {
        super(symbol, true)
        this.input = null
    }

    async getNextMove(board) {
        console.log(`Waiting for input of player: ${this.symbol}`)
        this.input = null
        return await this.inputLoop()
        
    }

    async inputLoop() {
        while (this.input == null || this.input.val() != ' ') {
            await timeout(50)
        }
        
        return this.input


    }

    onClick(tile) {
        this.input = tile
    }



}