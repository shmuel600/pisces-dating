

    // const chat = await Chat.findById(await User.findById(id));

    // if (req.method === 'GET') {
    //     console.log("GET chat history");
    //     try {
    //         console.log(chat.messages);
    //         return res.status(200).send(chat.messages);
    //     }
    //     catch (error) {
    //         return res.status(500).send(error.message);
    //     }
    // }
    // else if (req.method === 'PATCH') {
    //     try {
    //         console.log("PATCH chat history");
    //         console.log("to update: ", req.body);
    //         const history = await Chat.findByIdAndUpdate(chat._id, req.body);
    //         console.log("chat history: ", history);
    //         return res.status(200).send(history);
    //     }
    //     catch (error) {
    //         return res.status(500).send(error.message);
    //     }
    // }
    // else if (req.method === 'DELETE') {
    //     try {
    //         console.log("DELETE chat");
    //         const chat = await Chat.findByIdAndDelete(chat._id);
    //         return res.status(200).send(chat);
    //     }
    //     catch (error) {
    //         return res.status(500).send(error.message);
    //     }
    // }