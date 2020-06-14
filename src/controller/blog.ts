import { RequestHandler } from 'express';
import Blog from '../models/blog';
import CustomError from '../models/error';

// get operations
export const getBlogs: RequestHandler = async (req, res, next) => {
  const onthePage = 10;
  const page = req.body.page;
  const blogsCount = await Blog.count();

  const blogs = await Blog.findAll({ offset: onthePage * page, limit: onthePage });

  return res.status(200).json({ blogs: blogs });
};

// post operation
export const postCreateBlog: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.body.image;
  const userId = res.locals.jwtPayload.userId as number;

  try {
    let blog = await Blog.findOne({
      where: {
        title: title,
      },
    });
    if (blog) {
      let error = new Error('невозможно создать блог у вас, такой уже существует');
      throw new CustomError(error, 401);
    }
    blog = await Blog.create({ title: title, content: content, image: image, userId: userId });

    if (!blog) {
      let error = new Error('невозможно создать блог');
      throw new CustomError(error, 500);
    }

    return res.status(201).json({ title: title });
  } catch (_err) {
    const err: Error = _err;
    next(err);
  }
};

export const postUpdateBlog: RequestHandler = async (req, res, next) => {
  const blogId = req.body.id;
  const title = req.body.description;
  const description = req.body.description;
  const image = req.body.image;
  const userId = res.locals.jwtPayload.userId;
  const commentId = req.body.commentId;

  try {
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      let error = new Error('невозможно создать блог');
      throw new CustomError(error, 500);
    }

    const result = await Blog.update(
      { title: title, content: description, image: image },
      {
        where: {
          id: blogId,
        },
      },
    );

  } catch (_err) {
    const err: Error = _err;
    next(err);
  }
};

export const postAddUserToBlog: RequestHandler = (req, res, next) => {};

export const postRemoveBlog: RequestHandler = async (req, res, next) => {
  const id = req.body.id;

  const blog = await Blog.findByPk(id);
  await blog?.destroy();

  return res.json({ description: 'blog was removed' });
};
