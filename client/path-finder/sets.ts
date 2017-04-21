declare const _: any

interface SetI<T> {
  add(item: T): void
  remove?(item: T): void
  contains(item: T): boolean
  forEach(cb: Function)
  toArray(): T[]
}

export class MapSet<T> implements SetI<T> {
  _store: {[key: string]: T} = {}
  constructor(items?: T[]){
    items && items.forEach(this.add.bind(this))
  }
  add(item: T){
    this._store[item.toString()] = item
  }
  remove(item: T){
    delete this._store[item.toString()]
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
}



export class MinHeapSet<T extends {compareTo(b): -1 | 0 | 1}> implements SetI<T> {
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
      this._tracker[lastItem.toString()] = this._sortDown(0)
    }
    else {
      this._flatTree = []
    }
    return firstItem
  }
  add(item: T){
    this._flatTree.push(item)
    this._tracker[item.toString()] = this._sortUp(this._flatTree.length - 1)
  }
  get length(): number{
    return this._flatTree.length
  }
  contains(item: T){
    return _.isNumber(this._tracker[item.toString()])
  }
  getItem(itemKey){
    const itemIndex = this._tracker[itemKey]
    return this._flatTree[itemIndex]
  }
  forEach(cb){
    return this._flatTree.forEach(cb)
  }
  toArray(){
    return _.clone(this._flatTree)
  }
  _sortUp(index: number): number{
    let parentIndex = Math.floor((index - 1) / 2)
    let currentIndex = index
    while(true){
      const parentItem = this._flatTree[parentIndex]
      const currentItem = this._flatTree[currentIndex]
      if(currentIndex == 0)
        return currentIndex
      else if(currentItem.compareTo(parentItem) < 0){
        parentIndex = Math.floor((index - 1) / 2)
        this._swap(index, parentIndex)
        currentIndex = parentIndex
      }
      else {
        return currentIndex
      }
    }
  }
  _swap(aIndex, bIndex){
    const tempA = this._flatTree[aIndex]
    this._flatTree[aIndex] = this._flatTree[bIndex]
    this._flatTree[bIndex] = tempA
  }
  _sortDown(index: number): number{
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
          return currentIndex
      }
      else
        return currentIndex
    }
  }
  _getItem(index: number): T {
    return this._flatTree[index]
  }
}