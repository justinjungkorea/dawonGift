export default function StepDeliveryInfo({ formData, setFormData, next, prev }) {
  const openPostcodePopup = (field) => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const fullAddress = data.address;
        setFormData((prev) => ({ ...prev, [field]: fullAddress }));
      },
    }).open();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy">주소 입력</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-dawonNavy mb-1">보내는 사람 이름</label>
          <input
            type="text"
            placeholder="홍길동"
            value={formData.sender}
            onChange={(e) => setFormData((f) => ({ ...f, sender: e.target.value }))}
            className="w-full p-3 rounded-md border border-gray-300 bg-white/70"
          />
        </div>

        <div>
          <label className="block text-sm text-dawonNavy mb-1">보내는 주소</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              placeholder="오른쪽 검색 버튼을 눌러주세요"
              value={formData.addressFrom}
              className="flex-1 p-3 rounded-md border border-gray-300 bg-white/70"
            />
            <button
              type="button"
              onClick={() => openPostcodePopup('addressFrom')}
              className="px-3 py-2 text-sm text-white bg-dawonNavy rounded-lg hover:bg-blue-950"
            >
              검색
            </button>
          </div>
          {formData.addressFrom && (
            <input
              type="text"
              placeholder="상세주소 (예: 301호)"
              value={formData.addressFromDetail}
              onChange={(e) => setFormData((f) => ({ ...f, addressFromDetail: e.target.value }))}
              className="mt-2 w-full p-3 rounded-md border border-gray-300 bg-white/70"
            />
          )}
        </div>

        <div>
          <label className="block text-sm text-dawonNavy mb-1">받는 사람 이름</label>
          <input
            type="text"
            placeholder="김수신"
            value={formData.recipient}
            onChange={(e) => setFormData((f) => ({ ...f, recipient: e.target.value }))}
            className="w-full p-3 rounded-md border border-gray-300 bg-white/70"
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
              className="flex-1 p-3 rounded-md border border-gray-300 bg-white/70"
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
              className="mt-2 w-full p-3 rounded-md border border-gray-300 bg-white/70"
            />
          )}
        </div>

        <div className="flex justify-between pt-4">
          <button
            onClick={prev}
            className="px-4 py-2 text-sm text-dawonNavy underline"
          >
            ← 이전
          </button>
          <button
            onClick={next}
            className="px-5 py-2 bg-dawonNavy text-white rounded-lg hover:bg-blue-950"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
