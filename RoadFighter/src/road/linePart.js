import { getSpeed } from './../helpers'

class LinePart {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  move(game) {
    const speed = getSpeed(game)
    LinePart.linePartLength = 50 + speed
    const { y } = this
    this.y += speed
    if (this.y > 600) {
      this.y = this.y - 600 - LinePart.linePartLength
    }
  }

  draw(ctx) {
    const { x, y } = this
    const { linePartWidth, linePartLength } = LinePart
    ctx.fillRect(x, y, linePartWidth, linePartLength)
  }
}
LinePart.linePartLength = 75
LinePart.linePartWidth = 10
LinePart.gapLength = 25
LinePart.linePartColor = 'white'

export default LinePart
