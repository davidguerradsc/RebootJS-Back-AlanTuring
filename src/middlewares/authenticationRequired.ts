import { Request, Response, NextFunction } from "express";

export function authenticationRequired (req: Request, res: Response, next: NextFunction) {
    if (req.isAthenticated()) return true;
    res.status(401).send();
} 