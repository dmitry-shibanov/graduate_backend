import { RequestHandler } from "express";
import { validationResult } from 'express-validator/check';
import User from "../data/models/user";
import jwt from 'jsonwebtoken';
import CustomError from "../models/error";
import bcrypt from "bcryptjs";

export const postSignUp: RequestHandler = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const login = req.body.login;

    const result = validationResult(req);
    try {
        if (!result.isEmpty()) {
            result.array({ onlyFirstError: true }).forEach(item => console.log(item));
            throw new Error("Ошибка при регистрации");
        }

        const exitingUser = await User.findOne({
            where: {
                email: email
            }
        });

        console.debug(`exitingUser ${exitingUser}`);

        if (exitingUser) {
            throw new Error("Пользователь с таким email уже существует, придумаете другой");
        }
        const hashPassword = bcrypt.hashSync(password,12);
        const newUser = await User.create({ email: email, password: hashPassword, login: login });

        return res.status(201).json({ message: "user was created" });
    } catch (_err) {
        const err: Error = _err;
        next(err);
    }
}

export const postChangePassword: RequestHandler = (req, res, next) => {

}

export const postLogin: RequestHandler = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log("login came to request handler");
    const result = validationResult(req);
    console.log(`login came validation result ${result}`);
    const error = result.array({ onlyFirstError: true })[0];
    try {
        if (!result.isEmpty()) {
            result.array({ onlyFirstError: true }).forEach(item => console.log(item));
            console.log(error.location);
            console.log(error.value);
            throw new CustomError(error.msg, 401);
        }
        console.log("пришел на проверку");

        const currentUser = await User.findOne({
            where: {
                email: email,
            }
        });

        console.log(`currentUser is ${currentUser}`);
        if (!currentUser) {
            throw new CustomError(new Error("Пользователь не найден"), 401);
        }

        if(!bcrypt.compare(password, currentUser?.password)){
            throw new CustomError(new Error("Пароли не совпадают"));
        }

        const token = jwt.sign({
            email: currentUser!.login,
            userId: currentUser!.id
        },
            'secret',
            { expiresIn: '10h' });

        res.status(200).json({ token: token, userId: currentUser!.id.toString() });
    } catch (_err) {
        const err: CustomError = _err;
        next(err);
    }
}

export const getUserCourses: RequestHandler = (req, res, next) => {
    const userID = res.locals.jwtPayload.userId;;
    

}