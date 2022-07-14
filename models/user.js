import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const user = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    findMe: {
        type: String,
        required: true
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
    },
    darkMode: {
        type: Boolean,
        required: true
    },
    since: {
        type: Date,
        default: Date.now
    },
    matchedWith: {
        type: String,
        default: 'No match found'
    },
    chatBackground: {
        type: String
    },
    profileImage: {
        type: String,
        required: true
    }
    // email: {
    //     type: String,
    //     required: true
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
});

mongoose.models = {};

const User = mongoose.model('User', user);

export default User;