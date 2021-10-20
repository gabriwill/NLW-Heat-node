import { Request, Response } from "express";
import GetLastMessagesServices from "../services/GetLastMessagesService";


export default class GetLastMessagesController {
    async handler(req: Request, res: Response) {
        const message_number = Number(req.query.message_number) || 3;

        const service = new GetLastMessagesServices();
        const messages = await service.execute(message_number);

        return res.json(messages)
    }
}