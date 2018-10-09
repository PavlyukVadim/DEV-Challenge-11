class LinePart {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  move(shiftY) {
    const { y } = this
    this.y += shiftY
    if (this.y > 600) {
      this.y = -LinePart.linePartLength
    }
  }

  draw(ctx) {
    const { x, y } = this
    const { linePartWidth, linePartLength } = LinePart
    ctx.fillRect(x, y, linePartWidth, linePartLength)
  }
}
LinePart.linePartLength = 50
LinePart.linePartWidth = 10
LinePart.gapLength = 15
LinePart.linePartColor = 'white'

export default LinePart
