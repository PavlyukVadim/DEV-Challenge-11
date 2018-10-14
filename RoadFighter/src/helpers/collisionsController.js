export const checkCollisions = (
  obj1,
  obj2,
  obj1Props,
  obj2Props,
  obj1Border = 10,
  obj2Border = 10,
) => {
  if (
    (
      (
        (obj1.x + obj1Border <= obj2.x + obj2Props.width - obj2Border) &&
        (obj1.x + obj1Border >= obj2.x + obj2Border)
      ) ||
      (
        (obj1.x + obj1Props.width - obj1Border >= obj2.x + obj2Border) &&
        (obj1.x + obj1Props.width - obj1Border <= obj2.x + obj2Props.width - obj2Border)
      )
    ) &&
    (
      (obj1.y <= obj2.y + obj2Props.height) && (obj1.y > obj2.y) ||
      (obj1.y <= obj2.y) && (obj1.y + obj1Props.height > obj2.y)
    )
  ) {
    return true
  }
  return false
}
