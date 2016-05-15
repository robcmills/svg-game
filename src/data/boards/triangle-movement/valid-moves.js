import hexes from './hexes'
import shapes from './shapes'
import { getValidTriangleMoves } from 'utils/valid-moves'

const validMoves = getValidTriangleMoves({
  hexes: hexes.hexes,
  selectedShape: shapes[0],
  shapes,
})

export default validMoves
