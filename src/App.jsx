import { useState } from 'react';
import StepOrdererInfo from './components/StepOrdererInfo';
import StepSelectMethod from './components/StepSelectMethod';
import StepVisitDatetime from './components/StepVisitDatetime';
import StepSelectGiftSet from './components/StepSelectGiftSet';
import StepDeliveryInfo from './components/StepDeliveryInfo';
import StepCart from './components/StepCart';

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

  const PhoneButton = () => (
    <a
      href="tel:0426355911"
      className="fixed bottom-4 right-4 z-50 bg-dawonNavy text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-950 text-sm"
    >
      ☎ 전화문의
    </a>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return <StepOrdererInfo formData={formData} setFormData={setFormData} next={next} />;
      case 1:
        return <StepSelectMethod formData={formData} setFormData={setFormData} next={next} />;
      case 2:
        if (formData.deliveryMethod === 'pickup') {
          return <StepVisitDatetime formData={formData} setFormData={setFormData} next={next} prev={prev} />;
        }
        return <StepDeliveryInfo formData={formData} setFormData={setFormData} next={next} prev={prev} />;
      case 3:
        return <StepSelectGiftSet formData={formData} setFormData={setFormData} next={next} prev={prev} />;
      case 4:
        return <StepCart formData={formData} setFormData={setFormData} next={next} prev={prev} />;
      default:
        return <div className="text-center text-dawonNavy">아직 준비 중인 단계입니다.</div>;
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-fixed bg-cover bg-center font-sans text-gray-800"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <header className="mb-8 text-center">
        <img src="/logo.png" alt="다원축산 로고" className="w-24 mx-auto mb-2" />
        <h1 className="text-2xl font-bold text-dawonNavy">다원축산 선물세트</h1>
      </header>
      <main className="relative flex-1 overflow-y-auto px-4 py-8 w-full max-w-md mx-auto pb-24">{renderStep()}</main>
      <PhoneButton />
    </div>
  );
}
