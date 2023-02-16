const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
        img: { type: String }
    }, 
    { timestamps: true }  //Shows when user is created
)

module.exports = mongoose.model("User", UserSchema)