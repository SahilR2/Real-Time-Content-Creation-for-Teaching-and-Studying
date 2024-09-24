import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
const verifyJWT =
    async (req, res, next) => {
        try {
            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
            if (!token) {
                res.status(401).json({ message: "Unauthorized request" })
                throw new Error("Unauthorized request");

            }
            const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

            if (!decodedToken) {
                res.status(401).json({ message: "Invalid access token" })
                throw new Error("Invalid access token");

            }

            const user = await User.findById(decodedToken?._id).select("-password")
            // console.log(user)
            if (!user) {
                res.status(401).json({ message: "Invalid access token" })
                throw new Error("Invalid access token");
            }

            req.user = user


            next()
        } catch (error) {
            return res
        }
    }




export { verifyJWT }