// Checkout.js
import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedUpi, setSelectedUpi] = useState('');
  const [details, setDetails] = useState({});
  const [isPaying, setIsPaying] = useState(false);

  const upiApps = ['Google Pay', 'PhonePe', 'Paytm'];
  const paymentMethods = ['UPI', 'Net Banking', 'Card', 'Wallet'];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  const handleNext = () => {
    if (!selectedMethod) return alert('Select a payment method');
    setStep(selectedMethod === 'UPI' ? 2 : 3);
  };

  const handlePay = () => {
    if (selectedMethod === 'UPI') {
      if (!selectedUpi) return alert('Select a UPI app');
      if (!details.upiId) return alert('Enter UPI ID');
    } else if (selectedMethod === 'Net Banking') {
      if (!details.account || !details.password) return alert('Enter account details');
    } else if (selectedMethod === 'Card') {
      if (!details.cardNumber || !details.cvv || !details.expiry) return alert('Enter card details');
    } else if (selectedMethod === 'Wallet') {
      if (!details.walletId) return alert('Enter wallet ID');
    }

    setIsPaying(true);
    setTimeout(() => {
      clearCart();
      alert(`Payment Successful via ${selectedMethod}`);
      setStep(1);
      setSelectedMethod('');
      setSelectedUpi('');
      setDetails({});
      setIsPaying(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto', textAlign: 'center' }}>
      <h1>Checkout</h1>
      <p>Total Amount: <b>₹{total}</b></p>

      {step === 1 && (
        <>
          <h3>Select Payment Method</h3>
          {paymentMethods.map((method) => (
            <div key={method}>
              <input
                type="radio"
                id={method}
                name="payment"
                onChange={() => setSelectedMethod(method)}
              />
              <label htmlFor={method} style={{ marginLeft: 8 }}>{method}</label>
            </div>
          ))}
          <button
            onClick={handleNext}
            style={{ marginTop: 20, padding: '10px 20px', background: '#00c853', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            Next
          </button>
        </>
      )}

      {step === 2 && selectedMethod === 'UPI' && (
        <>
          <h3>Select UPI App</h3>
          {upiApps.map((app) => (
            <div key={app}>
              <input
                type="radio"
                id={app}
                name="upiApp"
                onChange={() => setSelectedUpi(app)}
              />
              <label htmlFor={app} style={{ marginLeft: 8 }}>{app}</label>
            </div>
          ))}
          <input
            type="text"
            name="upiId"
            placeholder="Enter UPI ID"
            value={details.upiId || ''}
            onChange={handleChange}
            style={{ padding: 8, width: '80%', marginTop: 10 }}
          />
          <div>
            <button
              onClick={handlePay}
              disabled={isPaying}
              style={{ marginTop: 20, padding: '10px 20px', background: '#00c853', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
            >
              {isPaying ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </>
      )}

      {step === 3 && selectedMethod !== 'UPI' && (
        <>
          <h3>{selectedMethod} Details</h3>
          {selectedMethod === 'Net Banking' && (
            <>
              <input type="text" name="account" placeholder="Account Number" value={details.account || ''} onChange={handleChange} style={{ padding: 8, width: '80%', margin: '10px 0' }} />
              <input type="password" name="password" placeholder="Password" value={details.password || ''} onChange={handleChange} style={{ padding: 8, width: '80%', margin: '10px 0' }} />
            </>
          )}
          {selectedMethod === 'Card' && (
            <>
              <input type="text" name="cardNumber" placeholder="Card Number" value={details.cardNumber || ''} onChange={handleChange} style={{ padding: 8, width: '80%', margin: '10px 0' }} />
              <input type="text" name="expiry" placeholder="Expiry MM/YY" value={details.expiry || ''} onChange={handleChange} style={{ padding: 8, width: '80%', margin: '10px 0' }} />
              <input type="password" name="cvv" placeholder="CVV" value={details.cvv || ''} onChange={handleChange} style={{ padding: 8, width: '80%', margin: '10px 0' }} />
            </>
          )}
          {selectedMethod === 'Wallet' && (
            <input type="text" name="walletId" placeholder="Wallet ID" value={details.walletId || ''} onChange={handleChange} style={{ padding: 8, width: '80%', margin: '10px 0' }} />
          )}

          <button
            onClick={handlePay}
            disabled={isPaying}
            style={{ marginTop: 20, padding: '10px 20px', background: '#00c853', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}
          >
            {isPaying ? 'Processing...' : 'Pay Now'}
          </button>
        </>
      )}
    </div>
  );
};

export default Checkout;
