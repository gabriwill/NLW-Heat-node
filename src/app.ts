import cors from "cors";
import "dotenv/config"
import express from "express";
import router from "./routes";
import { Server } from "socket.io";
import http from 'http'

const app = express();
app.use(cors())

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

app.use(express.json())
app.use(router);

io.on('connection', socket => {

})

app.get('/github', (req, res, next) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
});

app.get('/signin/callback', (req, res) => {
    const { code } = req.query
    return res.json(code)
})

export { httpServer, io }