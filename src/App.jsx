import { useState } from 'react';
import StepOrdererInfo from './components/StepOrdererInfo';
import StepSelectMethod from './components/StepSelectMethod';
import StepVisitDatetime from './components/StepVisitDatetime';
import StepSelectGiftSet from './components/StepSelectGiftSet';
import StepDeliveryInfo from './components/StepDeliveryInfo';

export default function App() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    orderer: '',
    ordererPhone: '',
    deliveryMethod: '',
    sender: '',
    senderPhone: '',
    recipient: '',
    recipientPhone: '',
    addressFrom: '',
    addressTo: '',
    addressFromDetail: '',
    addressToDetail: '',
    pickupDate: '',
    pickupTime: '',
    giftSet: '',
  });

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepOrdererInfo formData={formData} setFormData={setFormData} next={next} />;
      case 1:
        return <StepSelectMethod formData={formData} setFormData={setFormData} next={next} />;
      case 2:
        if (formData.deliveryMethod === '방문 수령') {
          return <StepVisitDatetime formData={formData} setFormData={setFormData} next={next} prev={prev} />;
        }
        return <StepDeliveryInfo formData={formData} setFormData={setFormData} next={next} prev={prev} />;
      case 3:
        return <StepSelectGiftSet formData={formData} setFormData={setFormData} next={next} prev={prev} />;
      default:
        return <div className="text-center text-dawonNavy">아직 준비 중인 단계입니다.</div>;
    }
  };

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center font-sans text-gray-800 px-4 py-8"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <header className="mb-8 text-center">
        <img src="/logo.png" alt="다원축산 로고" className="w-24 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-dawonNavy">다원축산 선물세트</h1>
      </header>
      <main className="max-w-md mx-auto space-y-6">{renderStep()}</main>
    </div>
  );
}
