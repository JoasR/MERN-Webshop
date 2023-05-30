const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//REGISTER
 //TODO: handle errors if username, email... is not send. Status 400: please fill in your email, username...
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        //TODO: Change AES to hash with salt!
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })

    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    }catch(err){
        if (err.code === 11000) {
            // A duplicate key error (code 11000) indicates a duplicate username
            return res.status(400).json("Username already exists");
        }
        res.status(500).json(err)
    }
})

//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if(!user){
            return res.status(401).json("Failed to Log In: Make sure your credentials are correct")
        }
        //TODO: Change AES to hash with salt
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        if(originalPassword !== req.body.password){
            return res.status(401).json("Failed to Log In: Make sure your credentials are correct")
        }
        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SEC,
        {expiresIn: "7d"}
        )

        const { password, ...others} = user._doc //_doc is where mongodb stores the userdata
        
        return res.status(200).json({...others, accessToken}) //others because we dont want people to be able to see the hashed password
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router