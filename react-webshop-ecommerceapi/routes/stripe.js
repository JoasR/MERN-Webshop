const router = require("express").Router()
const dotenv = require("dotenv")
const { verifyTokenAndAuthorization } = require("./verifyToken")
dotenv.config()
const KEY = process.env.STRIPE_KEY
const stripe = require("stripe")(KEY)
const Product = require("../models/Product")


router.post("/create-checkout-session", verifyTokenAndAuthorization, async (req, res) => {
  try {    
    const foundProductsFromCart = await Promise.all(req.body.cartItems.map(async (item) => {
      const foundProduct = await Product.findById(item._id);
        return { ...foundProduct._doc, quantity: item.quantity }
    }))

    const totalPrice = foundProductsFromCart.reduce((accumulator, currentProduct) => {
      return accumulator + (currentProduct.price * currentProduct.quantity);
    }, 0);

    const totalPriceInCents = totalPrice * 100

    const shippingOptions = []

    if(totalPriceInCents > 5000){ //So if the totalcost of the order is more than 50euros, the shipping is free
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 0, currency: 'EUR'},
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      })
    } else {
      shippingOptions.push({
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 499, currency: 'EUR'},
          display_name: 'Shipping Costs',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      })
    }

    console.log("The total price of the order is: " + totalPrice)

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
      shipping_address_collection: {allowed_countries: ['BE', 'NL']},
      shipping_options: shippingOptions,
      // [
      //   {
      //     shipping_rate_data: {
      //       type: 'fixed_amount',
      //       fixed_amount: {amount: 0, currency: 'EUR'},
      //       display_name: 'Free shipping',
      //       delivery_estimate: {
      //         minimum: {unit: 'business_day', value: 5},
      //         maximum: {unit: 'business_day', value: 7},
      //       },
      //     },
      //   },
      //   {
      //     shipping_rate_data: {
      //       type: 'fixed_amount',
      //       fixed_amount: {amount: 499, currency: 'EUR'},
      //       display_name: 'Fast shipping',
      //       delivery_estimate: {
      //         minimum: {unit: 'business_day', value: 1},
      //         maximum: {unit: 'business_day', value: 2},
      //       },
      //     },
      //   }
      // ],
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