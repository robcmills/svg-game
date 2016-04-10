import { HEX_RADIUS, SIN_60 } from 'data/constants'

export const xIndexToX = ({ xIndex, isEvenRow }) => {
  return HEX_RADIUS * 3 * xIndex + (isEvenRow ? 0 : HEX_RADIUS * 1.5)
}

export const yIndexToY = ({ yIndex }) => {
  return SIN_60 * HEX_RADIUS * yIndex
}
