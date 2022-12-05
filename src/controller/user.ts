import { RequestHandler } from "express"
import Products from "../data/models/product";
import User from "../models/user";
import Order from "../models/order";

export const postAddToCart: RequestHandler = async (req, res, next) => {
    const productId = req.body.productId;

    try {
        const userId = res.locals.jwtPayload.userId as number;
        const user = await User.findByPk(userId);
        const basket = user?.basket;
        // basket?.addProductToBasket(productId);

        res.status(201).json({ message: "product was added" });
    } catch (_err) {
        next(_err);
    }
}

export const getCatalog: RequestHandler = async (req,res,next) => {
    const userId = res.locals.jwtPayload.userId;;
    
}

export const postCreateOrder: RequestHandler = (req, res, next) => {

}

export const postAddToFavorite: RequestHandler = (req, res, next) => {

}

export const postRemodeAccount: RequestHandler = (req, res, next) => {

}

export const getOrders: RequestHandler = async (req, res, next) => {
}

export const getOrder: RequestHandler = (req, res, next) => {

}

export const getCart: RequestHandler = (req, res, next) => {
    
}