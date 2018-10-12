import imgSrc from './../assets/tree.png'
import { getSpeed } from './../helpers'
import { getRoadWidth } from './index'

class Tree {
  constructor(game) {
    const { canvas: { width: canvasWidth }} = game
    const roadWidth = getRoadWidth()

    const roadsideWidth = (canvasWidth - roadWidth) / 2
    const side = Math.random() > 0.5 ? 'rigth' : 'left'

    const x = Math.random() * (roadsideWidth - Tree.width)
    this.x = side === 'left' ? x : roadWidth + roadsideWidth + x
    this.y = -Tree.height

    this.image = new Image()
    this.image.src = imgSrc
  }

  move(game) {
    const speed = getSpeed(game)
    const { y } = this
    this.y += speed
    if (this.y > 600) {
      this.y = this.y - 600 - Tree.height
    }
  }

  draw(ctx) {
    const { x, y } = this
    ctx.drawImage(this.image, x, y, Tree.width, Tree.height)
  }

  validation() {
    const { y } = this
    if (
      (y + Tree.height < -600) ||
      (y > 600)
    ) return false
    return true
  }
}
Tree.width = 50
Tree.height = 100

export default Tree
