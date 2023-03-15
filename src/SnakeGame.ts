import { Food } from './Food'
import { Settings } from './Settings'
import { Snake } from './Snake'

export class SnakeGame {
	public snake: Snake
	public food: Food
	public settings: Settings
	public gameOver: boolean
	public score: number

	constructor(settings: Settings) {
		const food = new Food(settings.rows, settings.cols)

		this.settings = settings
		this.snake = new Snake(food)
		this.food = food
		this.gameOver = false
		this.score = 0
	}

	private isCollidingWithSnake(snake: Snake['body']) {
		const [head, ...body] = snake
		return body.some(([row, col]) => row === head[0] && col === head[1])
	}

	private isCollidingWithWall = (snake: Snake['body']) => {
		const [headRow, headCol] = snake[0]

		return (
			headRow < 0 ||
			headRow >= this.settings.rows ||
			headCol < 0 ||
			headCol >= this.settings.cols
		)
	}

	public tick() {
		if (this.gameOver) {
			return
		}

		const scoreContainer = document.getElementById('score')!

		if (
			this.isCollidingWithSnake(this.snake.body) ||
			this.isCollidingWithWall(this.snake.body)
		) {
			this.gameOver = true
			scoreContainer.innerHTML = `GAME OVER`
			scoreContainer.dataset.state = 'game-over'
			return
		}

		this.settings.ctx.clearRect(
			0,
			0,
			this.settings.canvas.width,
			this.settings.canvas.height
		)

		this.food.draw(this.settings.ctx, this.settings.blockSize)
		this.snake.draw(this.settings.ctx, this.settings.blockSize)

		this.snake.move(this.food.food)
		this.food.food = this.snake.isEaten
			? this.food.getRandomCoord()
			: this.food.food

		this.score = this.snake.body.length

		scoreContainer.innerText = `Score: ${this.score - 3}`
	}

	public start() {
		window.addEventListener('keydown', e => {
			if (e.key === 'w' && this.snake.direction !== 'down') {
				this.snake.direction = 'up'
			}
			if (e.key === 's' && this.snake.direction !== 'up') {
				this.snake.direction = 'down'
			}

			if (e.key === 'a' && this.snake.direction !== 'right') {
				this.snake.direction = 'left'
			}

			if (e.key === 'd' && this.snake.direction !== 'left') {
				this.snake.direction = 'right'
			}
		})

		setInterval(() => {
			this.tick()
		}, 100)
	}
}
