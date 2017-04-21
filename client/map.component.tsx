import * as React from 'react'
import * as _ from 'lodash'

interface I_props {
  tileW: number
  tileH: number
  width: number
  height: number
  tilesQ: number
}
interface state {}

export class Map extends React.Component<I_props, state> {
  props: any
  ctx: CanvasRenderingContext2D
  tileImg: HTMLImageElement

  render() {
    return (
      <canvas id="map"></canvas>
    )
  }
  componentDidMount() {
    // Set Canvas
    const canvas = document.getElementById('map') as HTMLCanvasElement
    this.ctx = canvas.getContext('2d')
    canvas.width = this.props.width
    canvas.height = this.props.height
    this.ctx.translate(this.props.width / 2, 200)
    // Set Image
    this.tileImg = document.createElement('img')
    this.tileImg.addEventListener('load', this.draw.bind(this))
    this.tileImg.src = './images/tiles/test.png'
  }
  draw() {
    const {tilesQ} = this.props
    _.times(tilesQ, (x) => {
      _.times(tilesQ, (y) => {
        const tileIndex = Math.floor(Math.random() * 16)
        this.drawImageTile(x, y, tileIndex)
      })
    })
  }
  drawImageTile(x, y, index) {
    const {tileW, tileH} = this.props
    const {ctx} = this
    ctx.save()
    ctx.translate((x - y) * (tileW / 2), (y + x) * (tileH / 2))
    ctx.drawImage(
      this.tileImg,
      index * tileW + (index * 2), // The tiles are separated by 2 pixels, we should fix on the image, but for now we add the * 2 hack
      0,
      tileW,
      this.tileImg.height,
      -tileW / 2, // x
      0, // y
      tileW, // width
      this.tileImg.height // height
    )
    ctx.restore()
  }
}