import { RequestHandler } from "express";
import Products from "../data/models/product";

export const getProducts: RequestHandler = async (req, res, next) => {
    const products = await Products.findAll();
    console.log(products);
    res.status(200).json({ message: "Products Page", products: products });
}

export const getProduct: RequestHandler = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    const search: string = req.query.name;
    console.log(search);
    const product = await Products.findByPk(id);
    res.status(200).json({ key: id, "name": search, product: product });
}

export const getSearchProduct: RequestHandler = async (req, res, next) => {
    const search: string = req.query.name;
    const products = await Products.findAll({
        where: {
            "name": search
        }
    });

    res.status(200).json({ "products": products });
}

export const getIndex: RequestHandler = (req, res, next) => {
    res.status(200).json({ message: "index Page" });
}