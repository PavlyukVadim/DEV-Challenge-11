import {
  drawRoad,
  moveRoad,
} from './road'

import Player from './player'

const canvasWidth = 900
const canvasHeight = 600

const { requestAnimationFrame } = window
const fps = 24
let prevTime = 0

const render = (game, time) => {
  const {
    ctx,
    player,
    speed,
  } = game

  if (time - prevTime > 1000 / fps) {
    clearCanvas(ctx)
    moveRoad(game, speed)
    drawRoad(game)
    player.draw(ctx)
    prevTime = time
  }

  requestAnimationFrame((time) => render(game, time))
};

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, canvasHeight, canvasWidth)
}

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const player = new Player()
  const game = {
    ctx,
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
    },
    player,
    speed: 20,
  }
  addEventListener('keydown', (e) => player.moveCarByEvent.bind(player)(e))
  addEventListener('keyup', () => player.stopTurning())
  render(game)
}
