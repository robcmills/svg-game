import _ from 'lodash'
import { elementColors, hexColors } from 'data/constants'

import { HEX_RADIUS } from 'data/constants'
const colors = _.merge(elementColors, hexColors)

export const hexTypes = [
  ['empty'],
  ['empty', 'empty', 'neutral'],
  ['empty', 'empty', 'neutral2', 'neutral2'],
  ['empty', 'earth', 'neutral3', 'water'],
  ['empty', 'neutral', 'neutral', 'neutral', 'neutral'],
  ['neutral2', 'neutral2', 'neutral2', 'neutral2', 'neutral2'],
  ['neutral3', 'earth', 'neutral3', 'neutral3', 'water', 'neutral3'],
  ['neutral', 'neutral', 'neutral', 'neutral', 'neutral'],
  ['neutral2', 'neutral2', 'neutral2', 'neutral2', 'neutral2', 'neutral2'],
  ['neutral3', 'neutral3', 'neutral3', 'neutral3', 'neutral3'],
  ['water', 'neutral', 'water', 'neutral', 'neutral', 'earth'],
  ['neutral2', 'fire', 'empty', 'earth', 'neutral2'],
  ['air', 'neutral3', 'neutral3', 'air', 'neutral3', 'fire'],
  ['neutral', 'neutral', 'neutral', 'neutral', 'neutral'],
  ['neutral2', 'neutral2', 'neutral2', 'neutral2', 'neutral2', 'neutral2'],
  ['neutral3', 'neutral3', 'neutral3', 'neutral3', 'neutral3'],
  ['neutral', 'fire', 'neutral', 'neutral', 'air', 'neutral'],
  ['neutral2', 'neutral2', 'neutral2', 'neutral2', 'neutral2'],
  ['empty', 'neutral3', 'neutral3', 'neutral3', 'neutral3'],
  ['empty', 'fire', 'neutral', 'air'],
  ['empty', 'empty', 'neutral2', 'neutral2'],
  ['empty', 'empty', 'neutral3'],
]

const hexes = {
  offset: HEX_RADIUS * 2,
  height: HEX_RADIUS * 23,
  hexes: _.map(hexTypes, (row, y) => (
    _.map(row, (type, x) => _.assign({}, {
      color: colors[type],
      type,
      xIndex: x,
      yIndex: y,
    }))
  )),
  width: HEX_RADIUS * 19,
}

export default hexes
