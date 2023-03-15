export function drawBlock(
	ctx: CanvasRenderingContext2D,
	row: number,
	col: number,
	blockSize: number,
	color: string
) {
	ctx.fillStyle = color
	ctx.fillRect(col * blockSize, row * blockSize, blockSize, blockSize)
}
