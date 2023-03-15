export class Settings {
	public rows: number
	public cols: number
	public blockSize: number
	public canvas: HTMLCanvasElement

	constructor(
		canvas: HTMLCanvasElement,
		rows: number,
		cols: number,
		blockSize: number
	) {
		this.canvas = canvas
		this.rows = rows
		this.cols = cols
		this.blockSize = blockSize
	}

	get mapSize() {
		return this.rows * this.blockSize
	}

	get ctx() {
		return this.canvas.getContext('2d')!
	}

	public setup(canvas: HTMLCanvasElement, parent: HTMLElement) {
		canvas.style.backgroundColor = 'white'
		canvas.width = this.mapSize
		canvas.height = this.mapSize
		parent.appendChild(canvas)
	}
}
