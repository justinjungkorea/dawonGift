import { useState, useEffect } from 'react';
import { formatPhone, isPhoneValid } from '@/utils';

export default function StepDeliveryInfo({ formData, setFormData, next, prev }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [sameAsOrderer, setSameAsOrderer] = useState(false);
  const [sameRecipientInfo, setSameRecipientInfo] = useState(false);

  useEffect(() => {
    if (sameAsOrderer) {
      setFormData((prev) => ({
        ...prev,
        sender: prev.orderer,
        senderPhone: prev.ordererPhone,
      }));
    }
  }, [sameAsOrderer, setFormData]);

  useEffect(() => {
    if (sameRecipientInfo) {
      setFormData((prev) => ({
        ...prev,
        recipient: prev.sender,
        recipientPhone: prev.senderPhone,
      }));
    }
  }, [sameRecipientInfo, setFormData]);

  const openPostcodePopup = (field) => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setFormData((prev) => ({ ...prev, [field]: fullAddress }));
      },
    }).open();
  };

  const handlePhoneInput = (e, field) => {
    const onlyDigits = e.target.value.replace(/[^\d]/g, '');
    const formatted = formatPhone(onlyDigits);
    setFormData((prev) => ({ ...prev, [field]: formatted }));
  };

  const isValid =
    formData.sender?.trim() &&
    isPhoneValid(formData.senderPhone || '') &&
    formData.recipient?.trim() &&
    isPhoneValid(formData.recipientPhone || '') &&
    formData.addressTo?.trim() &&
    formData.addressToDetail?.trim();

  const handleNext = () => {
    if (isValid) setShowConfirm(true);
  };

  const confirmNext = () => {
    setShowConfirm(false);
    next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy border-b pb-2">주소 입력</h2>
      <div className="space-y-6 bg-white/70 rounded-xl p-4 shadow">
        <div>
          <label className="block text-sm text-dawonNavy mb-1">보내는 사람 이름</label>
          <div className="flex items-center mb-2">
            <input
              id="sameAsOrderer"
              type="checkbox"
              checked={sameAsOrderer}
              onChange={(e) => setSameAsOrderer(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="sameAsOrderer" className="text-sm text-gray-700">
              신청인 정보와 동일
            </label>
          </div>
          <input
            type="text"
            placeholder="홍길동"
            value={formData.sender}
            onChange={(e) => setFormData((f) => ({ ...f, sender: e.target.value }))}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="tel"
            inputMode="numeric"
            maxLength={13}
            value={formData.senderPhone || ''}
            onChange={(e) => handlePhoneInput(e, 'senderPhone')}
            className="mt-2 w-full p-3 rounded-md border border-gray-300"
            placeholder="010-1234-5678 또는 02-123-4567"
          />
        </div>

        <div>
          <label className="block text-sm text-dawonNavy mb-1">받는 사람 이름</label>
          <div className="flex items-center mb-2">
            <input
              id="sameRecipientInfo"
              type="checkbox"
              checked={sameRecipientInfo}
              onChange={(e) => setSameRecipientInfo(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="sameRecipientInfo" className="text-sm text-gray-700">
              보내는 사람과 동일
            </label>
          </div>
          <input
            type="text"
            placeholder="김수신"
            value={formData.recipient}
            onChange={(e) => setFormData((f) => ({ ...f, recipient: e.target.value }))}
            className="w-full p-3 rounded-md border border-gray-300"
          />
          <input
            type="tel"
            inputMode="numeric"
            maxLength={13}
            value={formData.recipientPhone || ''}
            onChange={(e) => handlePhoneInput(e, 'recipientPhone')}
            className="mt-2 w-full p-3 rounded-md border border-gray-300"
            placeholder="010-5678-1234 또는 031-234-5678"
          />
        </div>

        <div>
          <label className="block text-sm text-dawonNavy mb-1">받는 주소</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              placeholder="오른쪽 검색 버튼을 눌러주세요"
              value={formData.addressTo}
              className="flex-1 p-3 rounded-md border border-gray-300"
            />
            <button
              type="button"
              onClick={() => openPostcodePopup('addressTo')}
              className="px-3 py-2 text-sm text-white bg-dawonNavy rounded-lg hover:bg-blue-950"
            >
              검색
            </button>
          </div>
          {formData.addressTo && (
            <input
              type="text"
              placeholder="상세주소 (예: 앞동 101호)"
              value={formData.addressToDetail}
              onChange={(e) => setFormData((f) => ({ ...f, addressToDetail: e.target.value }))}
              className="mt-2 w-full p-3 rounded-md border border-gray-300"
            />
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={prev}
            className="px-5 py-2 bg-white/70 text-dawonNavy border border-dawonNavy rounded-lg hover:bg-dawonNavy hover:text-white"
          >
            ← 이전
          </button>
          <button
            onClick={handleNext}
            disabled={!isValid}
            className="px-5 py-2 bg-dawonNavy text-white rounded-lg hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-4 text-dawonNavy">입력하신 내용으로 진행할까요?</h3>
            <ul className="text-sm space-y-1 mb-4">
              <li><b>보내는 사람:</b> {formData.sender} ({formData.senderPhone})</li>
              <li><b>받는 사람:</b> {formData.recipient} ({formData.recipientPhone})</li>
              <li><b>받는 주소:</b> {formData.addressTo} {formData.addressToDetail}</li>
            </ul>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm"
              >
                취소
              </button>
              <button
                onClick={confirmNext}
                className="px-4 py-2 rounded bg-dawonNavy text-white hover:bg-blue-950 text-sm"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
