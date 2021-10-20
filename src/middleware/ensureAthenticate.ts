import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export default function ensureAuthenticate(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization

    if (!authToken) return res.status(401).json({ error: "Token invalid" })

    const token = authToken.slice(7)

    try {
        const { sub } = verify(token, process.env.JWT_SECRET)
        req.user_id = sub as string
    } catch (error) {
        return res.status(401).json({ error: "Token invalid" })
    }

    return next()
}