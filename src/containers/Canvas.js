import React from 'react';
import Canvas from '../components/Canvas'
import socket from '../services/socketService';

export default () => <Canvas socket={socket()} />;
