import 'dotenv/config'

import connectDB from './db/index.js'
import { app } from './app.js'
import server from './server.js'
connectDB()
    .then(() => {
        console.log("success")
        app.listen(process.env.PORT || 8000, () => {
            console.log("Server is running")
        })
        server.listen(process.env.SOCKET_PORT || 3002, () => {
            console.log("Server listening on http://localhost:3002");
        });
    }).catch((err) => {
        console.log("Something went wrong server crashed!!!!")
    })