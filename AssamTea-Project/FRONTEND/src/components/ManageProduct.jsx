
import React, { useEffect, useState } from 'react';
import './ManageProduct.css';
import axios from 'axios';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: '',
    stock: 0,
    productLife: '',
    instructions: '',
    temperature: '',
    availableSizes: [],
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/product');
      setProducts(res.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price || !form.description || !form.image) {
      alert("All fields are required");
      return;
    }

    if (form.availableSizes.length === 0) {
      alert("Add at least one size");
      return;
    }

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        ratingStars: 0,
        noOfRatings: 0,
        productLife: form.productLife || "12 months",
        instructions: form.instructions || "Store in a cool place",
        temperature: form.temperature || "Room Temperature",
      };

      const res = await axios.post('http://localhost:5000/api/product/create', payload, {
        withCredentials: true,
      });

      alert('Product added successfully');
      setProducts([...products, res.data.product]);

      // Reset form
      setForm({
        id: '',
        name: '',
        price: '',
        description: '',
        image: '',
        stock: 0,
        productLife: '',
        instructions: '',
        temperature: '',
        availableSizes: [],
      });

    } catch (err) {
      console.error('Error submitting product:', err);
      alert(err.response?.data?.message || 'Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/${id}`, {
        withCredentials: true
      });
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="manage-product">
      <h2>Manage Products</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Price (₹)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />

        <h4>Available Sizes</h4>
        {form.availableSizes.map((size, index) => (
          <div key={index} className="size-row">
            <input
              placeholder="Size label (e.g., 250g)"
              value={size.label}
              onChange={(e) => {
                const updated = [...form.availableSizes];
                updated[index].label = e.target.value;
                setForm({ ...form, availableSizes: updated });
              }}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={size.price}
              onChange={(e) => {
                const updated = [...form.availableSizes];
                updated[index].price = Number(e.target.value);
                setForm({ ...form, availableSizes: updated });
              }}
              required
            />
            <button type="button" onClick={() => {
              const updated = form.availableSizes.filter((_, i) => i !== index);
              setForm({ ...form, availableSizes: updated });
            }}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() =>
          setForm({ ...form, availableSizes: [...form.availableSizes, { label: '', price: 0 }] })
        }>Add Size</button>

        <input placeholder="Stock" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
        <input placeholder="Product Life (optional)" value={form.productLife} onChange={(e) => setForm({ ...form, productLife: e.target.value })} />
        <input placeholder="Instructions (optional)" value={form.instructions} onChange={(e) => setForm({ ...form, instructions: e.target.value })} />
        <input placeholder="Temperature (optional)" value={form.temperature} onChange={(e) => setForm({ ...form, temperature: e.target.value })} />

        <input type="file" accept="image/*" onChange={handleImageUpload} required />
        {form.image && <img src={form.image} alt="preview" width="100" style={{ marginTop: '10px' }} />}
        <button type="submit">{isEditing ? 'Update' : 'Add'} Product</button>
      </form>

      <div className="product-list">
        <h3>Current Products</h3>
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} width="80" />
            <div>
              <h4>{product.name}</h4>
              <p>{product.description}</p>
              <strong>₹{product.price}</strong>
              {product.availableSizes?.length > 0 && (
                <ul>
                  {product.availableSizes.map((size, i) => (
                    <li key={i}>{size.label} - ₹{size.price}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="product-actions">
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProduct;
