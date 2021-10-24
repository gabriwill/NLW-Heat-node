import prismaClient from "../prisma";


export default class GetLastMessagesServices {
    async execute(messages_number: number) {
        return await prismaClient.messages.findMany({
            take: messages_number,
            orderBy: {
                created_at: 'desc'
            },
	    include: {
		user: true
	    }
        });
    }
}