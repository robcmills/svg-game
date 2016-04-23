
export const getValidCircleMoves = ({ shape }) => {
  const validMoves = [{ xIndex: 2, yIndex: 4 }]
  return validMoves
}

export const getValidShapeMoves = ({ shape }) => {
  const validMoves = []
  switch (shape.type) {
    case 'circle':
      validMoves.push(...getValidCircleMoves({ shape }))
      break
    case 'square':
      break
    case 'triangle':
      break
  }
  return validMoves
}
