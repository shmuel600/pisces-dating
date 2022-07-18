import connectDB from '../../../middleware/mongodb';
import Chat from '../../../models/chat';
import User from '../../../models/user';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("POST new chat");

        const chatHistory = new Chat({
            messages: []
        });
        const chatCreated = await chatHistory.save();

        const { userId } = req.body;
        console.log("req body user id: ", userId);
        console.log("created chat id: ", chatCreated._id);
        const user = await User.findByIdAndUpdate(userId, { chat: chatCreated._id })
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