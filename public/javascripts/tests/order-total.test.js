/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const orderTotal = require('../../javascripts/order-total');

describe('Quantity', () => {
  it('should be 6', () => {
    const order = {
      items: [{
        name: 'drasgon',
        price: 2,
        quantity: 3,
      }],
    };

    expect(orderTotal(order)).toBe(6);
  });
});
