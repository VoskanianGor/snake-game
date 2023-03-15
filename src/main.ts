import './style.css'

import { BLOCK_SIZE, COLS, ROWS } from './Constants'
import { Settings } from './Settings'
import { SnakeGame } from './SnakeGame'

const app = document.querySelector<HTMLDivElement>('#app')!
const canvas = document.createElement('canvas')
canvas.id = 'game'

const settings = new Settings(canvas, ROWS, COLS, BLOCK_SIZE)
const game = new SnakeGame(settings)

settings.setup(canvas, app)
game.start()
