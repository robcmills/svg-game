import _ from 'lodash'

export const HEX_RADIUS = 20
export const SHAPE_RADIUS = HEX_RADIUS / 2
export const SHAPE_STROKE_WIDTH = HEX_RADIUS / 10
export const SQUARE_DIM = SHAPE_RADIUS * 1.75
export const toRad = (deg) => deg * (Math.PI / 180)
export const COS_60 = Math.cos(toRad(60))
export const SIN_60 = Math.sin(toRad(60))

export const colors = {
  Blue: '#0000FF',
  DarkGray: '#A9A9A9',
  DeepSkyBlue: '#00BFFF',
  DimGray: '#696969',
  empty: 0,
  Green: '#008000',
  LightGray: '#D3D3D3',
  Red: '#FF0000',
  Silver: '#C0C0C0',
  SlateBlue: '#6A5ACD',
}

export const elementColors = {
  air: colors.DeepSkyBlue,
  earth: colors.Green,
  fire: colors.Red,
  stone: colors.DimGray,
  water: colors.Blue,
}

export const elements = _.keys(elementColors)

export const hexColors = {
  empty: 0,
  neutral: colors.Silver,
  neutral2: colors.LightGray,
  neutral3: colors.DarkGray,
}

export const SELECTED_COLOR = colors.SlateBlue
