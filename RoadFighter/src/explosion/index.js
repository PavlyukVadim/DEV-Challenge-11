import { getSpeed } from './../helpers'
import explosprite from './../assets/explosprite.png'

const FRAME_SIZE = 128

class Explosion {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y

    this.image = new Image()
    this.image.src = explosprite

    this.currentFrame = 0
  }

  move(game) {
    const speed = getSpeed(game)
    const { y } = this
    this.y += speed
    if (this.y > 600) {
      this.y = this.y - 600 - Explosion.height
    }
  }

  draw(ctx) {
    if (this.currentFrame > 15) return

    const { x, y } = this
    const dx = (this.currentFrame % 4) * FRAME_SIZE
    const dy = Math.floor(this.currentFrame / 4) * FRAME_SIZE

    ctx.drawImage(
      this.image,
      dx, dy,
      Explosion.width, Explosion.height,
      x, y,
      FRAME_SIZE, FRAME_SIZE
    )

    this.currentFrame++
  }

  validation() {
    const { y } = this
    if ((y < -Explosion.height / 2) || (y > 600)) return false
    if (this.currentFrame > 15) return false
    return true
  }
}
Explosion.height = FRAME_SIZE
Explosion.width = FRAME_SIZE

export default Explosion
