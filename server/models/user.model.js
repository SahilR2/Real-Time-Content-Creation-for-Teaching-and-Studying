import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]

    }
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


userSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username
    }, process.env.ACCESS_TOKEN_SECRET,
        {
            //default algo HS256
            // algorithm: 'RS256',
            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
        })


}

export const User = mongoose.model('User', userSchema)