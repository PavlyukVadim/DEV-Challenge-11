import { getSpeed } from './index'
import config from './../config'

export const outputCurrentInfo = (game) => {
  const speed = getSpeed(game)
  outputSpeed(speed)

  const { score } = game
  outputCarIcon(score.distance)
  outputCircleInfo(score)
}

const speedEl = document.getElementById('speed')
const outputSpeed = (speed) => {
  speedEl.innerHTML = Number(speed).toFixed(1)
}

const carIconElement = document.getElementById('car-icon')
const outputCarIcon = (distance) => {
  const { fullCircleDistance } = config
  carIconElement.style.bottom = `${(distance / fullCircleDistance) * 80}%`
}

const circleNumberElement = document.getElementById('circle-number')
const circlesInfoElement = document.getElementsByClassName('circles')[0]
const outputCircleInfo = (score) => {
  const { circles = [] } = score
  const currentCircle = circles.length + 1
  circleNumberElement.innerHTML = currentCircle

  const circlesElements = circlesInfoElement.getElementsByClassName('circle')
  if (circlesElements.length < circles.length) {
    const el = document.createElement('div')
    el.classList.add('circle')
    el.innerHTML = `${currentCircle - 1}. ${circles[currentCircle - 2]}s`

    circlesInfoElement.appendChild(el)
  }
}

export const clearCircleInfo = () => {
  circlesInfoElement.innerHTML = '';
}
