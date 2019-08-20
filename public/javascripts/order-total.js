// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line max-len
const orderTotal = (order) => order.items.reduce((prev, curr) => curr.price * (curr.quantity || 1) + prev, 0);
module.exports = orderTotal;
