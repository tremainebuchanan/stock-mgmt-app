const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
    title: { type: String, required: true }
})

const CustomerSchema = new Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, default: "Customer Name" }
})

const InventorySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })

const InvoiceSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    totalAmount: { type: Schema.Types.Decimal128, default: 0 },
    totalQty: { type: Number, default: 0 }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })


// const ProductSchema = new Schema({
//     costPrice: { type: Schema.Types.Decimal128, default: 999999.99, required: true },
//     description: { type: String },
//     isDeleted: {type: Boolean, default: false},
//     quantity: { type: Number, default: 0 },
//     size: { type: Number, default: 0 },
//     title: { type: String, required: true },
//     unitMeasure: { type: String, default: 'oz' }    
// }, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })

const SettingSchema = new Schema({
    title: {type: String, required: true},
    value: {type: String, required: true}
})

const UserTypeSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String }
})

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    isDeleted: {type: Boolean, default: false},
    password: {type: String, required: true},
    userType: {type: Schema.Types.ObjectId, ref: 'UserType'}
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' }})

const OrderSchema = new Schema({
    amount: { type: Schema.Types.Decimal128, default: 0 },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, default: 0 },
    status: { type: String, default: 'Awaiting Fulfillment' }
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'updatedOn' } })

const SessionSchema = new Schema({
    sessionId: {type: String, unique: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    expiresOn: {type: Date}
}, {timestamps: {createdAt: 'createdOn'}})

OrderSchema.set('toJSON', {
    transform: (document, result) => {
        result.amount = parseFloat(result.amount.toString())
        return result
    }
});

// ProductSchema.set('toJSON', {
//     transform: (document, result) => {
//         result.costPrice = parseFloat(result.costPrice.toString())
//         result.sellingPrice = parseFloat(result.sellingPrice.toString())
//         result.discount = parseFloat(result.discount.toString())
//         return result
//     }
// });

exports.Customer = mongoose.model('Customer', CustomerSchema)
exports.Inventory = mongoose.model('Inventory', InventorySchema)
exports.Order = mongoose.model('Order', OrderSchema)
//exports.Product = mongoose.model('Product', ProductSchema)
exports.Setting = mongoose.model('Setting', SettingSchema)
exports.User = mongoose.model('User', UserSchema)
exports.UserType = mongoose.model('UserType', UserTypeSchema)
exports.Session = mongoose.model('Session', SessionSchema)
