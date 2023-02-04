import User from '../models/auth.js'
import Post from '../models/post.js'
import mongoose from 'mongoose';


//create a post

export const newPost = async (req, res) => {

    const newPost = new Post(req.body);
    console.log(newPost);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
}

//update a post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const { desc } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }

    try {
        await Post.findByIdAndUpdate(_id, { $set: { 'desc': desc } })
        res.status(200).json('Post Updated')
    } catch (error) {
        res.status(405).json({ message: error.message })
    }
}

//delete a post

export const deletePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//like / dislike a post

export const likePost = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//get a post

// router.get("/:id", async (req, res) => {
//     try {
//         const post = await Post.findById(req.params.id);
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

//get timeline posts

export const allPosts = async (req, res) => {
    try {
        const Posts = await Post.find();
        res.status(200).json(Posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//get user's all posts

export const userPosts = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        const posts = await Post.find({ userId: user._id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
};
