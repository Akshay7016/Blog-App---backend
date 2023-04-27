const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    try {
        const { post, user } = req.body;

        // Here I am using create() method, for save() we require object first
        const savedLike = await Like.create({ post, user });

        // Now change "Post" model
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike._id } }, { new: true })
            .populate("likes")
            .exec();

        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Like successful"
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            data: error.message,
            message: "Something went wrong"
        })
    }
};