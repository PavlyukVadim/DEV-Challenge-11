import carImg from './../assets/car.png'

class Player {
  constructor(x = 300, y = 400) {
    this.x = x
    this.y = y
    const image = new Image()
    image.src = carImg
    this.image = image
    this.rotationDirection = null
  }

  draw(ctx) {
    const {
      x,
      y,
      prevPos,
      rotationDirection,
    } = this

    const {
      width: pWidth,
      height: pHeight,
      rotationDeg,
    } = Player

    if (rotationDirection) {
      ctx.save()
      const deg = rotationDirection === 'right' ? rotationDeg : -rotationDeg

      var rad = deg * Math.PI / 180

      //Set the origin to the center of the image
      ctx.translate(x + pWidth / 2, y + pHeight / 5)

      //Rotate the canvas around the origin
      ctx.rotate(rad)
      ctx.drawImage(this.image, pWidth / 2 * (-1), pHeight / 5 * (-1), pWidth, pHeight)

      ctx.restore()
    } else {
      ctx.drawImage(this.image, x, y, Player.width, Player.height)
    }
  }

  moveCarByEvent(e) {
    switch(e.key) {
      case 'ArrowLeft': {
        this.x -= 10
        this.rotationDirection = 'left'
        break
      }
      case 'ArrowRight': {
        this.x += 10
        this.rotationDirection = 'right'
        break
      }
      case 'ArrowDown': {
        if (this.y + 10 < 100) {
          this.y++
        }
        break
      }
      case 'ArrowUp': {
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
