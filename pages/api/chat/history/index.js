import { Server } from 'Socket.IO';
import connectDB from '../../../../middleware/mongodb';
import Chat from '../../../../models/chat';
import User from '../../../../models/user';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("POST new chat");
        const { id } = req.body;
        const chatHistory = new Chat({
            messages: []
        });
        const chatCreated = await chatHistory.save();

        console.log("chat created", chatCreated);
        console.log("chat created id", chatCreated._id);
        // const { user } = req.body;
        // const userId = user._id;
        // const matchedUserId = user.matchedUser._id;
        // console.log("req body user id: ", userId);
        // console.log("created chat id: ", chatCreated._id);
        const user = await User.findByIdAndUpdate(id, { chat: chatCreated._id })
        console.log("user: ", user.chat);
        const updatedUser = await User.findByIdAndUpdate(user.matchedUser, { chat: chatCreated._id });
        console.log("updated user: ", updatedUser.chat);
        // const updatedMatchedUser = await User.findByIdAndUpdate(matchedUserId, { chat: chatCreated._id });
        // console.log("updated user: ", updatedUser);
        // console.log("updated matched user: ", updatedMatchedUser);
        return res.status(200).send(chatCreated);
        // if (messages) {
        //     try {
        //         const chat = new Chat({
        //             messages
        //         });
        //         const chatCreated = await chat.save();
        //         return res.status(200).send(chatCreated);
        //     }
        //     catch (error) {
        //         return res.status(500).send(error.message);
        //     }
        // }
        // else {
        //     res.status(422).send('data_incomplete');
        // }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);