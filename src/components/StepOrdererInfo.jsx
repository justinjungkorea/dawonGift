import { useState } from 'react';
import { formatPhone, isPhoneValid } from '@/utils';

export default function StepOrdererInfo({ formData, setFormData, next }) {
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = name.includes('Phone') ? formatPhone(value) : value;
    const updatedForm = { ...formData, [name]: updatedValue };
    setFormData(updatedForm);
    setIsValid(
      updatedForm.orderer?.trim() && isPhoneValid(updatedForm.ordererPhone || '')
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy border-b pb-2">신청인 정보</h2>
      <div className="space-y-6 bg-white/70 rounded-xl p-4 shadow">
        <div>
          <label className="block text-sm text-dawonNavy mb-1">신청인 이름</label>
          <input
            type="text"
            name="orderer"
            placeholder="홍길동"
            value={formData.orderer || ''}
            onChange={handleChange}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="tel"
            inputMode="numeric"
            name="ordererPhone"
            maxLength={13}
            placeholder="010-1234-5678 또는 02-123-4567"
            value={formData.ordererPhone || ''}
            onChange={handleChange}
            className="mt-2 w-full p-3 rounded-md border border-gray-300"
          />
        </div>
        <div className="flex justify-end pt-4">
          <button
            onClick={next}
            disabled={!isValid}
            className="px-5 py-2 bg-dawonNavy text-white rounded-lg hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      </div>
      <p className="text-sm font-bold text-center text-dawonNavy">단체문의는 전화문의 부탁드립니다.</p>
    </div>
  );
}
