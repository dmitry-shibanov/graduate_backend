import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Secrets from "../creds/token_secrets.json";

const sessionModerator = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    console.log(`came to authorization ${authHeader}`);
    if (!authHeader) {
        const err = new Error('Not authenticated');
        // err.statusCode = 401;
        throw err;
    }
    const token = authHeader.split(' ')[1];
    const tokenCopy = <string>req.headers["auth"];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, Secrets.moderator);
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

    next();
}

export default sessionModerator;