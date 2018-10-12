import Enemy from './../enemy'
import enemyImg from './../assets/enemy.png'

import Tree from './../road/tree'

const MAX_ENEMIES_NUMBER = 3
export const controlEnemies = (game) => {
  const { objects: { enemies }, ctx } = game

  if (enemies.length < MAX_ENEMIES_NUMBER) {
    const shouldGenerateNew = Math.random() > 0.95
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
      enemies.splice(idx, 1)
    }
  })
}


const MAX_TREES_NUMBER = 50
export const controlTrees = (game) => {
  const { objects: { trees }, ctx } = game
  if (trees.length < MAX_TREES_NUMBER) {
    const shouldGenerateNew = Math.random() > 0.9
    if (shouldGenerateNew) {
      const tree = new Tree(game)
      trees.push(tree)
    }
  }

  trees.forEach((tree, idx) => {
    const isAlive = tree.validation()
    if (isAlive) {
      tree.draw(ctx)
    } else {
      trees.splice(idx, 1)
    }
  })
}
