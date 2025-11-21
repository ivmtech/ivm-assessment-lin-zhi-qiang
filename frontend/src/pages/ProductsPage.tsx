import React, {useEffect, useState} from 'react';
import api from '../api/client';
import type {Product, PurchaseResponse} from '../api/types';
import ProductCard from '../components/ProductCard';




export default function ProductsPage(){
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});
  const [purchasing, setPurchasing] = useState<{[key: string]: boolean}>({});
  const [balance, setBalance] = useState<number | null>(null);
  const [checkingBalance, setCheckingBalance] = useState(false);

  useEffect(()=>{
    loadProducts();
  },[]);

  // NOTES: No need to edit this function
  async function startMachine(){
    setCheckingBalance(true);
    setMessage('');
    
    try {
      const res = await api.get('/products/balance');
      if (res.data && typeof res.data.balance === 'number') {
        setBalance(res.data.balance);
        setMessage(`✅ Machine started! Your balance: $${res.data.balance.toFixed(2)}`);
      } else {
        setBalance(null);
        setMessage('❌ Failed to get balance. Invalid response from server.');
      }
    } catch (e: any) {
      console.error(e);
      setBalance(null);
      setMessage(`❌ Failed to start machine: ${e.response?.data?.message || 'Request failed'}`);
    } finally {
      setCheckingBalance(false);
    }
  }
  // NOTES: No need to edit this function
  async function loadProducts(){
    setLoading(true);
    setError('');
    const response = await api.get<Product[]>('/products')
      .catch(err => {
        setError(`Failed to load products: ${err.message}`);
      })
      .finally(() => setLoading(false));

    setProducts(response?.data || [])
  }
  async function buyProduct(productId: string){
    const product = products.find(p => p.id === productId);
    if (!product || product.stock === 0) return;

    setPurchasing({...purchasing, [productId]: true});
    setMessage('');

    // [TODO 1]: Check insufficient balance before purchase
    // Get the quantity for this product: const quantity = quantities[productId] || 1
    // Calculate cost: const cost = product.price * quantity
    // Add checking if conditions with proper error messages:
    // 1. balance === null -> return and show error "❌ Please start the machine first"
    // 2. balance < cost -> return and show error "❌ Insufficient funds! You have $X.XX but need $Y.YY"
    // 3. product not found -> return (already handled above)
    // 4. out of stock -> return (already handled above)
    // 5. quantity is 0 or invalid -> return and show error
    // All the failed cases and success purchase cases will be tested

    try {
      // [TODO 1]: Get quantity from state and send it in the request
      // const quantity = quantities[productId] || 1;
      // const res = await api.post<PurchaseResponse>('/products/purchase', { productId, quantity });
      const res = await api.post<PurchaseResponse>('/products/purchase', { productId });
      if (res.data.success) {
        setMessage(`✅ Purchase successful! ${res.data.remaining || 0} items remaining.`);
        // [TODO 1]: After successful purchase:
        // 1. Reload products using loadProducts() to get updated stock
        // 2. Update balance: setBalance(balance - res.data.totalCost) to deduct purchase cost
        // 3. Reset quantity for this product: setQuantities({...quantities, [productId]: 1})
      } else {
        setMessage(`❌ Purchase failed: ${res.data.message || 'Purchase failed'}`);
      }
    } catch (e: any) {
      console.error(e);
      setMessage(`❌ Purchase failed: ${e.response?.data?.message || 'Request failed'}`);
    } finally {
      setPurchasing({...purchasing, [productId]: false});
    }
  }



  function updateQuantity(productId: string, newQty: number) {
    // [TODO 1]: Find Correct Product and Update Quantity
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 pb-12">
      <div className="max-w-7xl mx-auto">
       
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="space-y-2">
            <h2 className="text-5xl leading-[unset] font-black gradient-text mb-3 text-shadow">
              Vending Machine
            </h2>
            <p className="text-gray-600 text-lg flex items-center gap-2">
              <span>🍿</span> Select your products and make a purchase
            </p>
          </div>
          <div className="flex items-center gap-4">
            {balance !== null && (
              <div className="px-6 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl border-2 border-white/50 transform hover:scale-105 transition-transform">
                <div className="flex items-center gap-3">
                  <span className="text-white/90 text-sm font-semibold uppercase tracking-wide">Balance</span>
                  <div className="h-8 w-px bg-white/40"></div>
                  <span className="text-white text-3xl font-black text-shadow-lg">${balance.toFixed(2)}</span>
                </div>
              </div>
            )}
            <button
              onClick={startMachine}
              disabled={checkingBalance}
              className={`btn-primary ${checkingBalance ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              {checkingBalance ? '⏳ Starting...' : balance === null ? '🚀 Start Machine' : '🔒 Load New Balance'}
            </button>
          </div>
        </div>


        {error && (
          <div className="alert-error mb-6">
            <div className="flex items-center">
              <span className="text-xl mr-2">⚠️</span>
              <span>{error}</span>
            </div>
          </div>
        )}

    
        {message && (
          <div className={`mb-6 ${message.includes('✅') ? 'alert-success' : message.includes('❌') ? 'alert-error' : 'alert-info'}`}>
            <span>{message}</span>
          </div>
        )}


        {loading && (
          <div className="flex justify-center items-center py-32">
            <div className="text-center space-y-6">
              <div className="relative">
                <div className="spinner h-20 w-20 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">🛒</span>
                </div>
              </div>
              <p className="text-gray-600 text-xl font-semibold">Loading products...</p>
            </div>
          </div>
        )}


        {!loading && !error && products.length === 0 && (
          <div className="glass-card rounded-3xl shadow-2xl p-16 text-center border-2 border-gray-200">
            <div className="text-8xl mb-6 animate-bounce">📦</div>
            <h3 className="text-3xl font-bold gradient-text mb-3">No Products Available</h3>
            <p className="text-gray-600 text-lg">The backend might not be implemented yet.</p>
          </div>
        )}


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...products, {id: '1', name: 'Not existing product', price: 0, stock: 3}].map(product => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={quantities[product.id] || 1}
              isPurchasing={purchasing[product.id] || false}
              balance={balance}
              onUpdateQuantity={updateQuantity}
              onBuyProduct={buyProduct}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
