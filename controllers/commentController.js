const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
    try {
        // fetch data from req body
        const { post, user, body } = req.body;

        // create comment object
        const comment = new Comment({
            post, user, body
        });

        // save comment object to database
        const savedComment = await comment.save();

        // find the post by id inside "Post" model and then add savedComment id to "Post" comments array
        // $push is used to update entry and $pill is used to delete entry
        // {new:true} once all updation done then it will return updated document
        const updatedPost = await Post.findByIdAndUpdate(post, { $push: { comments: savedComment._id } }, { new: true })
            .populate("comments") //populate the comments array with comment document
            .exec();

        // send response
        res.status(200).json({
            success: true,
            data: updatedPost,
            message: "Comment added"
        });
    } catch (error) {
        res.status(503).json({
            success: false,
            message: "Something went wrong"
        })
    }
}