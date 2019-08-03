const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    costPrice: { type: Schema.Types.Decimal128, default: 999999.99, required: true },
    description: { type: String },
    isDeleted: { type: Boolean, default: false },
    quantity: { type: Number, default: 0 },
    size: { type: String},
    title: { type: String, required: true }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })

ProductSchema.set('toJSON', {
    transform: (document, result) => {
        result.costPrice = parseFloat(result.costPrice.toString())
        result.sellingPrice = parseFloat(result.sellingPrice.toString())
        result.discount = parseFloat(result.discount.toString())
        return result
    }
});

exports.Product = mongoose.model('Product', ProductSchema)