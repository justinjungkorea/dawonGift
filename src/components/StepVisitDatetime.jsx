// src/components/StepVisitDatetime.jsx
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

export default function StepVisitDatetime({ formData, setFormData, next, prev }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isBusinessDay = (date) => {
    const day = date.getDay();
    const isFutureOrToday = date >= today;
    return isFutureOrToday && day >= 1 && day <= 6; // 월~토 + 오늘 또는 미래만 허용
  };

  const generateTimeSlots = (selectedDate) => {
    const slots = [];
    const openingHour = 8;
    const closingHour = 18;
    const now = new Date();
    const selected = new Date(selectedDate);
    const isToday = now.toDateString() === selected.toDateString();

    for (let hour = openingHour; hour <= closingHour; hour++) {
      if (isToday && hour <= now.getHours() + 3) continue;
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-center text-dawonNavy">수령일시 선택</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-dawonNavy mb-1">수령 날짜</label>
          <DatePicker
            selected={formData.pickupDate ? new Date(formData.pickupDate) : null}
            onChange={(date) => {
              if (isBusinessDay(date)) {
                const localDate = date.toLocaleDateString('sv-SE');
                setFormData((f) => ({ ...f, pickupDate: localDate, pickupTime: '' }));
              }
            }}
            filterDate={isBusinessDay}
            locale={ko}
            placeholderText="날짜를 선택하세요"
            className="w-full p-3 rounded-md border border-gray-300 bg-white/70"
            dateFormat="yyyy-MM-dd"
            dayClassName={(date) => {
              const isAvailable = isBusinessDay(date);
              const isSelected = formData.pickupDate && new Date(formData.pickupDate).toDateString() === date.toDateString();
              return `${
                isAvailable ? 'text-gray-900' : 'text-gray-400 line-through cursor-not-allowed'
              } ${isSelected ? 'bg-dawonNavy text-white font-bold rounded-full' : ''}`;
            }}
          />
        </div>

        {formData.pickupDate && (
          <div>
            <label className="block text-sm text-dawonNavy mb-1">수령 시간</label>
            <div className="grid grid-cols-3 gap-2">
              {generateTimeSlots(formData.pickupDate).map((time) => (
                <button
                  key={time}
                  onClick={() =>
                    setFormData((f) => ({
                      ...f,
                      pickupTime: f.pickupTime === time ? '' : time,
                    }))
                  }
                  className={`p-2 rounded-md border text-sm transition ${
                    formData.pickupTime === time
                      ? 'bg-dawonNavy text-white font-semibold'
                      : 'bg-white/70 text-dawonNavy hover:bg-dawonNavy hover:text-white'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between pt-4">
          <button
            onClick={prev}
            className="px-4 py-2 text-sm text-dawonNavy border border-dawonNavy rounded-lg bg-white/70 hover:bg-dawonNavy hover:text-white transition"
          >
            ← 이전
          </button>
          <button
            onClick={next}
            disabled={!formData.pickupDate || !formData.pickupTime}
            className="px-5 py-2 bg-dawonNavy text-white rounded-lg hover:bg-blue-950 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
