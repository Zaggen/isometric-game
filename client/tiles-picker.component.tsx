import * as React from 'react'
import {pathFinder} from './path-finder/index'
import * as _ from 'lodash'

interface I_props {
  tileW: number
  tileH: number
  width: number
  height: number
  tilesQ: number
}
interface I_state {
}

export class TilesPicker extends React.Component<I_props, I_state> {
  props: any
  ctx: CanvasRenderingContext2D
  currentTile: [number, number] = [0, 0]

  render() {
    return (
      <canvas id="tiles-picker" onClick={this.handleClick.bind(this)}></canvas>
    )
  }

  componentDidMount() {
    // Set Canvas
    const canvas = document.getElementById('tiles-picker') as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    canvas.width = this.props.width
    canvas.height = this.props.height
    this.ctx.translate(this.props.width / 2, 200)
  }

  handleClick(e) {
    // First we normalize x,y
    const screenX = e.clientX - (this.props.width / 2) - 6 // There is an 8 px issue with our tile
    const screenY = e.clientY - 200 - 13 // there is a 5px issue with out tile
    console.log('x', screenX)
    console.log('y', screenX)
    const [tileX, tileY] = this.posInGrid(screenX, screenY)
    console.log('tileX', tileX)
    console.log('tileY', tileY)
    if (this.checkIfValidPosition(tileX, tileY)) {
      this.draw(tileX, tileY, 'rgba(255, 0, 0, 0.5)')
    }
    else {
      console.log('invalid position')
    }
    debugger
    const fakeMap = _.times(this.props.tilesQ, ()=> _.times(this.props.tilesQ))
    let i = 0
    pathFinder(fakeMap, this.currentTile ,[tileX, tileY], (openSet, closedSet, path)=> {
      const clonedOpenSet = openSet && openSet.toArray()
      const clonedClosedSet = closedSet && closedSet.toArray()
      const delay = 1500 * i
      // console.log('setting timeout to fire on '+ delay + ' milliseconds')
      _.defer(()=>{
        // console.log('timeout fired at ' + (new Date()).getMilliseconds())
        this.ctx.clearRect(-this.props.width/ 2, 0, this.props.width, this.props.height)
        clonedOpenSet.forEach((pathFindingNode)=>{
          const [x, y] = pathFindingNode.val
          this.drawTile(x, y, 'green')
        })
        clonedClosedSet.forEach((pathFindingNode)=>{
          const [x, y] = pathFindingNode.val
          this.drawTile(x, y, 'blue')
        })
        path && path.forEach((tile)=>{
          const [x, y] = tile
          this.drawTile(x, y, 'red')
        })
      }, delay)
      i = i + 1
  })
    this.currentTile = [tileX, tileY]
  }

  checkIfValidPosition(tileX, tileY) {
    const {tilesQ} = this.props
    return (tileX >= 0 && tileX < tilesQ) && (tileY >= 0 && tileY < tilesQ)
  }

  draw(tileX, tileY, color) {
    const {width, height} = this.props
    this.ctx.clearRect(-width / 2, 0, width, height)
    this.drawTile(tileX, tileY, color)
  }

  drawTile(x, y, color) {
    // console.log('x', x)
    // console.log('y', y)
    const {ctx} = this
    const {tileW, tileH} = this.props
    ctx.save()
    ctx.translate((x - y) * (tileW / 2), (y + x) * (tileH / 2))

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(tileW / 2, tileH / 2)  // -> \
    ctx.lineTo(0, tileH)              // -> /
    ctx.lineTo(-tileW / 2, tileH / 2) // -> \
    ctx.closePath()                   // -> /
    ctx.fillStyle = color
    ctx.fill()

    ctx.restore()
  }

  posInGrid(screenX, screenY) {
    const TILE_WIDTH_HALF = this.props.tileW / 2
    const TILE_HEIGHT_HALF = this.props.tileH / 2
    const tileXIndex = Math.floor((screenX / TILE_WIDTH_HALF + screenY / TILE_HEIGHT_HALF) / 2)
    const tileYIndex = Math.floor((screenY / TILE_HEIGHT_HALF - (screenX / TILE_WIDTH_HALF)) / 2)
    return [tileXIndex, tileYIndex]
  }
}