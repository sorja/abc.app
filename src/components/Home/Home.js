import React from 'react'
import { Link } from "react-router-dom";

import './Home.css';

export default () => <div>
    <header className="App-header">
        <h1 className="App-title">Welcome to React</h1>
    </header>
    <h1> Lolee </h1>
    <Content />
</div>

const Content = () => <div><a>Host</a> or <a>Join</a></div>
