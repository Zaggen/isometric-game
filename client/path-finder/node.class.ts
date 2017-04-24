export class PathFindingNode {
  val: any // The actual value of the node
  g: number // distanceFromStart
  h: number // heuristic
  get f(): number {
    return this.g + this.h
  }
  constructor(val: any, g: number, h: number, previousNode?: PathFindingNode){
    this.val = val
    this.g = g
    this.h = h
    this.previousNode = previousNode
  }
  previousNode: PathFindingNode
  compareTo(b: PathFindingNode): -1 | 0 | 1 {
    if(this.f < b.f)
      return -1
    else if(this.f > b.f)
      return 1
    else if(this.h < b.h)
      return -1
    else
      return 0
  }
  toString(): string {
    return String(this.val)
  }
}