const router = require("express").Router()
const dotenv = require("dotenv")
const { verifyTokenAndAuthorization } = require("./verifyToken")
dotenv.config()
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY)
const Product = require("../models/Product")


router.post("/create-checkout-session", verifyTokenAndAuthorization, async (req, res) => {
  try {    
    const line_items = await Promise.all(req.body.cartItems.map(async (item) => {
      const itemFromDb = await Product.findById(item._id)
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
            images: [item.img],
            metadata: {
              id: item._id
            }
          },
          unit_amount: itemFromDb.price * 100
        },
        quantity: item.quantity
      }
    }))
    console.log(line_items)
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    })
    res.status(200).json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post("/payment", (req, res) => {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "eur"
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          res.status(500).json(stripeErr);
        } else {
          res.status(200).json(stripeRes);
        }
      }
    );
  });
  

module.exports = router