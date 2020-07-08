import express from 'express';
import { getBlogs, getBlog, postCreateBlog, postUpdateBlog, postRemoveBlog } from '../controller/blog';
import sessionUser from "../middleware/user_session"

const router = express.Router();

// get router
router.get('/blogs/:id', getBlog);
router.get('/blogs', getBlogs);

// post router
router.put('/blogs/:id', sessionUser, postUpdateBlog);
router.post('/blogs', sessionUser, postCreateBlog);

// delete router
router.delete('/blogs/:id', sessionUser, postRemoveBlog);

export default router;
