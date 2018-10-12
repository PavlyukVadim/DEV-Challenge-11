class Car {
  constructor(x = 0, y = 0, imgSrc) {
    this.x = x
    this.y = y
    this.image = new Image()
    this.image.src = imgSrc
  }

  draw(ctx, game) {
    const {
      x,
      y,
      rotationDirection,
    } = this

    const {
      width: pWidth,
      height: pHeight,
    } = Car

    ctx.drawImage(this.image, x, y, Car.width, Car.height)
  }
}
Car.height = 160
Car.width = 80

export default Car
