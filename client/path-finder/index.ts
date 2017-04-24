import * as _ from 'lodash'
import {MapSet, MinHeapSet} from './sets'
import {PathFindingNode} from './node.class'

export type Tile = [number, number]
// TODO: Get rowsQ and colsQ from the passed tileMap
//const rowsQ = 10
//const colsQ = 10

// TODO: Implement obstacles with a second layer of tiles
// TODO: Fix issues with some paths
export function pathFinder(tileMap: any[][], startTile: Tile, endTile: Tile, callback?){
  const closedSet = new MapSet<PathFindingNode>()
  const openSet = new MinHeapSet<PathFindingNode>()
  const rowsQ = tileMap.length
  const colsQ = tileMap[0].length
  const NEXT_TILE_MOVEMENT_COST = 1
  // const startTileK = JSON.stringify(startTile)
  openSet.add(new PathFindingNode(startTile, 0, getHeuristicDistance(startTile, endTile)))
  while(openSet.length > 0){
    const currentNode = openSet.removeMin()
    callback && callback(openSet, closedSet, reconstructPath(currentNode))
    closedSet.add(currentNode)
    if(currentNode.val[0] == endTile[0] && currentNode.val[1] == endTile[1]){
      return reconstructPath(currentNode)
    }

    const neighborTiles = getTileNeighbors(currentNode.val, rowsQ, colsQ)
    neighborTiles.forEach((tile: Tile)=> {
      if(!closedSet.contains(<any>tile)){
        const tempG = currentNode.g + NEXT_TILE_MOVEMENT_COST
        if(openSet.contains(<any>tile)){
          const neighborNode = <PathFindingNode>openSet.getItemByKey(tile.toString())
          if(tempG < neighborNode.g){
            neighborNode.g = tempG
            neighborNode.previousNode = currentNode
          }
        }
        else {
          openSet.add(new PathFindingNode(tile, tempG, getHeuristicDistance(tile, endTile), currentNode))
        }
      }
    })
  }
}

function reconstructPath(node: PathFindingNode){
  const invertedPath = [node.val]
  while(node.previousNode){
    invertedPath.push(node.previousNode.val)
    node = node.previousNode
  }
  return invertedPath.reverse()
}

function getHeuristicDistance(a: Tile, b: Tile){
  const horizontalDistance = Math.abs(a[0] - b[0])
  const verticalDistance = Math.abs(a[1] - b[1])
  return horizontalDistance + verticalDistance
}

function getTileNeighbors(tile: Tile, rowsQ: number, colsQ: number): Tile[]{
  const [row, col] = tile
  const up    = (row - 1 >= 0) ? [row - 1, col] : null
  const left  = (col - 1 >= 0) ? [row, col - 1] : null
  const down  = (row + 1 < rowsQ) ? [row + 1, col] : null
  const right = (col + 1 < colsQ) ? [row, col + 1] : null
  return <Tile[]>_.compact([up, left, down, right])
}
