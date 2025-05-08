export default function StepSelectMethod({ formData, setFormData, next }) {
  const handleSelect = (method) => {
    setFormData((prev) => ({ ...prev, deliveryMethod: method }));
    next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy">수령 방법을 선택하세요</h2>
      <div className="flex flex-col gap-4">
        {['택배', '방문 수령'].map((method) => (
          <button
            key={method}
            onClick={() => handleSelect(method)}
            className="w-full p-4 border-2 border-dawonNavy text-dawonNavy text-lg font-medium rounded-lg bg-white/70 hover:bg-dawonNavy hover:text-white transition"
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
}
