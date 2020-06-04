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
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
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
    req.res?.cookie('sessionId', decodedToken);

    console.log(decodedToken);
    next();
}

export default sessionUser;