export const checkCollisions = (obj1, obj2, obj1Props, obj2Props) => {
  if (
    (
      (
        (obj1.x <= obj2.x + obj2Props.width) &&
        (obj1.x >= obj2.x)
      ) ||
      (
        (obj1.x + obj1Props.width >= obj2.x) &&
        (obj1.x + obj1Props.width <= obj2.x + obj2Props.width)
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
