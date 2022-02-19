import { BOARD_ROWS, BOARD_COLS } from "./board.js"

export const TILE_PLAYER0 = '0'
export const TILE_PLAYER1 = '1'
export const TILE_PLAYER_EMPTY = ' '

export function set_tile(x, y, ) {}



export class Tile {
    constructor(board, x, y, div) {
        this.board = board
        this.state = TILE_PLAYER_EMPTY
        this.x = x
        this.y = y
        this.div = div
        this.div.addEventListener('click', this.onClick.bind(this))
    }

    onClick(event) {
        //this.div.innerHTML = "1"
        this.board.onClick(this)
    }

    val() {
        return this.state
    }

    set(val) {
        this.state = val
        this.div.innerHTML = val 
    }

    setPlayer(int) {
        let state = int == 0 ? TILE_PLAYER0 : TILE_PLAYER1
        this.set(state) 
    }

    css_id () {
        return Tile.css_id(this.x, this.y)
    }

    static css_id(x, y) {
        return `bt ${x} ${y}`
    }

    static int(x, y) {
        return y * BOARD_COLS + x  
    }

    static xr (x) {
        return x - BOARD_COLS / 2 
    }
    static xr_reverse(x) {
        return x + BOARD_COLS / 2
    }

    static yr (y) {
        return  (BOARD_ROWS / 2) - y
    }
    static yr_reverse(y) {
        return  (BOARD_ROWS / 2) - y
    }
}


