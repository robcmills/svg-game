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

export const getOppositeCardinal = ({ cardinal }) => {
  switch (cardinal) {
    case 'north':
      return 'south'
    case 'northEast':
      return 'southWest'
    case 'southEast':
      return 'northWest'
    case 'south':
      return 'north'
    case 'southWest':
      return 'northEast'
    case 'northWest':
      return 'southEast'
  }
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
    return false
  }
  const { shapes } = args
  const shape = getShape({ shapes, xIndex, yIndex })
  if (shape && shape.color === selectedShape.color) {
    return false
  }
  if (shape && shape.color !== selectedShape.color) {
    return isValidConversion({
      converter: selectedShape.type,
      convertee: shape.type,
    })
  }
  return true
}

export const getCardinalRange = ({ isClockwise, start, end }) => {
  const range = []
  const cardinals = isClockwise ? HEX_CARDINALS_CLOCKWISE : HEX_CARDINALS_COUNTER_CLOCKWISE
  const startIndex = _.indexOf(cardinals, start)
  range.push(..._.slice(cardinals, startIndex))
  range.push(..._.slice(cardinals, 0, startIndex))
  if (end) {
    const endIndex = _.indexOf(range, end) + 1
    return _.slice(range, 0, endIndex)
  }
  return _.slice(range, 0, range.length - 1)
}

export const getAdjacentHex = ({ cardinal, map, xIndex, yIndex }) => {
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

export const getAdjacentHexes = (args) => {
  const {
    allowInvalid,
    blackElements,
    center,
    end,
    isClockwise,
    map,
    selectedShape,
    shapes,
    start,
    whiteElements
  } = args
  const hexes = []
  const cardinalRange = getCardinalRange({ isClockwise, start, end })
  _.forEach(cardinalRange, (cardinal) => {
    const nextHex = getAdjacentHex({
      cardinal, map, xIndex: center.xIndex, yIndex: center.yIndex,
    })
    if (!nextHex) {
      return allowInvalid
    }
    if (allowInvalid || isValidMove({
      selectedShape,
      xIndex: nextHex.xIndex,
      yIndex: nextHex.yIndex,
      hex: nextHex,
      blackElements,
      whiteElements,
      shapes,
    })) {
      hexes.push(_.assign({}, nextHex, { cardinal }))
    } else {
      return false
    }
  })
  return hexes
}

export const getValidCircleMoves = (args) => {
  const validMoves = []
  const { selectedShape } = args
  const adjacentHexes = getAdjacentHexes({
    ...args,
    allowInvalid: true,
    center: selectedShape,
    isClockwise: true,
    start: 'north',
    end: 'northWest'
  })
  _.forEach(adjacentHexes, (adjacentHex) => {
    const sharedArgs = {
      ...args,
      allowInvalid: false,
      center: adjacentHex,
    }
    const oppositeCardinal = getOppositeCardinal({
      cardinal: adjacentHex.cardinal
    })
    const clockwiseCardinalRange = getCardinalRange({
      isClockwise: true, start: oppositeCardinal
    })
    const counterClockwiseCardinalRange = getCardinalRange({
      isClockwise: false, start: oppositeCardinal
    })
    const clockwiseHexes = getAdjacentHexes({
      ...sharedArgs,
      isClockwise: true,
      start: clockwiseCardinalRange[1],
    })
    _.forEach(clockwiseHexes, (hex) => {
      if (!_.find(validMoves, { xIndex: hex.xIndex, yIndex: hex.yIndex })) {
        validMoves.push(hex)
      }
    })
    const counterClockwiseHexes = getAdjacentHexes({
      ...sharedArgs,
      isClockwise: false,
      start: counterClockwiseCardinalRange[1],
    })
    _.forEach(counterClockwiseHexes, (hex) => {
      if (!_.find(validMoves, { xIndex: hex.xIndex, yIndex: hex.yIndex })) {
        validMoves.push(hex)
      }
    })
  })
  return validMoves
}

export const getCardinalHexes = ({
  blackElements,
  cardinal,
  map,
  selectedShape,
  shapes,
  whiteElements,
}) => {
  const validMoves = []
  let nextHex = getAdjacentHex({
    cardinal, map, xIndex: selectedShape.xIndex, yIndex: selectedShape.yIndex,
  })
  while (nextHex && isValidMove({
    selectedShape,
    xIndex: nextHex.xIndex,
    yIndex: nextHex.yIndex,
    hex: nextHex,
    blackElements,
    whiteElements,
    shapes,
  })) {
    validMoves.push(nextHex)
    nextHex = getAdjacentHex({
      cardinal, map, xIndex: nextHex.xIndex, yIndex: nextHex.yIndex,
    })
  }
  return validMoves
}

export const getValidSquareMoves = (args) => {
  const validMoves = []
  const { selectedShape } = args
  _.forEach(HEX_CARDINALS_CLOCKWISE, (cardinal) => {
    validMoves.push(...getCardinalHexes({
      ...args,
      cardinal,
      xIndex: selectedShape.xIndex,
      yIndex: selectedShape.yIndex,
    }))
  })
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
      validMoves.push(...getValidSquareMoves(args))
      break
    case 'triangle':
      break
  }
  return validMoves
}
