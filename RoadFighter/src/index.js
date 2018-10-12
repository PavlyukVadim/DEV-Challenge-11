import {
  drawRoad,
  moveRoad,
} from './road'

import { drawMap } from './map'

import Player from './player'
import Enemy from './enemy'

import {
  getSpeed,
  setSpeed,
  updateSpeed,
  checkCollisions,
  controlEnemies,
} from './helpers'

import playerImg from './assets/car.png'

const canvasWidth = 1000
const canvasHeight = 600

const { requestAnimationFrame } = window
const fps = 24
let prevTime = 0

const render = (game, time) => {
  const {
    ctx,
    player,
  } = game

  const speed = getSpeed(game)

  if (time - prevTime > 1000 / fps) {
    clearCanvas(ctx)

    moveRoad(game)
    drawRoad(game)

    updateSpeed(game, speed)
    outputSpeed(speed)

    player.draw(ctx)

    controlEnemies(game)

    checkEnemiesCollisions(game)

    prevTime = time
  }

  requestAnimationFrame((time) => render(game, time))
}

const checkEnemiesCollisions = (game) => {
  const {
    player,
    objects: { enemies = []},
  } = game

  enemies.forEach((enemy) => {
    const isCollision = checkCollisions(player, enemy, Player, Enemy)
    if (isCollision) { console.log('coli') }
  })
}

const speedEl = document.getElementById('speed')
const outputSpeed = (speed) => {
  speedEl.innerHTML = speed
}

const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
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
    objects: {
      enemies: [],
      trees: [],
    }
  }
  setSpeed(game, 20)
  addEventListener('keydown', (e) => player.moveCarByEvent.bind(player)(e, game))
  addEventListener('keyup', (e) => player.stopKeyEvent.bind(player)(e, game))
  render(game)
}
