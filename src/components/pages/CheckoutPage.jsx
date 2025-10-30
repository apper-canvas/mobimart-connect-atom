import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';

const CheckoutPage = () => {
const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  
const orderData = location.state || {};
  const { cartItems = [], subtotal = 0, shipping = 0, discount = 0, total = 0, appliedOffer = null } = orderData;

  // Credit card form state
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  const [cardErrors, setCardErrors] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  // Validate card number using Luhn algorithm
  const validateCardNumber = (number) => {
    const digits = number.replace(/\s+/g, '');
    if (digits.length < 13 || digits.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  };

  // Validate expiry date
  const validateExpiryDate = (date) => {
    if (!date || date.length !== 5) return false;
    const [month, year] = date.split('/');
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt('20' + year, 10);
    
    if (monthNum < 1 || monthNum > 12) return false;
    
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    
    if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
      return false;
    }
    return true;
  };

  // Handle card detail changes
  const handleCardChange = (field, value) => {
    let formattedValue = value;
    let error = '';

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
      if (formattedValue.replace(/\s+/g, '').length > 0 && !validateCardNumber(formattedValue)) {
        error = 'Invalid card number';
      }
    } else if (field === 'expiryDate') {
      formattedValue = formatExpiryDate(value);
      if (formattedValue.length === 5 && !validateExpiryDate(formattedValue)) {
        error = 'Invalid or expired date';
      }
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 4);
      if (formattedValue.length > 0 && formattedValue.length < 3) {
        error = 'CVV must be 3-4 digits';
      }
    } else if (field === 'cardholderName') {
      if (value.length > 0 && !/^[a-zA-Z\s]*$/.test(value)) {
        error = 'Only letters and spaces allowed';
      }
    }

    setCardDetails(prev => ({ ...prev, [field]: formattedValue }));
    setCardErrors(prev => ({ ...prev, [field]: error }));
  };

  // Hooks must be called before any conditional returns
  const [shippingForm, setShippingForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('');

  // Redirect to cart if no order data
  if (!cartItems || cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    // Validate form
    const requiredFields = ['name', 'email', 'phone', 'address', 'city', 'state', 'zipcode'];
    const missingFields = requiredFields.filter(field => !shippingForm[field].trim());
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all shipping details');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    // Place order
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/cart')}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ApperIcon name="ArrowLeft" size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p className="text-white/90">Complete your order</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.Id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping > 0 ? `$${shipping.toFixed(2)}` : 'FREE'}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gray-900">
                    <span>Discount</span>
                    <span className="text-success font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
<div className="bg-white rounded-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    name="name"
                    value={shippingForm.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={shippingForm.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={shippingForm.phone}
                    onChange={handleInputChange}
                    placeholder="+1 234 567 8900"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <Input
                    name="address"
                    value={shippingForm.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apt 4B"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <Input
                    name="city"
                    value={shippingForm.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <Input
                    name="state"
                    value={shippingForm.state}
                    onChange={handleInputChange}
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <Input
                    name="zipcode"
                    value={shippingForm.zipcode}
                    onChange={handleInputChange}
                    placeholder="10001"
                    required
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full"
                  onClick={() => {
                    if (!shippingForm.name || !shippingForm.email || !shippingForm.phone || 
                        !shippingForm.address || !shippingForm.city || !shippingForm.state || 
                        !shippingForm.zipcode) {
                      toast.error('Please fill in all required fields');
                      return;
                    }
                    toast.success('Shipping address saved successfully');
                  }}
                >
                  <ApperIcon name="Save" size={18} />
                  Save Address
                </Button>
              </div>
            </div>
          </div>

          {/* Payment & Actions */}
          <div>
            <div className="bg-white rounded-lg border border-gray-100 p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              
<div className="space-y-3 mb-6">
<button
                  type="button"
                  onClick={() => setPaymentMethod('creditCard')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all cursor-pointer ${
                    paymentMethod === 'creditCard'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon name="CreditCard" size={24} className={paymentMethod === 'creditCard' ? 'text-primary' : 'text-gray-600'} />
                    <div>
                      <p className="font-semibold text-gray-900">Credit Card</p>
                      <p className="text-sm text-gray-600">Visa, Mastercard, Amex</p>
                    </div>
                  </div>
                </button>

                {/* Credit Card Details Form */}
                {paymentMethod === 'creditCard' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">Card Details</h3>
                    <div className="space-y-4">
                      {/* Card Number */}
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => handleCardChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className={`w-full ${cardErrors.cardNumber ? 'border-red-500' : ''}`}
                        />
                        {cardErrors.cardNumber && (
                          <p className="text-xs text-red-500 mt-1">{cardErrors.cardNumber}</p>
                        )}
                      </div>

                      {/* Cardholder Name */}
                      <div>
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name
                        </label>
                        <Input
                          id="cardholderName"
                          type="text"
                          value={cardDetails.cardholderName}
                          onChange={(e) => handleCardChange('cardholderName', e.target.value)}
                          placeholder="John Doe"
                          className={`w-full ${cardErrors.cardholderName ? 'border-red-500' : ''}`}
                        />
                        {cardErrors.cardholderName && (
                          <p className="text-xs text-red-500 mt-1">{cardErrors.cardholderName}</p>
                        )}
                      </div>

                      {/* Expiry Date and CVV */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <Input
                            id="expiryDate"
                            type="text"
                            value={cardDetails.expiryDate}
                            onChange={(e) => handleCardChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className={`w-full ${cardErrors.expiryDate ? 'border-red-500' : ''}`}
                          />
                          {cardErrors.expiryDate && (
                            <p className="text-xs text-red-500 mt-1">{cardErrors.expiryDate}</p>
                          )}
                        </div>

                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <Input
                            id="cvv"
                            type="password"
                            value={cardDetails.cvv}
                            onChange={(e) => handleCardChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className={`w-full ${cardErrors.cvv ? 'border-red-500' : ''}`}
                          />
                          {cardErrors.cvv && (
                            <p className="text-xs text-red-500 mt-1">{cardErrors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setPaymentMethod('debitCard')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all cursor-pointer ${
                    paymentMethod === 'debitCard'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon name="CreditCard" size={24} className={paymentMethod === 'debitCard' ? 'text-primary' : 'text-gray-600'} />
                    <div>
                      <p className="font-semibold text-gray-900">Debit Card</p>
                      <p className="text-sm text-gray-600">All major banks</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all cursor-pointer ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Smartphone" size={24} className={paymentMethod === 'upi' ? 'text-primary' : 'text-gray-600'} />
                    <div>
                      <p className="font-semibold text-gray-900">UPI</p>
                      <p className="text-sm text-gray-600">Google Pay, PhonePe, Paytm</p>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`w-full p-4 border-2 rounded-lg text-left transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Banknote" size={24} className={paymentMethod === 'cod' ? 'text-primary' : 'text-gray-600'} />
                    <div>
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-600">Pay when you receive</p>
                    </div>
                  </div>
                </button>
              </div>

              <Button
                onClick={handlePlaceOrder}
                variant="primary"
                size="lg"
                className="w-full mb-3"
              >
                <ApperIcon name="Check" size={20} className="mr-2" />
                Place Order
              </Button>

              <Button
                onClick={() => navigate('/cart')}
                variant="ghost"
                size="md"
                className="w-full"
              >
                <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
                Back to Cart
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Shield" size={18} className="text-success" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Truck" size={18} className="text-info" />
                    <span>Free Shipping over $100</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ApperIcon name="RefreshCw" size={18} className="text-warning" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;