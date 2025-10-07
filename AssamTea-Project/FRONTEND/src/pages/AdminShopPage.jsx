import React from 'react';
import '../components/AdminProductShop.css'; // ✅ Correct relative path

function AdminShopPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Shop Management</h1>
      <p>This is the admin shop management page where products can be added, updated, or removed.</p>
    </div>
  );
}

export default AdminShopPage;
