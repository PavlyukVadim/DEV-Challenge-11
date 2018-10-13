import Car from './../car'

import {
  getSpeed,
  checkCollisions,
  getCanvasProps,
} from './../helpers'
import { getRoadWidth } from './../road'

const ENEMY_MAX_SPEED = 30
const ENEMY_MIN_SPEED = 15

class Enemy extends Car {
  constructor(game, imgSrc) {
    const { canvas: { width: canvasWidth }} = game
    const roadWidth = getRoadWidth()

    const roadsideWidth = (canvasWidth - roadWidth) / 2

    const x = (Math.random() * (roadWidth - Enemy.width)) + roadsideWidth
    const y = -Enemy.height

    super(x, y, imgSrc)
    this.speed = (Math.random() * (ENEMY_MAX_SPEED - ENEMY_MIN_SPEED)) + ENEMY_MIN_SPEED
    this.rotationDirection = null
  }

  move(game) {
    const speed = getSpeed(game)
    this.y = this.y + (speed - this.speed)
  }

  validation(game) {
    const { y } = this
    const { height: canvasHeight } = getCanvasProps(game)

    if (
      (y + Enemy.height < -canvasHeight) ||
      (y > canvasHeight)
    ) return false

    const {
      objects: { enemies = [] },
    } = game

    const anotherEnemies = enemies.filter((enemy) => enemy !== this)
    const currentEenemy = this

    // check collisions with another enemies
    return anotherEnemies.every((enemy) => {
      const isCollision = checkCollisions(currentEenemy, enemy, Enemy, Enemy)
      if (isCollision) return false
      return true
    })

    return true
  }
}
Enemy.height = 160
Enemy.width = 80

export default Enemy
