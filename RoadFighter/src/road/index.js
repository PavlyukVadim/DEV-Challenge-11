import Tree from './tree'

import {
  controlTrees,
  getSpeed,
  getRoadsideWidth,
} from './../helpers'

import roadTexture from './../assets/road.jpg'

const roadWidth = 400

const roadImg = new Image()
roadImg.src = roadTexture

class RoadPart {
  constructor(game, x, y) {
    const {
      ctx,
      canvas: {
        width: canvasWidth,
        height: canvasHeight,
      },
      road,
    } = game

    const roadX = (x !== undefined) ? x : (canvasWidth - roadWidth) / 2
    const roadY = (y !== undefined) ? y : 0

    this.x = roadX
    this.y = roadY
    this.roadHeight = canvasHeight
  }

  draw(ctx) {
    ctx.drawImage(
      roadImg,
      0, 0,
      400, 400,
      this.x, this.y,
      roadWidth, this.roadHeight
    )
  }

  move(game) {
    const speed = getSpeed(game)
    this.y += speed

    if (this.y >= this.roadHeight) {
      const anotherPart = getNeighborPart(game, this)
      this.y = anotherPart.y - this.roadHeight + speed
    }
  }
}

const getNeighborPart = (game, somePart) => {
  const { road } = game
  return road.find((part) => part !== somePart)
}

export const drawRoad = (game) => {
  const {
    ctx,
    canvas: {
      height: canvasHeight,
    },
    road,
  } = game
  if (!road.length) {
    const roadPart1 = new RoadPart(game)
    const roadPart2 = new RoadPart(game, undefined, canvasHeight)

    road.push(roadPart1, roadPart2)
  }

  const roadsideWidth = getRoadsideWidth(game)
  const roadWidth = getRoadWidth()

  ctx.fillStyle = '#494948'
  ctx.fillRect(
    roadsideWidth, 0,
    roadWidth, 100
  )

  road.forEach((part) => {
    part.draw(ctx)
  })

  controlTrees(game)
};


export const getRoadWidth = () => {
  return roadWidth
}

export const moveRoad = (game) => {
  if (!game.road) return
  const {
    road = [],
    objects: { trees = [] },
  } = game

  road.forEach((part) => {
    part.move(game)
  })

  trees.forEach((tree) => {
    tree.move(game)
  })
}
