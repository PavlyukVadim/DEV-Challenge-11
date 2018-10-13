import { getRoadWidth } from './../road'

export const getRoadsideWidth = (game) => {
  const { canvas: { width: canvasWidth }} = game
  const roadWidth = getRoadWidth()

  const roadsideWidth = (canvasWidth - roadWidth) / 2
  return roadsideWidth
}

export const getCanvasProps = (game) => {
  const { canvas } = game
  return canvas
}
