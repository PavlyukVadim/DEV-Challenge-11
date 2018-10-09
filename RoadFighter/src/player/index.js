import carImg from './../assets/car.png'

class Player {
  constructor(x = 300, y = 400) {
    this.x = x
    this.y = y
    const image = new Image()
    image.src = carImg
    this.image = image
  }

  draw(ctx) {
    const { x, y } = this
    ctx.drawImage(this.image, x, y, Player.width, Player.height);
  }
}
Player.height = 160
Player.width = 80

export default Player
