import rf from './road'

console.log(rf());

const canvasWidth = 900
const canvasHeight = 600

const roadWidth = 500
const roadHeight = canvasHeight
const numberOfRoadStrips = 2

const roadColor = 'darkslategray'
const roadBorderColor = '#72bb53'
const borderWidth = 10

const drawRoad = (game) => {
  console.log('drawRoad')
  const { ctx } = game

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

  drawRoadMarkupLines(ctx)
};


const linePartLength = 50
const linePartWidth = 10
const gapLength = 20
const linePartColor = 'white'

const drawRoadMarkupLines = (ctx) => {
  const numberOfLines = numberOfRoadStrips - 1
  const numberOfLineParts = roadHeight / (linePartLength + gapLength)
  const arrayOfLinesParts = Array
    .from({length: numberOfLineParts})
    .map((part, idx) => (
      {
        x: (canvasWidth / 2 - borderWidth) - linePartWidth / 2,
        y: ((idx + 1) * (linePartLength + gapLength)),
      }
    ))

  ctx.fillStyle = linePartColor
  arrayOfLinesParts.forEach((linePart) => {
    const { x, y } = linePart
    ctx.fillRect(x, y, linePartWidth, linePartLength)
  })

  // console.log('arrayOfLinesParts', arrayOfLinesParts)
}




const { requestAnimationFrame } = window
const fps = 24
let prevTime = 0

const render = (game, time) => {
  // console.log('time', time)x
  const { ctx } = game

  if (time - prevTime > 1000 / fps) {
  // counterOfF++
  // if (counterOfF === (fps * timeToMoveDown) / 1000) {
  //   counterOfF = 0
  //   if (block && block.isAlive) {
  //     position.y++
  //   } else {
  //     block = null
  //   }
  // }
    drawRoad(game)
    prevTime = time
  }

  requestAnimationFrame((time) => render(game, time))
};



window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const game = {
    ctx,
  }
  render(game)
}
