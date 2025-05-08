// src/components/StepSelectGiftSet.jsx
import giftSets from '../data/giftSetList.json';

export default function StepSelectGiftSet({ formData, setFormData, next, prev }) {
  const handleSelect = (giftSet) => {
    setFormData((prev) => ({ ...prev, giftSet }));
    next();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy">세트를 선택해주세요</h2>
      <div className="grid grid-cols-2 gap-4">
        {giftSets.map((set) => {
          const isSelected = formData.giftSet === set.name;
          return (
            <button
              key={set.id}
              onClick={() => handleSelect(set.name)}
              className={`text-left border-2 rounded-xl overflow-hidden shadow transition flex flex-col ${
                isSelected
                  ? 'border-dawonNavy bg-dawonNavy text-white'
                  : 'border-dawonNavy bg-white/70 hover:shadow-md'
              }`}
            >
              <img src={set.image} alt={set.name} className="w-full aspect-[4/3] object-contain bg-white" />
              <div className="p-2">
                <h3 className={`font-bold text-sm mb-1 ${isSelected ? 'text-white' : 'text-dawonNavy'}`}>{set.name}</h3>
                <p className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-700'}`}>{set.description}</p>
              </div>
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
      </div>
    </div>
  );
}
