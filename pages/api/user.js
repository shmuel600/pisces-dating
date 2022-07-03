import connectDB from '../../middleware/mongodb';
import bcrypt from 'bcrypt';
import User from '../../models/user';

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("POST");
        // Check if name, email or password is provided
        const { name, gender, age, dateOfBirth, email, password, personalityType, loveLanguageGiving, loveLanguageRecieving } = req.body;
        console.log("dob", dateOfBirth);
        if (name && gender && age && dateOfBirth && email && password && personalityType && loveLanguageGiving && loveLanguageRecieving) {
            try {
                // Hash password to store it in DB
                const passwordhash = await bcrypt.hash(password, 10);
                const user = new User({
                    name,
                    gender,
                    age,
                    dateOfBirth,
                    email,
                    password: passwordhash,
                    personalityType,
                    loveLanguageGiving,
                    loveLanguageRecieving
                });

                // Create new user
                const userCreated = await user.save();
                return res.status(200).send(userCreated);
            } catch (error) {
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