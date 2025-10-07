import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // For admin/user authentication and user orders
import { OrderProvider } from './context/OrderContext'; // For bulk order or other order management

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Provide auth and user orders */}
      <OrderProvider> {/* Provide bulk/wholesaler order logic */}
        <App />
      </OrderProvider>
    </AuthProvider>
  </React.StrictMode>
);
