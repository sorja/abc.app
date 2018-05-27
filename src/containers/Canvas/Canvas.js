import React from 'react';
import Canvas from "../../components/Canvas"
import socket from "../../services/socketService"

export default props => <Canvas {...props} socket={socket()} />;
