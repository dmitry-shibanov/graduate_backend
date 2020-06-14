import { RequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import crypto from "crypto";
import User from '../data/models/user';
import jwt from 'jsonwebtoken';
import CustomError from '../models/error';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import email from "../creds/email.json";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
//   port: 587,
  secure: false,
  auth: {
    user: email.user,
    pass: email.password,
  },
});

const generateRandomToken = () =>{
    const token = crypto.randomBytes(20).toString("hex");
    return token;
} 

export const postSignUp: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const login = req.body.login;

  const result = validationResult(req);
  try {
    if (!result.isEmpty()) {
      result.array({ onlyFirstError: true }).forEach((item) => console.log(item));
      throw new Error('Ошибка при регистрации');
    }

    const exitingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    console.debug(`exitingUser ${exitingUser}`);

    if (exitingUser) {
      throw new Error('Пользователь с таким email уже существует, придумаете другой');
    }
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({ email: email, password: hashPassword, login: login });
    const token = generateRandomToken();
    transporter.sendMail({
        to: 'email',
        from: 'testserver',
        subject: 'Sign Up',
        html: `<h1>Регистрация</h1>
            <p> Вы зарегестрировались на нашем сайте по обучению, пожайлуста перейдите по данной ссылке, чтобы подтвердить регистрацию <a hreg="http://localhost:3100/confirm/${token}">Link</a></p>
            `,
      });

    return res.status(201).json({ message: 'user was created' });
  } catch (_err) {
    const err: Error = _err;
    next(err);
  }
};

export const postChangePassword: RequestHandler = (req, res, next) => {

};


export const postForgortPassword: RequestHandler = async (req,res,next) => {
    const email = req.body.email;

    const user = await User.findOne({where:{
        email: email
    }});

    if(!user){
        return res.status(403).json({message: "Пользователь с данным email не существует"});
    }
    const token = crypto.randomBytes(20).toString("hex");
    const date = Date.now() + 3600000;

    await user.update({
        resetToken: token,
        resetDate: date
    });


    
    return res.status(200).json("message was sent");
}

export const postResetPassword: RequestHandler = (req,res,next) => {
    const token  = req.params.token;
}

export const postLogin: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log('login came to request handler');
  const result = validationResult(req);
  console.log(`login came validation result ${result}`);
  const error = result.array({ onlyFirstError: true })[0];
  try {
    if (!result.isEmpty()) {
      result.array({ onlyFirstError: true }).forEach((item) => console.log(item));
      console.log(error.location);
      console.log(error.value);
      throw new CustomError(error.msg, 401);
    }
    console.log('пришел на проверку');

    const currentUser = await User.findOne({
      where: {
        email: email,
      },
    });

    console.log(`currentUser is ${currentUser}`);
    if (!currentUser) {
      throw new CustomError(new Error('Пользователь не найден'), 401);
    }

    if (!bcrypt.compare(password, currentUser?.password)) {
      throw new CustomError(new Error('Пароли не совпадают'));
    }

    const token = jwt.sign(
      {
        email: currentUser!.login,
        userId: currentUser!.id,
      },
      'secret',
      { expiresIn: '10h' },
    );

    res.status(200).json({ token: token, userId: currentUser!.id.toString() });
  } catch (_err) {
    const err: CustomError = _err;
    next(err);
  }
};

export const getUserCourses: RequestHandler = (req, res, next) => {
  const userID = res.locals.jwtPayload.userId;
};
