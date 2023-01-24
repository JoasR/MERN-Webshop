const User = require("../models/User")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body //take everything inside the body and set it
        },
         { new:true } //make sure it retuns the updated user aswell
        ) 
        const { password, ...otherUpdatedUserInfo } = updatedUser._doc //_doc is where mongodb stores the userdata
        res.status(200).json(otherUpdatedUserInfo)
    } catch (err) {
         res.status(500).json(err)
    }
})

//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others} = user._doc ////_doc is where mongodb stores the userdata
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query 
        ? await User.find().sort({ _id: -1 }).limit(5) 
        : await User.find()
        const usersDontShowPassword = users.map(user => user._doc).map(({password, ...others}) => others)
        res.status(200).json(usersDontShowPassword)    
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)) //Gives the full last year

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router