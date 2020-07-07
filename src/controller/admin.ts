import { RequestHandler } from "express";
import User from "../models/user";

export const postLogin: RequestHandler = (req, res, next) => {

}

export const getAllUsers: RequestHandler = async (req, res, next) => {
    const users = await User.findAll();
    return res.status(200).json({users: users});

}

export const getAllCourses: RequestHandler = async (req, res, next) => {
    // const courses = await Courses.findAll();
    // return res.status.json()
}

export const getThreeBestCourses: RequestHandler = (req, res, next) => {

}

export const getSiteVisits: RequestHandler = (req, res, next) => {

}