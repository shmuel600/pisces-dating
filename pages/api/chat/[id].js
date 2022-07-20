import { Server } from 'Socket.IO';
import connectDB from '../../../middleware/mongodb';
import Chat from '../../../models/chat';

const SocketHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running');
    } else {
        console.log('Socket is initializing');
        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', socket => {
            socket.on('input-change', msg => {
                console.log("ELAD-SERVER", msg);
                socket.broadcast.emit('update-input', msg);
            });
        });
    }

    const { id } = req.query;

    if (req.method === 'GET') {
        console.log("GET chat history");
        try {
            const history = await Chat.findById(id);
            console.log(history);
            return res.status(200).send(history);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
    else if (req.method === 'PATCH') {
        try {
            console.log("PATCH chat history");
            console.log("to update: ", req.body);
            const history = await Chat.findByIdAndUpdate(id, req.body);
            console.log("chat history: ", history);
            return res.status(200).send(history);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
    else if (req.method === 'DELETE') {
        try {
            console.log("DELETE chat");
            const chat = await Chat.findByIdAndDelete(id);
            return res.status(200).send(chat);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }

    res.end();
}

export default connectDB(SocketHandler);