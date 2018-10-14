import {
  getSpeed,
  clearCircleInfo,
  removeSpeedInterval,
  setSpeed,
  updateSpeed,
  resetTurn,
  resetPedal,
  getIsAudioPlaying,
} from './index'

import config from './../config'
const { fps, fullCircleDistance } = config

export const updateDistance = (game) => {
  const koef = 0.8
  const { score } = game
  const speed = getSpeed(game)
  score.distance += speed * (1000 / fps / 1000) * koef

  if (!score.startTime) {
    score.startTime = new Date()
  }

  if (score.distance >= fullCircleDistance) {
    const now = new Date()
    const time = Number((now - score.startTime) / 1000).toFixed(1)
    score.startTime = now
    score.circles.push(time)
    score.distance = 0
  }

  if (score.circles.length >= 5) {
    gameOver(game)
  }
}

export const getCurrentCircle = (game) => {
  const { score: { circles } } = game
  const currentCircle = circles.length + 1
  return currentCircle
}

const applauseAudioElm = document.getElementById('applauseAudio')

const gameOver = (game) => {
  const {
    score,
    music: { background },
    objects,
    player,
  } = game
  const totalScore = score.circles.reduce((pr, el) => pr + (+el), 0)
  const formattedScore = Number(totalScore).toFixed(1)
  const msg = `Your total score is ${formattedScore}s. Press ok to try again`

  background.pause()

  const isApplauseAudio = getIsAudioPlaying(applauseAudio)
  if(!isApplauseAudio) applauseAudio.play()

  removeSpeedInterval(game)
  setSpeed(game, 20)
  updateSpeed(game, 20)

  resetPedal(game, 'gas')
  resetPedal(game, 'brake')

  resetTurn(game, 'left')
  resetTurn(game, 'right')
  player.stopTurning()
  player.x = 300

  alert(msg)

  applauseAudio.pause()
  objects.enemies = []
  objects.explosions = []
  score.circles = []

  clearCircleInfo()

  setTimeout(() => {
    background.currentTime = 0
    background.play()
  }, 500)
}
