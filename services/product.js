const Product = require('../models/product').Product

module.exports = {
    create: async (product) => await new Product(product).save(),
    index: async () => await Product.find().limit(25),
    show: async (id) => await Product.findById(id),
    getMarkup: () =>{
        const markup = Number.parseFloat(process.env.MARKUP)
        const percentageMarkup = markup / 100
        return percentageMarkup
    },
    remove: async (id) => await Product.findByIdAndDelete(id)
}