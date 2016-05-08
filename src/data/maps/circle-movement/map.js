import _ from 'lodash'

import { elementColors, hexColors } from 'data/constants'
import { HEX_RADIUS } from 'data/constants'

const colors = _.merge(elementColors, hexColors)

export const mapHexTypes = [
  ['empty'],
  ['neutral1'],
  ['neutral2', 'neutral2'],
  ['neutral3'],
  ['neutral1', 'neutral1'],
  ['neutral2'],
]

export default {
  offset: HEX_RADIUS,
  height: HEX_RADIUS * 7,
  hexes: _.map(mapHexTypes, (row, y) => (
    _.map(row, (type, x) => _.assign({}, {
      color: colors[type],
      type,
      xIndex: x,
      yIndex: y,
    }))
  )),
  width: HEX_RADIUS * 5,
}
