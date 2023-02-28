const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        inStock: { type: Boolean, default: true }
    },
    { timestamps: true }
)

ProductSchema.pre('save', function(next) {
    const uppercaseArray = this.size.map(str => str.toUpperCase());
    this.size = uppercaseArray;
    next();
  });

module.exports = mongoose.model("Product", ProductSchema)