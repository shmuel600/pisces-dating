import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chat = new Schema({
    _id: {
        type: String,
        required: true,
    },
    messages: {
        type: Array,
    },
});

mongoose.models = {};

const Chat = mongoose.model('Chat', chat);

export default Chat;