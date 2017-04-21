import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Map} from './map.component'
import {TilesPicker} from './tiles-picker.component'
import {Character} from './character.component'

interface props {}
interface state {}

class Game extends React.Component<props, state> {
  mapConfig = {
    tilesQ: 10,
    tileW: 78,
    tileH: 39,
    width: window.innerWidth,
    height: window.innerHeight,
  }
  render(){
    return (
      <div>
        <Map {...this.mapConfig}></Map>
        <TilesPicker {...this.mapConfig}></TilesPicker>
        <Character {...this.mapConfig}></Character>
      </div>
    )
  }
}

ReactDOM.render(
  <Game></Game>,
  document.getElementById('root')
)