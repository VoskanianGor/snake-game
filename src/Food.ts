import { drawBlock } from './utils'

export class Food {
	rows: number
	cols: number
	food: number[]

	constructor(rows: number, cols: number) {
		this.rows = rows
		this.cols = cols
		this.food = [
			Math.floor(Math.random() * rows),
			Math.floor(Math.random() * cols),
		]
	}

	get foodRow() {
		return this.food[0]
	}

	get foodCol() {
		return this.food[1]
	}

	public draw(ctx: CanvasRenderingContext2D, blockSize: number) {
		drawBlock(ctx, this.food[0], this.food[1], blockSize, '#d4334b')
	}

	public getRandomCoord() {
		const row = Math.floor(Math.random() * this.rows)
		const col = Math.floor(Math.random() * this.cols)
		return [row, col]
	}
}
