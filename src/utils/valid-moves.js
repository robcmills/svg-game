import _ from 'lodash'
import { elementNames } from 'data/constants'

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

export const isValidMove = ({
  blackElements,
  map,
  selectedShape,
  shapes,
  whiteElements,
  xIndex,
  yIndex,
}) => {
  if (!selectedShape) {
    throw new Error('A shape must be selected when calling isValidMove')
  }
  if (selectedShape.xIndex === xIndex && selectedShape.yIndex === yIndex) {
    return false // is selected shape
  }
  const hex = getHex({ map, xIndex, yIndex })
  if (hex.type === 'empty') {
    return false
  }
  const playerElements = selectedShape.color === 'black' ? blackElements : whiteElements
  if (isElementHex({ hex }) &&
    !_.find(playerElements, { type: hex.type })) {
    return false
  }
  const shape = getShape({ shapes, xIndex, yIndex })
  if (shape && shape.color !== selectedShape.color) {
    return isValidConversion({
      converter: selectedShape.type,
      convertee: shape.type,
    })
  }
  return true
}

export const getCircleNorthClockwise = (args) => {
  const validMoves = []
  return validMoves
}

export const getCircleNorthMoves = (args) => {
  const validMoves = []
  const { selectedShape } = args
  const northHex1 = { xIndex: selectedShape.xIndex, yIndex: selectedShape.yIndex - 2 }
  if (isValidMove({
    xIndex: northHex1.xIndex,
    yIndex: northHex1.yIndex,
    ...args
  })) {
    validMoves.push(northHex1)
  } else {
    return validMoves
  }
  validMoves.push(...getCircleNorthClockwise(args))
  // validMoves.push(...getCircleNorthCounterClockwise())
  return validMoves
}

export const getValidCircleMoves = (args) => {
  const validMoves = []
  validMoves.push(...getCircleNorthMoves(args))
  return validMoves
}

export const getValidShapeMoves = (args) => {
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
  return validMoves
}
