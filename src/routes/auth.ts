import { Router } from "express";
import { check, body, Meta } from 'express-validator/check';
import { postSignUp, postLogin } from "../controller/auth";
import sessionUser from "../middleware/user_session"
const router = Router();

//  ********************  get requests   ************************

// get requests
router.get("/signup");
router.get("/login");

//  ********************  post requests   ************************


// post signup
router.post("/signup", [check('email').isEmail(),
body('password', "Пожайлуста введите валидный пароль").isLength({ min: 5 }).isAlphanumeric(),
body('confirmPassword').custom((value: string, obj: Meta) => {
    const req = obj.req;
    if (value !== req.body.password) {
        throw new Error("Пароли не совпадают");
    }

    return true;
})], postSignUp);

// post login
router.post("/login", [check('email').isEmail(),
body('password', "Пожайлуста введите валидный пароль").isLength({ min: 5 }).isAlphanumeric()],
    postLogin);


export default router;