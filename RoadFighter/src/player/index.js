import Car from './../car'
import {
  getSpeed,
  setSpeed,
  activatePedal,
  resetPedal,
} from './../helpers'


class Player extends Car {
  constructor(x = 300, y = 400, imgSrc) {
    super(x, y, imgSrc)
    this.rotationDirection = null
  }

  draw(ctx) {
    const { x, y, rotationDirection } = this
    const {
      width: pWidth,
      height: pHeight,
      rotationDeg,
    } = Player

    if (rotationDirection) {
      ctx.save()
      const deg = rotationDirection === 'right' ? rotationDeg : -rotationDeg

      var rad = deg * Math.PI / 180

      // Set the origin to the center of the image
      ctx.translate(x + pWidth / 2, y + pHeight / 5)

      // Rotate the canvas around the origin
      ctx.rotate(rad)
      ctx.drawImage(this.image, pWidth / 2 * (-1), pHeight / 5 * (-1), pWidth, pHeight)

      ctx.restore()
    } else {
      ctx.drawImage(this.image, x, y, Player.width, Player.height)
    }
  }

  moveCarByEvent(e, game) {
    const speed = getSpeed(game)
    switch(e.key) {
      case 'ArrowLeft': {
        this.x -= 0.4 * speed
        this.rotationDirection = 'left'
        break
      }
      case 'ArrowRight': {
        this.x += 0.4 * speed
        this.rotationDirection = 'right'
        break
      }
      case 'ArrowDown': {
        activatePedal(game, 'brake')
        break
      }
      case 'ArrowUp': {
        activatePedal(game, 'gas')
        break
      }
    }
  }

  stopKeyEvent(e, game) {
    switch(e.key) {
      case 'ArrowLeft': {
        this.stopTurning()
        break
      }
      case 'ArrowRight': {
        this.stopTurning()
        break
      }
      case 'ArrowDown': {
        resetPedal(game, 'brake')
        break
      }
      case 'ArrowUp': {
        resetPedal(game, 'gas')
        break
      }
    }
  }

  stopTurning() {
    this.rotationDirection = null
  }
}

Player.height = 160
Player.width = 80
Player.rotationDeg = 10

export default Player
