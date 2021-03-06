import { expect } from 'chai';
import {MinHeapSet, ComparableItemI} from '../../../client/path-finder/sets'

class ComparableItem implements ComparableItemI {
  constructor(public x: number){}
  compareTo(b: ComparableItem): -1 | 0 | 1 {
    if(this.x < b.x)
      return -1
    else if(this.x > b.x)
      return 1
    else
      return 0
  }
  toString(): string{
    return Number(this.x).toString()
  }
}

describe('MinHeapSet', () => {
  describe('At instantiation', ()=> {
    it('should let you build a set without passing any arguments and have corresponding length', () => {
      const set = new MinHeapSet()
      expect(set.length).to.equal(0)
    })
    it('should let you build a set from an array and have the corresponding length', () => {
      const comparableNodes = [new ComparableItem(2), new ComparableItem(5)]
      const set = new MinHeapSet(comparableNodes)
      expect(set.length).to.equal(2)
    })
  })
  describe('After instantiation', ()=> {
    describe('.add()', ()=> {
      it('should let you add items to the set', ()=> {
        const set = new MinHeapSet()
        set.add(new ComparableItem(34))
        set.add(new ComparableItem(799))
        expect(set.length).to.equal(2)
      })
    })
    describe('.removeMin()', ()=> {
      it('should return the item with the smallest comparable value and remove it from the set', ()=> {
        const comparableItemsArray = [34, 799, 16, 5, 35, 17, 2, 16].map((x)=> new ComparableItem(x))
        const set = new MinHeapSet<ComparableItem>(comparableItemsArray)
        const smallestComparableItem = set.removeMin()
        expect(smallestComparableItem.x).to.equal(2)
        expect(set.length).to.equal(comparableItemsArray.length - 1)
      })
    })
    describe('.contains()', ()=> {
      it('should return true/false if the comparableItem is found/not found on the set', ()=> {
        const itemToBeFound = new ComparableItem(180)
        const set = new MinHeapSet<ComparableItem>([34, 799, 17, 2, 16].map((x)=> new ComparableItem(x)))
        set.add(itemToBeFound)
        expect(set.contains(itemToBeFound)).to.be.true
        expect(set.contains(new ComparableItem(199))).to.be.false
      })
    })
    describe('.getItemByKey()', ()=> {
      it('should return the item as long as the key matches the stringified version of the item in the set', ()=> {
        const itemToBeFound = new ComparableItem(180)
        const set = new MinHeapSet<ComparableItem>([34, 799, 17, 2, 16].map((x)=> new ComparableItem(x)))
        set.add(itemToBeFound)
        const foundItem = set.getItemByKey(itemToBeFound.toString())
        expect(foundItem.x).to.equal(itemToBeFound.x)
      })
    })
  })
})