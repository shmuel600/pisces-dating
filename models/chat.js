import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chat = new Schema({
    messages: {
        type: Array,
    },
});

mongoose.models = {};

const Chat = mongoose.model('Chat', chat);

export default Chat;