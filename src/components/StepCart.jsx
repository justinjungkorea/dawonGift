// src/components/StepCart.jsx
import { useState } from 'react';
import giftSets from '../data/giftSetList.json';

export default function StepCart({ formData, setFormData, next, prev }) {
  const cartItems = formData.cartItems || [];
  const [showComplete, setShowComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showError, setShowError] = useState(false);

  const updateQuantity = (name, delta) => {
    const updatedCart = cartItems.map((item) => {
      if (item.name === name) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setFormData((prev) => ({ ...prev, cartItems: updatedCart }));
  };

  const removeItem = (name) => {
    const updatedCart = cartItems.filter((item) => item.name !== name);
    setFormData((prev) => ({ ...prev, cartItems: updatedCart }));
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const product = giftSets.find((g) => g.name === item.name);
    const price = product ? parseInt(product.price.replace(/[^\d]/g, ''), 10) : 0;
    return sum + price * item.quantity;
  }, 0);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        orderer: formData.orderer,
        ordererPhone: formData.ordererPhone,
        deliveryMethod: formData.deliveryMethod,
        sender: formData.sender,
        senderPhone: formData.senderPhone,
        recipient: formData.recipient,
        recipientPhone: formData.recipientPhone,
        addressTo: `${formData.addressTo} ${formData.addressToDetail}`.trim(),
        pickup: formData.pickupDate && formData.pickupTime ? `${formData.pickupDate} ${formData.pickupTime}` : '',
        cartItems: cartItems.map((item) => ({ name: item.name, quantity: item.quantity })),
        totalPrice,
        timestamp: new Date().toLocaleString(),
      };

      const res = await fetch('https://script.google.com/macros/s/AKfycbxEQX02Bd-VC38c-x4w0GWusA6SjlHVoW4VDH4KgYCXUDh7MNPNAIs-ntAyN2kJloaV/exec', {
        method: 'POST',
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (result.result === 'success') {
        setShowComplete(true);
      } else {
        setShowError(true);
      }
    } catch (err) {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSMSLink = () => {
    const { deliveryMethod, pickupDate, pickupTime, orderer, ordererPhone, sender, senderPhone, addressTo, recipient, recipientPhone } = formData;
    const date = pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : '';
    const meat = cartItems.map((item) => `${item.name} ${item.quantity}개`).join(', ');
    const price = `${totalPrice.toLocaleString()}원`;
    const etc = formData.memo || '';

    if (deliveryMethod === 'pickup') {
      return `sms:01035610863?body=${encodeURIComponent(
        `선물세트 신청(방문수령)\n\n▶︎ 수령일: ${date}\n▶︎ 이름: ${orderer}\n▶︎ 연락처: ${ordererPhone}\n▶︎ 품목: ${meat}\n▶︎ 금액: ${price}\n▶︎ 비고: ${etc}`
      )}`;
    } else {
      return `sms:01035610863?body=${encodeURIComponent(
        `선물세트 신청(택배)\n\n▶︎ 이름: ${orderer}\n▶︎ 연락처: ${ordererPhone}\n▶︎ 품목: ${meat}\n▶︎ 금액: ${price}\n▶︎ 비고: ${etc}\n\n▶︎ 보내시는분 이름: ${sender}\n▶︎ 보내시는분 번호: ${senderPhone}\n\n▶︎ 받으시는분 이름: ${recipient}\n▶︎ 받으시는분 번호: ${recipientPhone}\n▶︎ 받으시는분 주소: ${addressTo}`
      )}`;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy">장바구니</h2>

      {cartItems.length > 0 ? (
        <div className="space-y-4 bg-white/80 rounded-xl p-4 shadow">
          {cartItems.map((item) => {
            const product = giftSets.find((g) => g.name === item.name);
            return (
              <div
                key={item.name}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-dawonNavy font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-gray-600">{product?.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.name, -1)}
                    className="w-6 h-6 rounded-full bg-gray-200 text-dawonNavy hover:bg-gray-300"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.name, 1)}
                    className="w-6 h-6 rounded-full bg-gray-200 text-dawonNavy hover:bg-gray-300"
                  >
                    ＋
                  </button>
                  <button
                    onClick={() => removeItem(item.name)}
                    className="text-xs text-red-500 hover:underline"
                  >
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
          <div className="pt-2 text-right text-dawonNavy font-bold">
            총 합계: {totalPrice.toLocaleString()}원
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">장바구니가 비어 있습니다.</p>
      )}

      <div className="flex justify-between pt-4">
        <button
          onClick={prev}
          className="px-4 py-2 text-sm text-dawonNavy border border-dawonNavy rounded-lg bg-white/70 hover:bg-dawonNavy hover:text-white transition"
        >
          ← 이전
        </button>
        <button
          onClick={handleSubmit}
          disabled={cartItems.length === 0 || isSubmitting}
          className="px-4 py-2 text-sm text-white bg-dawonNavy rounded-lg hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '주문 중...' : '주문'}
        </button>
      </div>

      {showComplete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl text-center">
            <h3 className="text-lg font-bold mb-4 text-dawonNavy">주문이 완료되었습니다.</h3>
            <button
              onClick={() => {
                setShowComplete(false);
                setFormData({});
                prev(); prev(); prev(); prev();
              }}
              className="mt-2 px-4 py-2 rounded bg-dawonNavy text-white hover:bg-blue-950 text-sm"
            >
              확인
            </button>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl text-center">
            <h3 className="text-lg font-bold mb-4 text-red-600">오류가 발생하였습니다.</h3>
            <div className="flex flex-col gap-2">
              <a
                href={generateSMSLink()}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm"
              >
                문자로 주문하기
              </a>
              <button
                onClick={() => {
                  setShowError(false);
                  setFormData({});
                  prev(); prev(); prev(); prev();
                }}
                className="text-sm text-gray-500 underline"
              >
                홈으로 돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
