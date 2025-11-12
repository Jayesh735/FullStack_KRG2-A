// Shop.js
import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import products from './products'; // make sure this exports an array of {id, name, price, image, description}

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const { addToCart } = useContext(CartContext);

  const handleClose = () => {
    setSelectedProduct(null);
    setSelectedSize('');
    setSelectedColor('');
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select a size and color!');
      return;
    }

    addToCart({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      image: selectedProduct.image,
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    });

    alert(`${selectedProduct.name} added to cart!`);
    handleClose();
  };

  return (
    <div style={{ backgroundColor: '#f0f4ff', minHeight: '100vh', padding: '30px 20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30, color: '#1a237e' }}>Our Products</h1>

      {/* Product Grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {products.map(({ id, name, price, image, description }) => (
          <div
            key={id}
            onClick={() =>
              setSelectedProduct({
                id,
                name,
                price,
                image,
                description,
                sizes: ['S', 'M', 'L', 'XL'],
                colors: ['Red', 'Blue', 'Green', 'Black'],
              })
            }
            style={{
              width: 220,
              borderRadius: 12,
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <img src={image} alt={name} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
            <div style={{ padding: 15 }}>
              <h3 style={{ fontSize: 18, margin: '0 0 5px', color: '#1a237e' }}>{name}</h3>
              <p style={{ margin: 0, fontWeight: 'bold', color: '#ff3d00' }}>${price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              padding: 25,
              width: '500px',
              maxWidth: '95%',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                background: '#ff3d00',
                border: 'none',
                borderRadius: '50%',
                width: 30,
                height: 30,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 12, marginBottom: 20 }}
            />

            <h2 style={{ margin: '0 0 10px', color: '#1a237e' }}>{selectedProduct.name}</h2>
            <p style={{ fontWeight: 'bold', fontSize: 20, color: '#ff3d00', marginBottom: 15 }}>
              ${selectedProduct.price.toFixed(2)}
            </p>

            {/* Size */}
            <div style={{ marginTop: 20 }}>
              <p style={{ marginBottom: 5, fontWeight: 'bold' }}>Select Size:</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {selectedProduct.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      border: selectedSize === size ? '2px solid #1a237e' : '1px solid #ccc',
                      backgroundColor: selectedSize === size ? '#e8eaf6' : '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div style={{ marginTop: 15 }}>
              <p style={{ marginBottom: 5, fontWeight: 'bold' }}>Select Color:</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {selectedProduct.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 8,
                      border: selectedColor === color ? '2px solid #1a237e' : '1px solid #ccc',
                      backgroundColor: color.toLowerCase(),
                      color: color.toLowerCase() === 'black' ? '#fff' : '#000',
                      cursor: 'pointer',
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                marginTop: 25,
                backgroundColor: '#1a237e',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                padding: '12px 20px',
                fontSize: 16,
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
