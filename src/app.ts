import express, { Request, Response, NextFunction, ErrorRequestHandler, RequestHandler } from 'express';
import { json, urlencoded } from 'body-parser';
import multer from 'multer';
import path from "path";
// routes
import shopRoutes from './routes/courses';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import blogRoutes from './routes/blogs';
//session token
import jwt from 'jsonwebtoken';
// database connection
import sequelize from './data/db_connection';
// databse models
import User from './data/models/user';
import Product from './data/models/product';
import Order from './data/models/order';
import OrderProducts from './data/models/order_products';
import Basket from './data/models/basket';
import BasketProducts from './data/models/basket_products';
import Blog from './data/models/blog';

import initServer from './socket';
import CustomError from './models/error';
import { is } from 'bluebird';
import Course from './data/models/course';
import Video from './data/models/video';
import UserCourses from './data/models/user_courses';
// define variables
const app = express();

// use body-parser
app.use(json());
app.use("/assets/images", express.static(path.join(__dirname.replace("/dist",""), "assets/images")));
app.use(urlencoded({ extended: false }));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  );

  next();
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, accept: boolean) => void) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));

// define routes to app
app.use(shopRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(blogRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ page: 'page not found' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  const error = err as CustomError;
  let statusCode = 500;
  if(!error.statusCode){
    statusCode = error.statusCode;
  }
  console.log(err.message);
  return res.status(error.statusCode).json({ message: err.message });
});

// define relationship in db
Basket.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
User.hasOne(Basket, { sourceKey: 'id', foreignKey: 'userId' });
Blog.belongsTo(User, {targetKey: 'id', foreignKey:'creator'});
User.hasMany(Blog, {sourceKey: 'id', foreignKey: "creator"})
Order.belongsTo(User, { targetKey: 'id', foreignKey: 'userId' });
User.hasMany(Order, { sourceKey: 'id', foreignKey: 'userId' });
Video.belongsTo(Course, { targetKey: 'id', foreignKey: 'course_id' })
Course.hasMany(Video, {sourceKey: "id", foreignKey: 'course_id'});
UserCourses.hasMany(User, {sourceKey: 'id_user', foreignKey: 'id'});
UserCourses.hasMany(Course, {sourceKey: 'id_course', foreignKey: 'id'});


//{force: true}
sequelize
  .sync()
  .then((result) => {
    console.debug('Прошло подключение к базе данных');
    console.debug('************************************* Resule begin **************************************');
    const server = app.listen(3100);
    console.log(result);
    console.log('************************************* Resule end **************************************');
    const io = initServer.init(server);
    io.on('connection', (socket) => {
      console.log('client connected');
    });
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе данных');
    console.log('************************************* Описание ошибки **************************************');
    console.log(err);
  });
