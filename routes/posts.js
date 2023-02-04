import express from 'express';
import { allPosts, deletePost, likePost, newPost, updatePost, userPosts } from '../controllers/post.js';
const router = express.Router();

router.post('/post', newPost)
router.patch('/updatepost/:id', updatePost)
router.delete('/deletepost/:id', deletePost)
router.put('/like/:id', likePost)
router.get('/allposts', allPosts)
router.get('/getuserposts/:id', userPosts)

export default router
