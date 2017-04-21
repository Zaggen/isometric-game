import * as React from 'react'
import * as _ from 'lodash'

interface I_props {
  tileW: number
  tileH: number
  width: number
  height: number
}
interface I_state {
}

export class Character extends React.Component<I_props, I_state> {
  props: any
  ctx: CanvasRenderingContext2D

  styles = {
    display: 'block',
    backgroundImage: 'url(./images/sprites/lord-knight-male-sprite.gif)',
    height: '78px',
    width: '40px',
    position: 'absolute',
    top: `${200 - 78 + this.props.tileH}px`,
    left: `${(window.innerWidth / 2) - (40 / 2)}px`,
  }

  headStyles = {
    display: 'block',
    backgroundImage: 'url(./images/sprites/heads-male-sprite.png)',
    height: '40px',
    width: '50px',
    position: 'absolute',
    top: '-30px',
    left: '50%',
    transform: 'translateX(-50%)'
  }

  state = {
    position: {
      x: 0,
      y: 0
    }
  }

  render() {
    const {x, y} = this.state.position
    const position = {transform: `translate(${x}px, ${y}px)`}
    debugger
    return (
      <div style={_.extend({}, this.styles, position)}>
        <div style={this.headStyles}></div>
      </div>
    )
  }

  componentDidMount() {
    document.onkeydown = this.dPadHandler.bind(this)
  }

  dPadHandler(e){
    if (e.keyCode == '38') {
      // up arrow
      this.moveCharacter('UP')
    }
    else if (e.keyCode == '40') {
      // down arrow
      this.moveCharacter('DOWN')
    }
    else if (e.keyCode == '37') {
      // left arrow
      this.moveCharacter('LEFT')
    }
    else if (e.keyCode == '39') {
      // right arrow
      this.moveCharacter('RIGHT')
    }
  }

  moveCharacter(direction: 'UP' | 'RIGHT' | 'DOWN' | 'LEFT'){
    const TILE_WIDTH_HALF = this.props.tileW / 2
    const TILE_HEIGHT_HALF = this.props.tileH / 2
    const {x, y} = this.state.position
    switch(direction){
      case 'UP':
        this.setState({position: {
          x: x + TILE_WIDTH_HALF,
          y: y - TILE_HEIGHT_HALF
        }})
        break
      case 'DOWN':
        this.setState({position: {
          x: x - TILE_WIDTH_HALF,
          y: y + TILE_HEIGHT_HALF
        }})
        break
      case 'LEFT':
        this.setState({position: {
          x: x - TILE_WIDTH_HALF,
          y: y - TILE_HEIGHT_HALF
        }})
        break
      case 'RIGHT':
        this.setState({position: {
          x: x + TILE_WIDTH_HALF,
          y: y  + TILE_HEIGHT_HALF
        }})
        break
    }
  }

}