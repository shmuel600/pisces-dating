import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user';

const handler = async (req, res) => {
    const { id } = req.query;
    if (req.method === 'GET') {
        console.log("GET by user id");
        try {
            const user = await User.findById(id);
            return res.status(200).send(user);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
    else if (req.method === 'PATCH') {
        try {
            console.log("PATCH by user id");
            console.log("to update: ", req.body);
            const user = await User.findByIdAndUpdate(id, req.body);
            return res.status(200).send(user);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
    else if (req.method === 'DELETE') {
        try {
            console.log("DELETE user");
            const user = await User.findByIdAndDelete(id, req.body);
            return res.status(200).send(user);
        }
        catch (error) {
            return res.status(500).send(error.message);
        }
    }
    else {
        res.status(422).send('req_method_not_supported');
    }
};

export default connectDB(handler);