import { expect } from 'chai'
import * as _ from 'lodash'
import {pathFinder, Tile} from '../../../client/path-finder/index'

describe('pathFinder', () => {
  describe('small map 6*6', ()=> {
    it('should return an array with the shortest path between to tiles', () => {
      // We generate the map manually for illustrative purposes
      // This is a 6 * 6 tile map
      const map: Tile[][] = [
        [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0]],
        [[0, 1], [1, 1], [2, 1], [3, 1], [4, 1], [5, 1]],
        [[0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2]],
        [[0, 3], [1, 3], [2, 3], [3, 3], [4, 3], [5, 3]],
        [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4], [5, 4]],
        [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5]]
      ];
      // [0, 0] to [5, 5]
      (() => {
        const startTile: Tile = [0, 0]
        const endTile: Tile = [5, 5]
        const path = pathFinder(map, startTile, endTile)
        expect(path[0]).to.eql(startTile)
        expect(path[path.length - 1]).to.eql(endTile)
        expect(path.length).to.equal(11) // In this case the number corresponds to (tilesQ * 2) - 1
      })();
      // [0, 0] to [0, 5]
      (() => {
        const startTile: Tile = [0, 0]
        const endTile: Tile = [0, 5]
        const path = pathFinder(map, startTile, endTile)
        expect(path[0]).to.eql(startTile)
        expect(path[path.length - 1]).to.eql(endTile)
        expect(path.length).to.equal(6)
      })();
    });
  })

  describe('big map 10*10', ()=> {
    it('should return an array with the shortest path between to tiles', () => {
      const tilesQ = 10
      const map: any[][] =  _.times(tilesQ, ()=> _.times(tilesQ));
      // [0, 0] to [9, 9]
      (() => {
        const startTile: Tile = [0, 0]
        const endTile: Tile = [9, 9]
        const path = pathFinder(map, startTile, endTile)
        expect(path[0]).to.eql(startTile)
        expect(path[path.length - 1]).to.eql(endTile)
        console.log(path)
        expect(path.length).to.equal((tilesQ * 2) - 1)
      })();
      // [0, 0] to [5, 5]
      (() => {
        const startTile: Tile = [0, 0]
        const endTile: Tile = [5, 5]
        const path = pathFinder(map, startTile, endTile)
        expect(path[0]).to.eql(startTile)
        expect(path[path.length - 1]).to.eql(endTile)
        console.log(path)
        expect(path.length).to.equal(11)
      })();
      // [0, 0] to [0, 9]
      (() => {
        const startTile: Tile = [0, 0]
        const endTile: Tile = [0, 9]
        const path = pathFinder(map, startTile, endTile)
        expect(path[0]).to.eql(startTile)
        expect(path[path.length - 1]).to.eql(endTile)
        console.log(path)
        expect(path.length).to.equal(tilesQ)
      })();
    });
  })
})