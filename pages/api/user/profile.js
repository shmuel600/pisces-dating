import connectDB from '../../../middleware/mongodb';
import User from '../../../models/user';
import { cloudinary } from '../utils';

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log("POST new profile picture");
        try {
            const fileStr = req.body.data;
            const id = req.body.id;
            const uploadResponse = await cloudinary.uploader.upload(fileStr, {
                public_id: `profile_${id}`,
                upload_preset: 'profile',
                use_filename: true,
                folder: `user_${id}/profile_image`
            });
            console.log("secure url: ", uploadResponse.secure_url);
            try {
                console.log("PATCH by user id");
                console.log("to update: ", uploadResponse.secure_url);
                const user = await User.findByIdAndUpdate(id, { profileImage: uploadResponse.secure_url });
                return res.status(200).send(user);
            }
            catch (error) {
                return res.status(500).send(error.message);
            }
            // res.json({ url: uploadResponse.secure_url })

        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'somthing went wrong' });
        }
    }
    else if (req.method === 'GET') {
        const { resources } = await cloudinary.search
            .expression('folder:profile')
            .sort_by('public_id', 'desc')
            .max_results(30)
            .execute();
        const publicUrls = resources.map((file) => file.secure_url);
        res.send(publicUrls);
    }
}

export default connectDB(handler);