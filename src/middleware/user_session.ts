import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';
import AuthUser from "../models/types/mytoken";

const sessionUser: RequestHandler = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(`came to authorization ${authHeader}`);
    if (!authHeader) {
        const err = new Error('Not authenticated');
        // err.statusCode = 401;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    const tokenCopy = <string>req.headers["auth"];
    console.log(`token ${token}`)
    console.log(`token ${tokenCopy}`)

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
        res.locals.jwtPayLoad = decodedToken;
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const err = new Error('Not authenticated');
        // err.statusCode = 401;
        throw err;
    }

    // req.res?.set("userId", (<AuthUser>decodedToken).userId)
    // req.res?.cookie('sessionId', decodedToken);

    console.log(decodedToken);
    next();
}

export default sessionUser;