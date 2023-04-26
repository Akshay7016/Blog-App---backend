const Post = require("../models/postModel");

exports.createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title, body
        });
        const savedPost = await post.save();

        res.status(200).json({
            success: true,
            data: savedPost,
            message: "Post uploaded successfully"
        })
    } catch (error) {
        res.status(503).json({
            success: false,
            data: error.message,
            message: "Something went wrong"
        })
    }
};