import { Request, Response } from "express";
import GetUserProfileService from "../services/GetUserProfileService";


export default class GetUserProfileController {
    async handler(req: Request, res: Response) {
        const { user_id } = req

        const service = new GetUserProfileService()
        const user = await service.execute(user_id)

        return res.json(user);
    }
}