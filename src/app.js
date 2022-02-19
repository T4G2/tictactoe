import { Board } from "./board.js";
import { PlayerAI } from "./agents/PlayerAI.js"


const timeout = async ms => new Promise(res => setTimeout(res, ms));


export const AGENT0 = 0
export const AGENT1 = 1

const MAX_ROUNDS = 500

export class App {
    constructor(agent0, agent1) {
        agent0 = new PlayerAI(AGENT0) 
        agent1 = new PlayerAI(AGENT1)
        this.round = 0
        this.board = new Board(this)
        this.agentOnMove = AGENT0
        this.agent0 = agent0
        this.agent1 = agent1
    }

    run() {
        this.play_loop()
    }

    async requestMove() {
        let current_agent = this.getCurrentAgent()
        let selectedTile = await current_agent.getNextMove(this.board)
        selectedTile.setPlayer(current_agent.symbol)
        this.agentOnMove = 1 - this.agentOnMove
        return selectedTile
    }

    getCurrentAgent() {
        return (this.agentOnMove == AGENT0) ? this.agent0 : this.agent1
    }

    async play_loop() {
        this.round++
        console.log(`Round: ${this.round}`)
        document.getElementById("logo").innerHTML = this.getCurrentAgent().symbol
        let selectedTile = await this.requestMove()

        // if Winner, alert
        await timeout(10)
        let winner = this.board.getWinner(selectedTile)
        if (winner != ' ') {
            if(confirm(`And the winner is : [${winner}] \n press OK to reload page and start again `)) {
                document.location.reload(true)
            }
            return
        }
        if (this.round > MAX_ROUNDS) {
            throw Error("MAX_ROUNDS exceeded!")
        }
        this.play_loop()
    }

    onClick(tile) {
        this.getCurrentAgent().onClick(tile)
    }
}