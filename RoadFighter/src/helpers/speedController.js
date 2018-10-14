const acceleration = 10

const MAX_SPEED = 100
const MIN_SPEED = 0

export const setSpeed = (game, newSpeed) => {
  if (!game || !game.control) return
  game.control.speed = newSpeed
}

export const getSpeed = (game) => {
  if (!game || !game.control) return
  const { control : { speed }} = game
  return speed
}

export const removeSpeedInterval = (game) => {
  game.control.removeInterval = true
}

export const updateSpeed = (game, newSpeed) => {
  const initialActivePedal = getActiveControlType(game, 'pedals')
  const { control: { prevPedal, removeInterval } } = game
  if ((initialActivePedal === prevPedal) && !removeInterval) return

  const currentSpeed = getSpeed(game)
  let timeFrom = 0
  const intervalPeriod = 50

  const interval = setInterval(() => {
    const activePedal = getActiveControlType(game, 'pedals')
    const activeTurn = getActiveControlType(game, 'turn')

    let newSpeed
    if (initialActivePedal === 'gas') {
      newSpeed = currentSpeed + timeFrom * acceleration
    } else if (initialActivePedal === 'brake') {
      newSpeed = currentSpeed - timeFrom * (acceleration * 5)
    } else {
      newSpeed = currentSpeed - timeFrom * (acceleration / 2)
    }

    setSpeed(game, newSpeed)

    timeFrom += (intervalPeriod / 1000)

    if (activePedal !== initialActivePedal || game.control.removeInterval) {
      customClearInterval(game, interval)
    }

    if (initialActivePedal === 'gas') {
      if (newSpeed >= MAX_SPEED) {
        setSpeed(game, MAX_SPEED)
        customClearInterval(game, interval)
      }
    } else {
      if (newSpeed <= MIN_SPEED) {
        setSpeed(game, MIN_SPEED)
        customClearInterval(game, interval)
      }
    }
  }, intervalPeriod)
  game.control.prevPedal = initialActivePedal
}

const customClearInterval = (game, interval) => {
  clearInterval(interval)
  game.control.removeInterval = false
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

export const activateTurn = (game, turnType) => {
  if (!game || !game.control) return
  const turnState = getTurnState(game, turnType)
  if (turnState) return
  // reset all pedals to false
  Object.keys(game.control.turn)
    .forEach((key) => resetTurn(game, key))
  game.control.turn[turnType] = true
}

// reset pedals or turn
const resetControlType = (game, controlType, key) => {
  if (
    !game ||
    !game.control ||
    !game.control[controlType]
  ) return
  game.control[controlType][key] = false
}

export const resetPedal = (game, key) => {
  resetControlType(game, 'pedals', key)
}

export const resetTurn = (game, key) => {
  resetControlType(game, 'turn', key)
}

// get active pedals or turn
const getActiveControlType = (game, controlType) => {
  const active = Object.keys(game.control[controlType])
    .find((key) => {
      return game.control[controlType][key]
    })
  return active
}

export const getActiveTurn = (game) => getActiveControlType(game, 'turn')

const getPedalState = (game, pedalType) => {
  return game.control.pedals[pedalType]
}

const getTurnState = (game, turnType) => {
  return game.control.turn[turnType]
}
