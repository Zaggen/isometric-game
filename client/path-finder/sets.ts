import * as _ from 'lodash'

interface SetI<T> {
  add(item: T): void
  remove?(item: T): void
  contains(item: T): boolean
  forEach(cb: Function)
  toArray(): T[]
  length: number
}

export class MapSet<T> implements SetI<T> {
  _store: {[key: string]: T} = {}
  _length = 0
  constructor(items?: T[]){
    items && items.forEach(this.add.bind(this))
  }
  add(item: T){
    this._store[item.toString()] = item
    this._length++
  }
  remove(item: T){
    delete this._store[item.toString()]
    this._length--
  }
  contains(item: T): boolean{
    return Boolean(this._store[item.toString()])
  }
  forEach(cb){
    _.each(_.keys(this._store), (key)=> {
      cb(this._store[key])
    })
  }
  toArray(){
    const arr = []
    this.forEach((item: T)=>
      arr.push(item)
    )
    return arr
  }
  get length(){
    return this._length
  }
}

export interface ComparableItemI {
  [key: string]: any
  compareTo(b): -1 | 0 | 1
  toString(): string
}

export class MinHeapSet<T extends ComparableItemI> implements SetI<T> {
  _flatTree: T[] = []
  _tracker: {[key: string]: number} = {}
  constructor(items?: T[]){
    items && items.forEach(this.add.bind(this))
  }
  removeMin(): T {
    // TODO: Simplify or refactor
    const firstItem = this._flatTree[0]
    delete this._tracker[firstItem.toString()]
    if(this._flatTree.length > 1){
      const lastItem = this._flatTree.pop()
      this._flatTree[0] = lastItem
      this._tracker[lastItem.toString()] = 0
      this._sortDown(0)
    }
    else {
      this._flatTree = []
      this._tracker = {}
    }
    return firstItem
  }
  add(item: T){
    this._flatTree.push(item)
    this._tracker[item.toString()] = this._flatTree.length - 1
    this._sortUp(this._flatTree.length - 1)
  }
  get length(): number{
    return this._flatTree.length
  }
  contains(item: T){
    return _.isNumber(this._tracker[item.toString()])
  }
  getItemByKey(itemKey: string){
    const itemIndex = this._tracker[itemKey]
    return this._flatTree[itemIndex]
  }
  forEach(cb){
    return this._flatTree.forEach(cb)
  }
  toArray(){
    return _.clone(this._flatTree)
  }
  _sortUp(index: number): void {
    let currentIndex = index
    while(true){
      const parentIndex = Math.floor((currentIndex - 1) / 2)
      const parentItem = this._flatTree[parentIndex]
      const currentItem = this._flatTree[currentIndex]
      if(currentIndex == 0)
        return
      else if(currentItem.compareTo(parentItem) < 0){
        this._swap(currentIndex, parentIndex)
        currentIndex = parentIndex
      }
      else {
        return
      }
    }
  }
  _swap(aIndex, bIndex){
    const tempA = this._flatTree[aIndex]
    this._flatTree[aIndex] = this._flatTree[bIndex]
    this._flatTree[bIndex] = tempA
    this._swapTrackerInfo(aIndex, bIndex)
  }
  _swapTrackerInfo(aIndex, bIndex){
    const aItem = this._flatTree[aIndex]
    const bItem = this._flatTree[aIndex]
    this._tracker[aItem.toString()] = bIndex
    this._tracker[bItem.toString()] = aIndex
  }
  _sortDown(index: number): void{
    let currentIndex = index
    while(true){
      const childIndexLeft = (currentIndex * 2) + 1
      const childIndexRight = (currentIndex * 2) + 2
      let smallestChildIndex
      if(childIndexLeft < this._flatTree.length){
        // First we determine which of the child nodes is smaller
        smallestChildIndex = childIndexLeft
        if(childIndexRight < this._flatTree.length){
          if(this._flatTree[childIndexLeft].compareTo(this._flatTree[childIndexRight]) < 0){
            smallestChildIndex = childIndexRight
          }
        }
        // Then We swap parent for child if the parent is smaller
        if(this._getItem(currentIndex).compareTo(this._getItem(smallestChildIndex))){
          this._swap(currentIndex, smallestChildIndex)
          currentIndex = smallestChildIndex
        }
        // Else the node is in the right position so we leave it there
        else
          return
      }
      else
        return
    }
  }
  _getItem(index: number): T {
    return this._flatTree[index]
  }
}