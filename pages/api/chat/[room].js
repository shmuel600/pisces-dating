import { Server } from 'Socket.IO';
import connectDB from '../../../middleware/mongodb';

const SocketHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    }
    else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io

        io.on('connection', socket => {
            // const { room } = req.query;
            socket.on('join', newRoom => {
                socket.join(newRoom)
                socket.emit('joined', newRoom)
                socket.on('change', msg => {
                    socket.to(newRoom).emit('update', msg)
                })
            })
        })
    }
    res.end();
}

export default connectDB(SocketHandler);