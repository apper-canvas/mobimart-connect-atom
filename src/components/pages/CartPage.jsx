import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/molecules/CartItem";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();

  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary via-secondary to-accent text-white">
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ApperIcon name="ArrowLeft" size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <p className="text-white/90">{cartItems.length} items</p>
            </div>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <Empty
            message="Your cart is empty"
            description="Add some products to your cart to get started"
            actionLabel="Browse Products"
            actionPath="/"
          />
        </div>
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Cart Items ({cartItems.length})
                </h2>
                {cartItems.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-error"
                  >
                    <ApperIcon name="Trash2" size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                )}
              </div>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.Id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-lg border border-gray-100 p-6 sticky top-4">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium">
                      {shipping > 0 ? `$${shipping.toFixed(2)}` : "FREE"}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  size="lg"
                  className="w-full mb-3"
                >
                  <ApperIcon name="CreditCard" size={20} className="mr-2" />
                  Proceed to Checkout
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  variant="ghost"
                  size="md"
                  className="w-full"
                >
                  <ApperIcon name="ArrowLeft" size={18} className="mr-2" />
                  Continue Shopping
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
      )}
    </div>
  );
};

export default CartPage;