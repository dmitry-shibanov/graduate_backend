import { RequestHandler } from 'express';
import Blog from '../models/blog';
import CustomError from '../models/error';
import { validationResult } from 'express-validator';
import io from '../socket';

// get operations
export const getBlogs: RequestHandler = async (req, res, next) => {
  const onthePage = 10;
  const page = req.query.page || 1;
  const blogsCount = await Blog.count();

  const skip = onthePage*(page-1)<blogsCount ? onthePage*(page-1) : blogsCount
  const blogs = await Blog.findAll({ offset: onthePage * (page - 1), limit: onthePage });

  return res.status(200).json({ blogs: blogs, totalItems: blogsCount, message: "Fetched posts successfully" });
};

// post operation
export const postCreateBlog: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const image = req.file.path;
  console.log(image);
  const userId = res.locals.jwtPayLoad.userId as number;
  console.log(res.locals.jwtPayLoad)
  //const name = res.locals.jwtPayload.name as string;
    const error = validationResult(req);

  try {
    let blog = await Blog.findOne({
      where: {
        title: title,
        creator: userId,
      },
    });

    if(!req.file){
        const error = new CustomError("no image set");
        error.statusCode = 401;
        throw error;
    }
    if (blog) {
      let error = new Error('невозможно создать блог у вас, такой уже существует');
      throw new CustomError(error.message, 401);
    }
    blog = await Blog.create({ title: title, content: content, image: image, creator: userId });

    if (!blog) {
      let error = new Error('невозможно создать блог');
      throw new CustomError(error.message, 500);
    }
    io.getIO().emit('posts', {action: "create", post: { ...blog, creator: userId, name: "some name" }})
    return res.status(201).json({ post: blog });
  } catch (_err) {
    const err: Error = _err;
    next(err);
  }
};

export const postUpdateBlog: RequestHandler = async (req, res, next) => {
  const blogId = req.params.id;
  const title = req.body.title;
  const description = req.body.content;
  const image = req.body.image;
  const userId = res.locals.jwtPayLoad.userId;
  const commentId = req.body.commentId;
    console.log(`image ${image}`);
  try {
    const blog = await Blog.findByPk(blogId);

    if (!blog) {
      let error = new Error('невозможно создать блог');
      throw new CustomError(error.message, 500);
    }

    const result = await Blog.update(
      { title: title, content: description, image: image },
      {
        where: {
          id: blogId,
          creator: userId
        },
      },
    );

    io.getIO().emit('posts', {action: 'update', post: result});
    return res.status(200).json({message: 'Post Updated', post: result});
  } catch (_err) {
    const err: Error = _err;
    next(err);
  }
};

export const postAddUserToBlog: RequestHandler = (req, res, next) => {};

export const postRemoveBlog: RequestHandler = async (req, res, next) => {
  const id = req.params.id;
  const userId = res.locals.jwtPayLoad.userId;

  const blog = await Blog.findOne({
    where: {
      creator: userId,
      id: id,
    },
  });

  if(!blog){
      return res.status(422).json({message: "Вы не можете удалить данный блог", error: true});
  }

  await blog?.destroy();
  io.getIO().emit('posts', {action: 'delete', post: id});
  return res.status(200).json({ message: 'Блог успешно удален' });
};

export const getBlog: RequestHandler = async (req, res, next) => {
  const id = req.params.id;

  const blog = await Blog.findByPk(id);

  if (!blog) {
    return res.status(422).json({ error: true, message: 'блог с данным id не существует' });
  }

  return res.status(200).json({ post: blog });
};
