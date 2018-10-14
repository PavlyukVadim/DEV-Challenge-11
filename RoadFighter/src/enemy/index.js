import Car from './../car'

import {
  getSpeed,
  checkCollisions,
  getCanvasProps,
  getCurrentCircle,
  getRoadsideWidth,
} from './../helpers'

import { getRoadWidth } from './../road'
import config from './../config'

const { enemiesCirclesSpeedRanges } = config

class Enemy extends Car {
  constructor(game, imgSrc) {
    const { canvas: { width: canvasWidth }} = game
    const roadWidth = getRoadWidth()
    const roadsideWidth = (canvasWidth - roadWidth) / 2

    const randomVar = Math.random()

    const x = (randomVar * (roadWidth - Enemy.width)) + roadsideWidth
    const y = -Enemy.height

    super(x, y, imgSrc)

    const circle = getCurrentCircle(game)
    const [minSpeed, maxSpeed] = enemiesCirclesSpeedRanges[circle - 1]

    this.speed = (randomVar * (maxSpeed - minSpeed)) + minSpeed
    this.direction = randomVar < 0.33
      ? 'left'
      : randomVar > 0.66
        ? 'right'
        : null
    this.numberOfValidtions = 0
    this.rotationDirection = null
  }

  move(game) {
    const speed = getSpeed(game)
    this.y = this.y + (speed - this.speed)

    const circle = getCurrentCircle(game)
    const shift = this.speed * 0.05 * (circle - 1)

    const roadWidth = getRoadWidth()
    const roadsideWidth = getRoadsideWidth(game)

    if (this.direction === 'left') {
      this.x -= shift
      if (this.x < roadsideWidth) {
        this.direction = 'right'
      }
    } else if (this.direction === 'right') {
      this.x += shift
      if (this.x > roadsideWidth + roadWidth - Enemy.width) {
        this.direction = 'left'
      }
    }
  }

  validation(game) {
    this.numberOfValidtions++
    // make validation on each 5th iteration
    if (this.numberOfValidtions < 5) return true
    else this.numberOfValidtions = 0

    const { y } = this
    const { height: canvasHeight } = getCanvasProps(game)

    if (
      (y + Enemy.height < -canvasHeight) ||
      (y > canvasHeight)
    ) return false

    const {
      objects: { enemies = [] },
    } = game

    // check collisions with another enemies
    return enemies.every((enemy) => {
      if (enemy === this) return true
      const isCollision = checkCollisions(this, enemy, Enemy, Enemy)
      if (isCollision) return false
      return true
    })

    return true
  }
}
Enemy.height = 160
Enemy.width = 80

export default Enemy
