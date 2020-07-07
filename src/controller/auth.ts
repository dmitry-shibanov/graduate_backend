import { RequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import crypto from "crypto";
import User from '../data/models/user';
import jwt from 'jsonwebtoken';
import CustomError from '../models/error';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import email from "../creds/email.json";
import Secrets from "../creds/token_secrets.json";

import { userInfo } from 'os';

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

    if (exitingUser && exitingUser.verified) {
      throw new Error('Пользователь с таким email уже существует, придумаете другой');
    }
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({ email: email, password: hashPassword, login: login });
    const token = generateRandomToken();
    transporter.sendMail({
        to: email,
        from: 'testserver',
        subject: 'Sign Up',
        html: `<h1>Регистрация</h1>
            <p> Вы зарегестрировались на нашем сайте по обучению, пожайлуста перейдите по данной ссылке, чтобы подтвердить регистрацию <a hreg="http://localhost:3000/confirmRegestration/${token}">Link</a></p>
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

    const userId = res.locals.jwtPayLoad.userId;
try{
    if(userId){
        throw new CustomError("Вы уже авторизованы", 422);
    }

    const user = await User.findOne({where:{
        email: email
    }});

    if(!user){
        return res.status(403).json({message: "Пользователь с данным email не существует", error: true});
    }
    const token = generateRandomToken();
    const date = new Date(Date.now() + 3600000);

    await user.update({
        resetToken: token,
        resetDate: date
    });

    transporter.sendMail({
        to: email,
        from: 'testserver',
        subject: 'Sign Up',
        html: `<h1>Регистрация</h1>
            <p> Вы зарегестрировались на нашем сайте по обучению, пожайлуста перейдите по данной ссылке, чтобы подтвердить регистрацию <a hreg="http://localhost:3100/confirm/${token}">Link</a></p>
            `,
      });
      return res.status(200).json("message was sent");

}catch(_err){

}
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

    const currentUser = await User.findOne({
      where: {
        email: email
      },
    });

    console.log(`currentUser is ${currentUser}`);
    if (!currentUser) {
      throw new CustomError('Пользователь не найден', 401);
    }

    if (!bcrypt.compare(password, currentUser?.password)) {
      throw new CustomError('Пароли не совпадают', 401);
    }

    const token = jwt.sign(
      {
        email: currentUser!.login,
        userId: currentUser!.id,
      },
      Secrets.user,
      { expiresIn: '10h' },
    );

    res.status(200).json({ token: token, userId: currentUser!.id.toString() });
  } catch (_err) {
    const err: CustomError = _err;
    next(err);
  }
};

export const confirmRegestration: RequestHandler = async (req, res, next) => {
    const token = req.params.token;
    const user = await User.findOne({where:{
        verified: false,
        resetToken: token,
    }});

    if(!user){
        return res.status(401).json({message: "Пользователь не найден или уже прошел верификацию", error: true});
    }

    await user.update({
        verified: true,
        resetDate: null,
        resetToken: null
    })

    return res.status(201).json({message: "Поздравляю вы зарегестрированы", error: false});
}