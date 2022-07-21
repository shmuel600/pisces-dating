import connectDB from '../../../../middleware/mongodb';
import User from '../../../../models/user';

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

            //start filters
            const users = (await User.find()).filter((otherUser) => {
                otherUser.matchedUser === null;
            });
            console.log("users", users);
            //check if one user (return) or more (continue), if none found return "no user found"
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
            console.log("gender filter", genderFilter);
            //check if one user (return) or more (continue), if none found return one from "users"
            const ageFilter = genderFilter.filter((otherUser) => {
                if (firstUser.findMe.age[0] > getAge(otherUser.birthday)) return false;
                else if (firstUser.findMe.age[1] < getAge(otherUser.birthday)) return false;
                else return true;
            });
            console.log("age filter", ageFilter);
            //check if one user (return) or more (continue), if none found return one from "gender filter"

            //add location filter here
            //check if one user (return) or more (continue), if none found return one from "age filter"

            // handle repeated matches
            // prioritize nearby users

            // fix chat room name for both users and patch to "user.chat"

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