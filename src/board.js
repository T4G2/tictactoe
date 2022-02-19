import { Tile } from './tile.js'

export const BOARD_ROWS = 40
export const BOARD_COLS = 58
export const POINTS_TO_WIN = 5
export const BOARD_MIN_ROW = -19
export const BOARD_MAX_ROW = 20
export const BOARD_MIN_COL = -29
export const BOARD_MAX_COL = 28

export class Board {
    constructor(app) {
        this.app = app
        this.board = document.getElementById('board')
        this.map = new Map()
        this.array = []
        if (this.board == null) {
            throw Error("There is no div with id='board' !")
        }
        this.createTiles()

        console.log("Board Initialized")

    }

    getWinner(recentlyChangedTile) {
        let tx = recentlyChangedTile.x
        let ty = recentlyChangedTile.y
        let tile = recentlyChangedTile.val()

        let points_horizontal = 0
        let points_vertical = 0
        let points_diagonal1 = 0
        let points_diagonal2 = 0
        for (let d = -5; d <= 5; d++) {
            if (this.getTile(tx + d, ty)?.val() == tile) points_horizontal++ 
            else points_horizontal = 0

            if (this.getTile(tx , ty + d)?.val() == tile) points_vertical++ 
            else points_vertical = 0

            if (this.getTile(tx + d, ty + d)?.val() == tile) points_diagonal1++ 
            else points_diagonal1 = 0

            if (this.getTile(tx + d , ty - d)?.val() == tile) points_diagonal2++
            else points_diagonal2 = 0 


            if (points_vertical >= 5 || points_horizontal >= 5 || points_diagonal1 >= 5 || points_diagonal2 >= 5) {
                return tile
            }
        }
        return ' '
    }

    onClick(tile) {
        this.app.onClick(tile)
    }

    getTileArr(x, y) {
        return this.array[y][x]
    }

    getTile(x, y) {
        if ( x < BOARD_MIN_COL ||  BOARD_MAX_COL < x ) {
            return null
        }
        if ( y < BOARD_MIN_ROW ||  BOARD_MAX_ROW < y ) {
            return null
        }

        x = Tile.xr_reverse(x)
        y = Tile.yr_reverse(y)
        let intRepresentation = Tile.int(x, y)
        return this.map.get(intRepresentation)
    }

    createTiles() {
        for (let y = 0; y < BOARD_ROWS; y++) {
            let row = document.createElement("div");
            board.appendChild(row).className = "board-row";

            let rowArray = []
            for (let x = 0; x < BOARD_COLS; x++) {
                let tile_div = document.createElement("div");
                
                let nx = Tile.xr(x)
                let ny = Tile.yr(y)
                let tile = new Tile(this, nx, ny, tile_div)  
                
                tile_div.id = tile.css_id(nx, ny)
                tile_div.innerHTML = " "

                this.map.set(Tile.int(x, y), tile)
                rowArray.push(tile)  
                row.appendChild(tile_div).className = "board-tile"; 
            }
            this.array.push(rowArray)
        }
    }
}