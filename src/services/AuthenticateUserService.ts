import axios from "axios";
import prismaClient from "../prisma";
import { sign } from 'jsonwebtoken'

interface IAcessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    name: string,
    id: number,
    login: string
}

export default class AuthenticateUserService {
    async execute(code: string) {
        const { data } = await axios.post<IAcessTokenResponse>(`https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`, null, {
            headers: {
                "Accept": 'application/json'
            }
        });

        const response = await axios.get<IUserResponse>(`https://api.github.com/user`, {
            headers: {
                Authorization: 'Bearer ' + data.access_token
            }
        });

        const { avatar_url, login, name, id } = response.data

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })

        if (!user) user = await prismaClient.user.create({
            data: {
                github_id: id,
                name,
                login,
                avatar_url
            }
        })

        const token = sign(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    avatar_url: user.avatar_url
                },
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return { token, user }
    }
}