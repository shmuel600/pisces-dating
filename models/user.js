import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    since: {
        type: Date,
        default: Date.now
    },
    bio: {
        type: String
    },
    personalityType: {
        type: String,
        required: true
    },
    loveLanguage: {
        giving: {
            type: Object,
            required: true
        },
        recieving: {
            type: Object,
            required: true
        }
    },
    bio: {
        type: String
    },
    hobbies: {
        type: Array
    },
    likedLocations: {
        type: Array
    }
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;