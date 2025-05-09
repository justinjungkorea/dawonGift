// src/components/StepSelectGiftSet.jsx
import { useState } from 'react';
import giftSets from '../data/giftSetList.json';
import { ShoppingCart } from 'lucide-react';

export default function StepSelectGiftSet({ formData, setFormData, next, prev }) {
  const [added, setAdded] = useState(null);

  const handleAddToCart = (giftSet) => {
    setFormData((prev) => {
      const updatedCart = [...(prev.cartItems || [])];
      const existing = updatedCart.find((item) => item.name === giftSet);

      if (existing) {
        existing.quantity += 1;
      } else {
        updatedCart.push({ name: giftSet, quantity: 1 });
      }

      return { ...prev, cartItems: updatedCart };
    });

    setAdded(giftSet);
    setTimeout(() => setAdded(null), 1000);
  };

  const handleGoToCart = () => {
    next();
  };

  const cartCount = (formData.cartItems || []).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy">세트를 선택해주세요</h2>

      <div className="absolute top-0 right-0 flex items-center">
        <button
          onClick={handleGoToCart}
          className="relative text-dawonNavy hover:text-blue-900"
          aria-label="장바구니로 이동"
        >
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-white font-bold">{cartCount}</span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {giftSets.map((set) => {
          const isSelected = (formData.cartItems || []).some((item) => item.name === set.name);
          const isJustAdded = added === set.name;

          return (
            <button
              key={set.id}
              onClick={() => handleAddToCart(set.name)}
              className={`relative text-left border-2 rounded-xl overflow-hidden shadow transition flex flex-col ${
                isSelected ? 'border-dawonNavy bg-dawonNavy text-white' : 'border-dawonNavy bg-white/70 hover:shadow-md'
              } ${isJustAdded ? 'ring-2 ring-offset-2 ring-dawonNavy' : ''}`}
            >
              <img src={set.image} alt={set.name} className="w-full aspect-[4/3] object-contain bg-white" />
              <div className="p-2">
                <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-dawonNavy'}`}>{set.name}</h3>
                <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-700'}`}>{set.description}</p>
                <p className={`text-sm font-semibold mt-1 ${isSelected ? 'text-white' : 'text-dawonNavy'}`}>{set.price}</p>
              </div>
              {isJustAdded && (
                <span className="absolute top-2 right-2 text-xs bg-white text-dawonNavy px-2 py-0.5 rounded shadow">
                  추가됨
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={prev}
          className="px-4 py-2 text-sm text-dawonNavy border border-dawonNavy rounded-lg bg-white/70 hover:bg-dawonNavy hover:text-white transition"
        >
          ← 이전
        </button>
        <button
          onClick={handleGoToCart}
          className="px-4 py-2 text-sm text-white bg-dawonNavy rounded-lg hover:bg-blue-950 transition"
        >
          다음
        </button>
      </div>
    </div>
  );
}
