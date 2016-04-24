import _ from 'lodash'

export const HEX_RADIUS = 20
export const SHAPE_RADIUS = HEX_RADIUS / 2
export const SHAPE_STROKE_WIDTH = HEX_RADIUS / 10
export const SQUARE_DIM = SHAPE_RADIUS * 1.75
export const STROKE_WIDTH = 2

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
  Gray: '#808080',
  Gray10: '#1A1A1A',
  Gray15: '#262626',
  Gray20: '#333333',
  Gray25: '#404040',
  Gray30: '#4D4D4D',
  LightGray: '#D3D3D3',
  Orange: '#FFA500',
  Red: '#FF0000',
  Silver: '#C0C0C0',
  SlateBlue: '#6A5ACD',
  Transparent: 'transparent',
}

export const elementColors = {
  air: colors.DeepSkyBlue,
  earth: colors.Green,
  fire: colors.Red,
  stone: colors.DimGray,
  water: colors.Blue,
}

export const elementNames = _.keys(elementColors)

export const hexColors = {
  empty: colors.Transparent,
  neutral: colors.Silver,
  neutral2: colors.LightGray,
  neutral3: colors.DarkGray,
  // neutral: colors.Gray15,
  // neutral2: colors.Gray20,
  // neutral3: colors.Gray25,
}

export const SELECTED_COLOR = colors.Orange

export const HEX_CARDINALS_CLOCKWISE = [
  'north',
  'northEast',
  'southEast',
  'south',
  'southWest',
  'northWest',
]

export const HEX_CARDINALS_COUNTER_CLOCKWISE = _.reverse(_.slice(HEX_CARDINALS_CLOCKWISE))
