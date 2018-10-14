import Enemy from './../enemy'
import enemyImg from './../assets/enemy.png'

import Tree from './../road/tree'
import Explosion from './../explosion'

import config from './../config'

// enemies

const enemiesCrashAudioElm = document.getElementById('enemiesCrashAudio')
const { maxEnemiesNumber, probabilityOfEnemyCreation } = config
export const controlEnemies = (game) => {
  const {
    ctx,
    objects: {
      enemies,
      explosions,
    },
  } = game

  if (enemies.length < maxEnemiesNumber) {
    const shouldGenerateNew = Math.random() < probabilityOfEnemyCreation
    if (shouldGenerateNew) {
      const enemy = new Enemy(game, enemyImg)
      enemies.push(enemy)
    }
  }

  enemies.forEach((enemy, idx) => {
    enemy.move(game)
    const isAlive = enemy.validation(game)
    if (isAlive) {
      enemy.draw(ctx)
    } else {
      const removedEnemy = enemies.splice(idx, 1)[0]
      if (!removedEnemy.drawn) return
      const explosion = new Explosion(removedEnemy.x, removedEnemy.y)
      const isExplosionAlive = explosion.validation(game)
      if (isExplosionAlive) {
        enemiesCrashAudioElm.play()
        explosions.push(explosion)
      }
    }
  })
}

// trees

const { maxTreesNumber, probabilityOfTreeCreation } = config
export const controlTrees = (game) => {
  const { objects: { trees }, ctx } = game
  if (trees.length < maxTreesNumber) {
    const shouldGenerateNew = Math.random() < probabilityOfTreeCreation
    if (shouldGenerateNew) {
      const tree = new Tree(game)
      trees.push(tree)
    }
  }

  trees.forEach((tree, idx) => {
    tree.draw(ctx)
  })
}

// explosions

export const controlExplosions = (game) => {
  const { objects: { explosions }, ctx } = game

  explosions.forEach((explosion, idx) => {
    explosion.move(game)
    const isAlive = explosion.validation(game)
    if (isAlive) {
      explosion.draw(ctx)
    } else {
      explosions.splice(idx, 1)
    }
  })
}
