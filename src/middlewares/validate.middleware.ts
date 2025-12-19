import { Request,Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

export const validateNote=(req:Request,res:Response,next:NextFunction)=>{

    const {title,content}=req.body;

    if(!title|| typeof title !=="string"){
        return next(new ApiError("Title is required and must be a string",400));

    }

    if(!content || typeof content !=="string"){
        return next(new ApiError("Content is required and must be string",400));
    }

    next();
    
}