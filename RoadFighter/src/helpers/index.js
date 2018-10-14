export {
  setSpeed,
  getSpeed,
  updateSpeed,
  activatePedal,
  activateTurn,
  getActiveTurn,
  resetPedal,
  resetTurn,
  removeSpeedInterval,
} from './speedController'

export {
  checkCollisions,
} from './collisionsController'

export {
  controlEnemies,
  controlTrees,
  controlExplosions,
} from './objectsGenerationController'

export {
  getRoadsideWidth,
  getCanvasProps,
  getIsAudioPlaying,
} from './common'

export {
  updateDistance,
  getCurrentCircle,
} from './scoreController'

export {
  outputCurrentInfo,
  clearCircleInfo,
} from './outputController'
