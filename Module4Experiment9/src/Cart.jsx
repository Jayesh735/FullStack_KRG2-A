// Cart.js
import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div style={{ maxWidth: '900px', margin: '3rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#555' }}>
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item, index) => (
              <li
                key={`${item.id}-${item.size}-${item.color}-${index}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#fff',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                  borderRadius: 12,
                  padding: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      objectFit: 'cover',
                      marginRight: 15,
                    }}
                  />
                  <div>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <p style={{ margin: '5px 0', color: '#555' }}>
                      Size: <b>{item.size}</b> | Color: <b>{item.color}</b>
                    </p>
                    <p style={{ margin: 0, fontWeight: 'bold', color: '#1a237e' }}>
                      ${item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  style={{
                    background: '#ff3d00',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    padding: '8px 12px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div style={{ textAlign: 'right', fontSize: '1.2rem', fontWeight: 'bold' }}>
            Total: ${total}
          </div>

          <div
            style={{
              textAlign: 'right',
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
            }}
          >
            <button
              onClick={clearCart}
              style={{
                background: '#1a237e',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Clear Cart
            </button>

            <button
              onClick={() => navigate('/checkout')}
              style={{
                background: '#00c853',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
