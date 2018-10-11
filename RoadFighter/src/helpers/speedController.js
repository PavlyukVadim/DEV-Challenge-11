const acceleration = 5

const MAX_SPEED = 50
const MIN_SPEED = 10

export const setSpeed = (game, newSpeed) => {
  if (!game || !game.control) return
  game.control.speed = newSpeed
}

export const getSpeed = (game) => {
  if (!game || !game.control) return
  const { control : { speed }} = game
  return speed
}

export const updateSpeed = (game, newSpeed) => {
  const initialActivePedal = getActivePedal(game)
  if (initialActivePedal === game.control.prevPedal) return

  const currentSpeed = getSpeed(game)
  let timeFrom = 0
  const intervalPeriod = 50

  const interval = setInterval(() => {
    const activePedal = getActivePedal(game)

    let newSpeed
    if (initialActivePedal === 'gas') {
      newSpeed = currentSpeed + timeFrom * acceleration
    } else if (initialActivePedal === 'brake') {
      newSpeed = currentSpeed - timeFrom * (acceleration * 2)
    } else {
      newSpeed = currentSpeed - timeFrom * (acceleration / 2)
    }

    setSpeed(game, newSpeed)
    timeFrom += (intervalPeriod / 1000)

    if (activePedal !== initialActivePedal) {
      clearInterval(interval)
    }

    if (initialActivePedal === 'gas') {
      if (newSpeed >= MAX_SPEED) {
        setSpeed(game, MAX_SPEED)
        clearInterval(interval)
      }
    } else {
      if (newSpeed <= MIN_SPEED) {
        setSpeed(game, MIN_SPEED)
        clearInterval(interval)
      }
    }
  }, intervalPeriod)
  game.control.prevPedal = initialActivePedal
}

export const activatePedal = (game, pedalType) => {
  if (!game || !game.control) return
  const pedalState = getPedalState(game, pedalType)
  if (pedalState) return
  // reset all pedals to false
  Object.keys(game.control.pedals)
    .forEach((key) => resetPedal(game, key))
  game.control.pedals[pedalType] = true
}

export const resetPedal = (game, pedalType) => {
  if (
    !game ||
    !game.control ||
    !game.control.pedals
  ) return
  game.control.pedals[pedalType] = false
}

const getActivePedal = (game) => {
  const active = Object.keys(game.control.pedals)
    .find((key) => {
      return game.control.pedals[key]
    })
  return active
}

const getPedalState = (game, pedalType) => {
  return game.control.pedals[pedalType]
}
