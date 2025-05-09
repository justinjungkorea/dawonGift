export const formatPhone = (value) => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('02')) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    if (digits.length <= 9) return `${digits.slice(0, 2)}-${digits.slice(2, 5)}-${digits.slice(5)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  } else {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    if (digits.length <= 10) {
      const mid = digits.length - 4;
      return `${digits.slice(0, 3)}-${digits.slice(3, mid)}-${digits.slice(mid)}`;
    }
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }
};

export const isPhoneValid = (number) => {
  return /^01[016789]-\d{4}-\d{4}$/.test(number) || /^0\d{1,2}-\d{3,4}-\d{4}$/.test(number);
};
