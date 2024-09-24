import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import userRouter from "./routes/user.route.js"
const app = express();

app.use(cors(
    {
        origin: '*'
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))
app.use(cookieParser())


app.use("/api/v1/users", userRouter)



export { app }