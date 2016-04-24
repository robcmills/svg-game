import _ from 'lodash'
import {
  elementNames,
  HEX_CARDINALS_CLOCKWISE,
  HEX_CARDINALS_COUNTER_CLOCKWISE,
} from 'data/constants'

export const getHex = ({ map, xIndex, yIndex }) => {
  return _.get(map, `[${yIndex}][${xIndex}]`)
}

export const getShape = ({ shapes, xIndex, yIndex }) => {
  return _.find(shapes, { xIndex, yIndex })
}

export const isElementHex = ({ hex }) => _.indexOf(elementNames, hex.type) > -1

export const isValidConversion = ({ converter, convertee }) => {
  switch (converter) {
    case 'circle':
      return convertee === 'triangle'  // scissors
    case 'square':
      return convertee === 'circle'  // rock
    case 'triangle':
      return convertee === 'square'  // paper
  }
}

export const isValidMove = (args) => {
  console.log('isValidMove', args)
  // { selectedShape, xIndex, yIndex, hex, blackElements, whiteElements, shapes } = args
  const { selectedShape } = args
  if (!selectedShape) {
    throw new Error('A shape must be selected when calling isValidMove')
  }
  const { xIndex, yIndex } = args
  if (selectedShape.xIndex === xIndex && selectedShape.yIndex === yIndex) {
    return false // is selected shape
  }
  let { hex } = args
  if (!hex) {
    const { map } = args
    hex = getHex({ map, xIndex, yIndex })
  }
  if (hex.type === 'empty') {
    return false
  }
  const { blackElements, whiteElements } = args
  const playerElements = selectedShape.color === 'black' ? blackElements : whiteElements
  if (isElementHex({ hex }) &&
    !_.find(playerElements, { type: hex.type })) {
    console.log('isElement')
    return false
  }
  const { shapes } = args
  const shape = getShape({ shapes, xIndex, yIndex })
  if (shape && shape.color === selectedShape.color) {
    return false
  }
  if (shape && shape.color !== selectedShape.color) {
    console.log('conversion')
    return isValidConversion({
      converter: selectedShape.type,
      convertee: shape.type,
    })
  }
  return true
}

export const getCardinalRange = ({ isClockwise, start, end }) => {
  console.log('getCardinalRange', isClockwise, start, end)
  const range = []
  const cardinals = isClockwise ? HEX_CARDINALS_CLOCKWISE : HEX_CARDINALS_COUNTER_CLOCKWISE
  const startIndex = _.indexOf(cardinals, start)
  range.push(..._.slice(cardinals, startIndex))
  range.push(..._.slice(cardinals, 0, startIndex))
  const endIndex = _.indexOf(range, end) + 1
  return _.slice(range, 0, endIndex)
}

export const getAdjacentHex = ({ cardinal, map, xIndex, yIndex }) => {
  console.log('getAdjacentHex', cardinal, xIndex, yIndex)
  const isEvenRow = yIndex % 2 === 0
  const xAdjustA = isEvenRow ? 0 : 1
  const xAdjustB = isEvenRow ? 1 : 0
  switch (cardinal) {
    case 'north':
      return getHex({ map, xIndex, yIndex: yIndex - 2 })
    case 'northEast':
      return getHex({ map, xIndex: xIndex + xAdjustA, yIndex: yIndex - 1 })
    case 'southEast':
      return getHex({ map, xIndex: xIndex + xAdjustA, yIndex: yIndex + 1 })
    case 'south':
      return getHex({ map, xIndex, yIndex: yIndex + 2 })
    case 'southWest':
      return getHex({ map, xIndex: xIndex - xAdjustB, yIndex: yIndex + 1 })
    case 'northWest':
      return getHex({ map, xIndex: xIndex - xAdjustB, yIndex: yIndex - 1 })
  }
}

export const getNorthEastHex = ({ xIndex, yIndex }) => ({ xIndex, yIndex: yIndex - 1 })

export const getAdjacentHexes = (args) => {
  console.log('getAdjacentHexes', args)
  const { center, isClockwise, map, start, end } = args
  const hexes = []
  const cardinalRange = getCardinalRange({ isClockwise, start, end })
  const { blackElements, selectedShape, shapes, whiteElements } = args
  _.forEach(cardinalRange, (cardinal) => {
    const nextHex = getAdjacentHex({
      cardinal, map, xIndex: center.xIndex, yIndex: center.yIndex,
    })
    if (isValidMove({
      selectedShape,
      xIndex: nextHex.xIndex,
      yIndex: nextHex.yIndex,
      hex: nextHex,
      blackElements,
      whiteElements,
      shapes,
    })) {
      hexes.push(nextHex)
    } else {
      return false
    }
  })
  console.log('hexes', hexes)
  return hexes
}

// export const getCircleNorthClockwise = ({ map, selectedShape }) => {
//   const validMoves = []
//   const center = getAdjacentHex({
//     cardinal: 'northEast',
//     map,
//     xIndex: selectedShape.xIndex,
//     yIndex: selectedShape.yIndex
//   })
//   const start = 'north'
//   const end = 'south'
//   const clockwiseHexes = getAdjacentHexes({ map, center, start, end })
//   validMoves.push(...clockwiseHexes)
//   return validMoves
// }

// export const getCircleNorthMoves = (args) => {
//   const validMoves = []
//   const { selectedShape } = args
//   const northHex1 = { xIndex: selectedShape.xIndex, yIndex: selectedShape.yIndex - 2 }
//   if (isValidMove({
//     xIndex: northHex1.xIndex,
//     yIndex: northHex1.yIndex,
//     ...args
//   })) {
//     validMoves.push(northHex1)
//   } else {
//     return validMoves
//   }
//   validMoves.push(...getCircleNorthClockwise(args))
//   // validMoves.push(...getCircleNorthCounterClockwise())
//   return validMoves
// }

export const getValidCircleMoves = (args) => {
  console.log('getValidCircleMoves', args)
  const validMoves = []
  const { map, selectedShape } = args
  const center = getAdjacentHex({
    cardinal: 'northEast',
    map,
    xIndex: selectedShape.xIndex,
    yIndex: selectedShape.yIndex,
  })
  console.log('center', center)
  validMoves.push(...getAdjacentHexes({
    ...args,
    center,
    isClockwise: true,
    map,
    start: 'northWest',
    end: 'south'
  }))
  console.log('validMoves', validMoves)
  return validMoves
}

export const getValidShapeMoves = (args) => {
  console.log('getValidShapeMoves', args)
  const validMoves = []
  const { selectedShape } = args
  switch (selectedShape.type) {
    case 'circle':
      validMoves.push(...getValidCircleMoves(args))
      break
    case 'square':
      break
    case 'triangle':
      break
  }
  console.log('validMoves', validMoves)
  return validMoves
}
