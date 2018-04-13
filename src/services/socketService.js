import io from 'socket.io-client';

export default () => {
  const socket = io()
  return {
    socket,
    registerHandler: (cb) => {
      socket.on('drawing', cb)
    },
    unregisterHandler: () => {
      socket.off('drawing')
      socket.on('error', function (err) {
        console.log('received socket error:')
        console.log(err)
      });
    }
  }

}