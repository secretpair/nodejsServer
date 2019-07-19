
const SocketIO = require('socket.io');

module.exports = (server) => {

    const io = SocketIO(server, { path: '/' })

    const chat = io.of('/chat')


    chat.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('new client connect', ip, socket.id, req.ip)


        socket.on('join', (data) => {
            socket.join(data.roomId)
        })

        socket.on('leave',(data) => {
            socket.leave(data.roomId)
        })

    
    });

}