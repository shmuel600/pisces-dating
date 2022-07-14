import connectDB from '../../middleware/mongodb';
import User from '../../models/user';
// import bcrypt from 'bcrypt';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("POST new user");
        // Check if name, email or password is provided
        const { _id, name, gender, findMe, birthday, darkMode, personalityType, loveLanguage, profileImage, chatBackground } = req.body;
        console.log("req body: ", _id, name, gender, findMe, birthday, darkMode, personalityType, loveLanguage, profileImage, chatBackground);
        if (_id && name && gender && findMe && birthday && personalityType && loveLanguage && profileImage && chatBackground && typeof (darkMode) === 'boolean') {
            try {
                // Hash password to store it in DB
                // const passwordhash = await bcrypt.hash(password, 10);
                const user = new User({
                    _id,
                    name,
                    birthday,
                    gender,
                    findMe,
                    personalityType,
                    loveLanguage,
                    chatBackground,
                    profileImage,
                    darkMode
                    // email,
                    // password: passwordhash,
                });
                // Create new user
                const userCreated = await user.save();
                return res.status(200).send(userCreated);
            }
            catch (error) {
                return res.status(500).send(error.message);
            }
        }
        else {
            res.status(422).send('data_incomplete');
        }
    }
    else if (req.method === 'GET') {
        console.log("GET all users");
        try {
            const users = await User.find();
            return res.status(200).send(users);
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