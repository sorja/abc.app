import React, { Component } from 'react';
import ColorBar from "../ColorBar";
import Word from "../Word";
import Guesses from "../Guesses";
import Canvas from "../../containers/Canvas"
export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'black'
        }
    }

    onColorUpdate = (e) => {
        this.setState({
            color: e.target.className.split(' ')[1]
        })
    }

    render() {
        return <div className="game-container">
            <Canvas color={this.state.color} />
            <ColorBar onColorUpdate={this.onColorUpdate} />
            <Word />
            <Guesses />
        </div>
    }
}
