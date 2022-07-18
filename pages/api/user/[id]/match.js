import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/user';
// import Chat from '../../../../models/chat';

const handler = async (req, res) => {
    const { id } = req.query;
    const getAge = (birthDay) => {
        const yearDifference = new Date().getUTCFullYear() - new Date(birthDay).getUTCFullYear();
        const currentDate = new Date().getMonth() * 100 + new Date().getDate();
        const birthDate = new Date(birthDay).getMonth() * 100 + new Date(birthDay).getDate();
        const birthdayPassed = currentDate < birthDate ? false : true;
        const age = birthdayPassed ? yearDifference : yearDifference - 1;
        return age;
    }
    if (req.method === 'PATCH') {
        try {
            console.log("PATCH match users");
            const firstUser = await User.findById(id);
            //find users filtered by:
            //gender />0/ age />0/ location />0/ -- not found
            //get match% by love languages and DONT sort by best one (exploitable)
            // firstUser.gender(man, woman, other)
            // firstUser.findMe.gender(men, women, everyone)
            // firstUser.findMe.age(min - max)
            // firstUser.birthday(getAge(firstUser.birthday));
            // const matchedUser = //return id of matched user
            const users = await User.find();
            const genderFilter = users.filter((otherUser) => {
                if (firstUser.findMe.gender === "Everyone") {
                    if (otherUser.findMe.gender === "Everyone") return true;
                    else if (otherUser.findMe.gender === firstUser.gender) return true;
                    else return false;
                }
                else if (firstUser.findMe.gender === otherUser.gender) {
                    if (otherUser.findMe.gender === "Everyone") return true;
                    else if (otherUser.findMe.gender === firstUser.gender) return true;
                    else return false;
                }
            });
            // const matchedUser = 
            console.log("matched with: ", matchedUser._id);
            const user = await User.findByIdAndUpdate(id, { matchedUser });
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