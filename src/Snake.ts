import { Food } from './Food'
import { Direction } from './Types'
import { drawBlock } from './utils'

export class Snake {
	public body: number[][] = [
		[10, 10],
		[11, 10],
		[12, 10],
	]
	direction: Direction = 'right'
	private food: Food

	constructor(food: Food) {
		this.food = food
	}

	get tail() {
		return this.body[this.body.length - 1]
	}

	get head() {
		return this.body[0]
	}

	get isEaten() {
		return (
			this.head[0] === this.food.foodRow && this.head[1] === this.food.foodCol
		)
	}

	public isEatingFood([head]: number[][], food: Food['food']) {
		return head[0] === food[0] && head[1] === food[1]
	}

	public draw(ctx: CanvasRenderingContext2D, blockSize: number) {
		this.body.forEach(([row, col]) =>
			drawBlock(ctx, row, col, blockSize, '#32325d')
		)
	}

	public move(food: Food['food']) {
		const [headRow, headCol] = this.head

		let newRow = headRow
		let newCol = headCol

		switch (this.direction) {
			case 'up':
				newRow--
				break
			case 'down':
				newRow++
				break
			case 'left':
				newCol--
				break
			case 'right':
				newCol++
				break
			default:
				break
		}

		const newHead = [newRow, newCol]

		this.body = this.isEatingFood([newHead], food)
			? [newHead, ...this.body]
			: [newHead, ...this.body.slice(0, -1)]
	}
}
