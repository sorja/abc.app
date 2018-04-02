const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Drawing history to load when new client connects.
const history = []
// New connections
const onConnection = socket => {
  // Not sure which is better, dump all at once, or one by one, hmm
  history.forEach( value => socket.emit('drawing', value))
  
  // Wait for event 'drawing'
  socket.on('drawing', 
  data => {
    socket.on('drawing', (data) => {
      socket.broadcast.emit('drawing', data)
      history.push(data)
    });
  })
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
