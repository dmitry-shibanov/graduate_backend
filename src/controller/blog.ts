import { RequestHandler } from "express";
import Blog from "../models/blog";

// get operations
export const getBlogs: RequestHandler = async (req, res, next)=>{
    const blogs = await Blog.findAll();

    return res.status(200).json({blogs: blogs});
}

// post operation
export const postCreateBlog: RequestHandler = async (req, res, next) =>{
    const title = req.body.title;
    const content = req.body.content;
    const image = req.body.image;

    const blog = await Blog.create({title: title, content: content, image: image});
    try{
    if(!blog){
        throw new Error();
    }

    return res.status(201).json({title: title});
}catch(_err){
    const err:Error = _err;
    next(err);
}
}

export const postUpdateBlog: RequestHandler = async (req,res, next) => {
    const id = req.body.id;
    const tytle = req.body.description;
    const description = req.body.description;
    const userId = res.locals.jwtPayload.userId;;
    const commentId = req.body.commentId;

    try{

    } catch(_err){
        const err: Error = _err;
        next(err);
    }
}

export const postAddUserToBlog: RequestHandler = (req, res, next) =>{

}

export const postRemoveBlog: RequestHandler = async (req, res, next) =>{
    const id = req.body.id;

    const blog = await Blog.findByPk(id);
    await blog?.destroy();

    return res.json({description: "blog was removed"})

}
