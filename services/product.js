const { Product } = require('../models/product');

module.exports = {
  create: async (product) => new Product(product).save(),
  index: async () => Product.find().limit(25).sort('title'),
  show: async (id) => Product.findById(id),
  getMarkup: () => {
    const markup = Number.parseFloat(process.env.MARKUP);
    const percentageMarkup = markup / 100;
    return percentageMarkup;
  },
  remove: async (id) => Product.findByIdAndDelete(id),
};
