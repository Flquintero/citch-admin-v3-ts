// import shoppingCart from './shopping-cart';
import paymentSettings from './payment-settings';

/**
 * TODO: If all modules match the api domains then we can dynamically import/export in the future
 * but for now lets just import them all
 */
export default ($apiRequest:any) => ({
  // shoppingCart: shoppingCart('/ShoppingCarts', $apiRequest),
  // paymentSettings: paymentSettings('/PaymentSettings', $apiRequest),
  // brand: brand('/Brand', $apiRequest),
  // accountRegistration: accountRegistration('/account-registration', $apiRequest),
});
