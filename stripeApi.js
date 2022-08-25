const stripe = require('stripe')('sk_test_51LafUjBMGCeUikoeiu3ejcQU1v3adPBMehfVC9Z6jquU6U4Hxowzkykkw8spn72R9rlriRrrzrXZxegRWKJg5COG003uQZc4cJ');

const createCustomer = async (email) => {
  try {
    const customer = await stripe.customers.create({
      email: email,
    })
    console.log(customer.id);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createCustomer,
};
