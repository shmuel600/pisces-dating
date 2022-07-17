import mongoose from 'mongoose';
import User from './user';
const Schema = mongoose.Schema;

const chat = new Schema({
    _id: {
        type: String,
        required: true
    },
    user1: {
        type: User,
        required: true
    },
    user2: {
        type: User,
        required: true
    },
    messages: {
        type: Array,
    },
});

mongoose.models = {};

const Chat = mongoose.model('Chat', chat);

export default Chat;