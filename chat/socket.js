
const NetworkDefine = require('../constant/NetworkDefine');

module.exports = (io) => {

    const chat = io.of('/chat')

    io.on('connection', (socket)=>{
        console.log('/ *new client connect ', socket.id, socket.ip)
    })

    chat.on('connection', (socket) => {
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('/chat *new client connect ',socket.id, socket.ip)

        socket.on(NetworkDefine.CHAT_ROOM_JOIN, (data) => {
            console.log(data);
            socket.join(data.roomId);
        })

        socket.on(NetworkDefine.CHAT_ROOM_LEAVE, (data) => {
            console.log(data);
            socket.leave(data.roomId);
        })

        socket.on(NetworkDefine.SEND_TEXT_MESSAGE, (data => {
    
            console.log(data);
            socket.to(data.roomId).emit(NetworkDefine.RECEIVE_TEXT_MESSAGE, data);
        }))


    });

}