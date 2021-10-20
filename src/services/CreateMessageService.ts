import { io } from "../app";
import prismaClient from "../prisma";

export default class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await prismaClient.messages.create({
            data: {
                content: text,
                user_id
            },
            include: {
                user: true
            }
        });

        const infoMessage = {
            content: text,
            user_id: message.user_id,
            created_at: message.created_at,
            user: {
                avatar_url: message.user.avatar_url,
                name: message.user.name
            }
        }

        io.emit('new_message', infoMessage)

        return message
    }
}