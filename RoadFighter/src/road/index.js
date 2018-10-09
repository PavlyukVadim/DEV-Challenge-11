import LinePart from './linePart'

const roadWidth = 500
const roadHeight = 600
const numberOfRoadStrips = 2

const roadColor = 'darkslategray'
const roadBorderColor = '#72bb53'
const borderWidth = 10

export const drawRoad = (game) => {
  const {
    ctx,
    canvas: { width: canvasWidth },
    road,
  } = game

  ctx.fillStyle = roadColor
  ctx.strokeStyle = roadBorderColor
  ctx.lineWidth = borderWidth

  const roadX = (canvasWidth - roadWidth) / 2
  const roadY = 0

  const args = [
    roadX,
    roadY,
    roadWidth,
    roadHeight,
  ]

  ctx.fillRect(...args)
  ctx.strokeRect(...args)

  if (!road) {
    const lineParts = getInitialMarkupLines(game)
    game.road = {
      lineParts,
    }
  }
  const { road: { lineParts } } = game
  drawRoadMarkupLines(lineParts, ctx)
};


export const moveRoad = (game, shiftY) => {
  if (!game.road) return
  const { road: { lineParts = [] } } = game
  lineParts.forEach((linePart) => {
    linePart.move(shiftY)
  })
}


const getInitialMarkupLines = (game) => {
  const {
    linePartLength,
    gapLength,
    linePartWidth,
  } = LinePart
  const { canvas: { width: canvasWidth } } = game
  const numberOfLines = numberOfRoadStrips - 1
  const numberOfLineParts = roadHeight / (linePartLength + gapLength)
  const arrayOfLinesParts = Array
    .from({length: numberOfLineParts + 1})
    .map((part, idx) => {
      const x = (canvasWidth / 2 - borderWidth) - linePartWidth / 2
      const y = (idx * (linePartLength + gapLength)) - linePartLength
      return new LinePart(x, y)
    })
  return arrayOfLinesParts
}


const drawRoadMarkupLines = (lineParts, ctx) => {
  const { linePartColor } = LinePart
  ctx.fillStyle = linePartColor
  lineParts.forEach((linePart) => {
    linePart.draw(ctx)
  })
}
