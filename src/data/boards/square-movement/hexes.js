import _ from 'lodash'

import { elementColors, hexColors } from 'data/constants'
import { HEX_RADIUS } from 'data/constants'

const colors = _.merge(elementColors, hexColors)

export const hexTypes = [
  ['empty', 'neutral3'],
  ['neutral1', 'neutral1'],
  ['neutral2', 'neutral2', 'neutral2'],
  ['neutral3', 'neutral3'],
  ['neutral1', 'neutral1', 'neutral1'],
  ['neutral2', 'neutral2'],
  ['neutral3', 'neutral3', 'neutral3'],
  ['neutral1', 'neutral1'],
  ['empty', 'neutral2'],
]

const hexes = {
  offset: HEX_RADIUS,
  height: HEX_RADIUS * 10,
  hexes: _.map(hexTypes, (row, y) => (
    _.map(row, (type, x) => _.assign({}, {
      color: colors[type],
      type,
      xIndex: x,
      yIndex: y,
    }))
  )),
  width: HEX_RADIUS * 8,
}

export default hexes
