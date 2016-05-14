import hexes from './hexes'
import shapes from './shapes'
import { getValidSquareMoves } from 'utils/valid-moves'

const validMoves = getValidSquareMoves({
  hexes: hexes.hexes,
  selectedShape: shapes[0],
  shapes,
})

export default validMoves
