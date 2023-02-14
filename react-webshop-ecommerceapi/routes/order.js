const router = require("express").Router()
const Order = require("../models/Order")
const Product = require("../models/Product")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require("./verifyToken")

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = Order.findByIdAndUpdate(req.params.id,
            {
                $set: req.body
            },
            { new: true } //Makes it so it shows the newly updated order
        )
        res.status(200).json(updatedOrder)    
    } catch (err) {
        res.status(500).json(err)   
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")        
    } catch (err) {
     res.status(500).json(err)
    }
})

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders) 
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)    
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET PRODUCT STATS
router.get('/sales/:productId', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    console.log(threeMonthsAgo)
    
    try {
        if(!product){
            return res.status(400).json("Product could not be found")
        }

        const sales = await Order.aggregate([
            {
              $match: {
                'products.productId': productId,
                createdAt: { $gte: threeMonthsAgo },
              },
            },
            {
              $unwind: '$products',
            },
            {
              $match: {
                'products.productId': productId,
              },
            },
            {
              $group: {
                _id: {
                     $month: "$createdAt",
                },
                year: { $first: { $year: "$createdAt" } },
                totalSales: {
                  $sum: {
                    $multiply: ['$products.quantity', product.price],
                  },
                },
              },
            },
            {
                $sort: { year: 1, _id: 1 }
            }
          ]);
          res.status(200).json(sales);
    } catch (err) {
        res.status(500).json(err)
    } 
  });

  //GET TOTAL SALES OF 1 PRODUCT BY ID
  router.get('/products/:productId/total-sales', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
  
    try {
      if (!product) {
        return res.status(400).json("Product could not be found")
      }
  
      const result = await Order.aggregate([
        {
          $match: {
            'products.productId': productId,
          },
        },
        {
          $unwind: '$products',
        },
        {
          $match: {
            'products.productId': productId,
          },
        },
        {
          $group: {
            _id: null,
            totalSales: {
              $sum: {
                $multiply: ['$products.quantity', product.price],
              },
            },
            count: {
              $sum: '$products.quantity',
            },
          },
        },
      ]);
  
      const totalSales = result.length > 0 ? result[0].totalSales : 0;
      const count = result.length > 0 ? result[0].count : 0;
  
      res.status(200).json({
        totalSales: totalSales,
        count: count,
      });
    } catch (err) {
      res.status(500).json(err)
    }
  });

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() -1))
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() -1)) //for example lets say its now september first then lastmonth will be august first and previousmonth will be july first

    console.log(lastMonth);
    console.log(previousMonth);

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth }, ...(productId && { // conditional objects with spread operator. If there is a productid, create a new condition: in this case check if req.query.pid equals productId
                products: {$elemMatch: { productId }} // this is the same as writing: productId: productId
            }) } }, //Basically last 2 months
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount" // amount from an order
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales"} // total of all amounts of all orders combined from the last 2 months: _id: 1 = last month, _id: 2 = the month before that
                }
            },
            {
                $sort: { _id: 1 }
            }
        ])
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router