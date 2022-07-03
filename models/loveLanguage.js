import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const loveLanguage = new Schema({
    type: {
        enum: ['GIVING', 'RECIEVING']
    },
    words: {
        type: Number,
        required: true
    },
    acts: {
        type: Number,
        required: true
    },
    gifts: {
        type: Number,
        required: true
    },
    touch: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

mongoose.models = {};

const LoveLanguage = mongoose.model('LoveLanguage', loveLanguage);

export default LoveLanguage;