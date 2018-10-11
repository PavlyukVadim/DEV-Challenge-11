import Car from './../car'

class Enemy extends Car {
  constructor(x = 300, y = 100, imgSrc) {
    super(x, y, imgSrc)
    this.rotationDirection = null
  }

  move(game) {
    this.y = this.y + (game.speed - 20)
  }
}
Enemy.height = 160
Enemy.width = 80

export default Enemy
