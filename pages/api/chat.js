import connectDB from '../../middleware/mongodb';
import Chat from '../../models/chat';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("POST new chat");
        const { ___ } = req.body;
        console.log("req body: ", ___);
        if (___) {
            try {
                const chat = new Chat({
                    ___: ___
                });
                const chatCreated = await chat.save();
                return res.status(200).send(chatCreated);
            }
            catch (error) {
                return res.status(500).send(error.message);
            }
        }
        else {
            res.status(422).send('data_incomplete');
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);