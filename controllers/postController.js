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

// TODO: Need extra testing for populate("likes")
exports.getAllPosts = async (req, res) => {
    try {
        // const posts = await Post.find({});
        // const posts = await Post.find({}).populate("likes").populate("comments").exec();
        const posts = await Post.find({}).populate("comments").exec();

        res.status(200).json({
            success: true,
            data: posts,
            message: "Posts retrieved successfully"
        })
    } catch (error) {
        res.status(503).json({
            success: false,
            data: error.message,
            message: "Something went wrong"
        })
    }
}