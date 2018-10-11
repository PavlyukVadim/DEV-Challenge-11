import {
  drawRoad,
  moveRoad,
} from './road'

import { drawMap } from './map'

import Player from './player'
import Enemy from './Enemy'

import {
  getSpeed,
  setSpeed,
  updateSpeed,
} from './helpers'

import carImg from './assets/enemy.png'
import playerImg from './assets/car.png'

const canvasWidth = 900
const canvasHeight = 600

const { requestAnimationFrame } = window
const fps = 24
let prevTime = 0

const render = (game, time) => {
  const {
    ctx,
    player,
    enemy,
  } = game

  const speed = getSpeed(game)

  if (time - prevTime > 1000 / fps) {
    clearCanvas(ctx)
    drawRoad(game)
    moveRoad(game, speed)

    updateSpeed(game, speed)
    outputSpeed(speed)

    player.draw(ctx)
    enemy.move(game)
    enemy.draw(ctx)

    checkCollisions(game)

    prevTime = time
  }

  requestAnimationFrame((time) => render(game, time))
}

const checkCollisions = (game) => {
  const { player, enemy } = game
  if (
    (
      (
        (player.x <= enemy.x + Enemy.width) &&
        (player.x >= enemy.x)
      ) ||
      (
        (player.x + Player.width >= enemy.x) &&
        (player.x + Player.width <= enemy.x + Enemy.width)
      )
    ) &&
    (
      (player.y <= enemy.y + Enemy.height) && (player.y > enemy.y) ||
      (player.y <= enemy.y) && (player.y + Player.height > enemy.y)
    )
  ) {
    setSpeed(game, 0)
    console.log('checkCollisions')
  }
}

const speedEl = document.getElementById('speed')
const outputSpeed = (speed) => {
  speedEl.innerHTML = speed
}

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, canvasHeight, canvasWidth)
}

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const player = new Player(300, 400, playerImg)
  const game = {
    ctx,
    canvas: {
      width: canvasWidth,
      height: canvasHeight,
    },
    control: {
      pedals: {
        gas: false,
        brake: false,
      },
      prevPedal: 'gas',
    },
    player,
    enemy: new Enemy(300, 100, carImg)
  }
  setSpeed(game, 20)
  addEventListener('keydown', (e) => player.moveCarByEvent.bind(player)(e, game))
  addEventListener('keyup', (e) => player.stopKeyEvent.bind(player)(e, game))
  render(game)
}
