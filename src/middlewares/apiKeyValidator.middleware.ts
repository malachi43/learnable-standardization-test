import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/authencticated.error.js";

const isAPIKeyValid = (req: Request, res: Response, next: NextFunction) => {
    const key = "X-Krypton-ApiKey"
    const apiKey = req.headers[key]
    if(!apiKey) throw new UnauthenticatedError(`provide apiKey in ${key} header`, 400);
    
};
