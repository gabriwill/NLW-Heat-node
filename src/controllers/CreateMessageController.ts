import { Request, Response } from "express";
import CreateMessageService from "../services/CreateMessageService";



export default class CreateMessageController {
    async handler(req: Request, res: Response) {
        const { message } = req.body
        const { user_id } = req //verificar se pode colocar o user_id no body
        const service = new CreateMessageService()
        try {
            const result = await service.execute(message, user_id);

            return res.json(result)
        } catch (err) {
            return res.json({ error: err.message })
        }

    }
}