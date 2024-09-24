import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400);
            throw new Error("All fields are required")
        }

        const existedEmail = await User.findOne({ email })

        if (existedEmail) {
            res.status(409)
            throw new Error("User already exist with this email")
        }

        const user = await User.create({
            username, email, password
        })

        const createdUser = await User.findById(user._id).select("-password")
        if (!createdUser) {
            res.status(500);
            throw new Error("Something went wrong while registering user");
        }

        return res.status(200).json({ createdUser });
    } catch (error) {
        return res.status(res.statusCode || 500).json({ Error: err.message });
    }

}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400)
            throw new Error("All fields are required")
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ Error: "email not registered " });
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            res.status()
            throw new Error("Wrong password")
        }

        const accesstoken = await user.generateAccessToken()
        await user.save({ validateBeforeSave: false })
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", accesstoken, options)
            .json({
                user: {
                    username: user.username,
                    email: user.email,
                },
                accesstoken: accesstoken,
                message: "user logged in succesfully"
            })
    } catch (error) {
        return res.status(statusCode || 500).json({ Error: err.message });
    }
}
export { registerUser, loginUser }