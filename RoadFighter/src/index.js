import {
  drawRoad,
  moveRoad,
} from './road'

const canvasWidth = 900
const canvasHeight = 600

const { requestAnimationFrame } = window
const fps = 24
let prevTime = 0

const render = (game, time) => {
  const { ctx, speed } = game

  if (time - prevTime > 1000 / fps) {
  // counterOfF++
  // if (counterOfF === (fps * timeToMoveDown) / 1000) {
  //   counterOfF = 0
  //   if (block && block.isAlive) {
  //     position.y++
  //   } else {
  //     block = null
  //   }
  // }

    moveRoad(game, speed)
    drawRoad(game)
    prevTime = time
  }

  requestAnimationFrame((time) => render(game, time))
};


window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const game = {
    ctx,
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
    },
    speed: 20,
  }
  render(game)
}
