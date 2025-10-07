// import React, { useState } from "react";
// import { useLocation } from "react-router-dom"; // ✅ NEW import
// import './PaymentSection.css';

// const PaymentSelection = () => {
//   const location = useLocation(); // ✅ get route state
//   //const baseAmount = location.state?.baseAmount || 500; // ✅ fallback to 500 if not passed

//   const baseAmount = location.state?.baseAmount ?? 500;


//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [totalAmount, setTotalAmount] = useState(baseAmount);
//   const [orderPlaced, setOrderPlaced] = useState(false);

//   const handlePaymentChange = (method) => {
//     setPaymentMethod(method);
//     setTotalAmount(method === "cod" ? baseAmount + 40 : baseAmount);
//   };

//   const handleProceed = () => {
//     if (!paymentMethod) {
//       alert("Please select a payment method.");
//       return;
//     }

//     // Simulate payment success
//     setOrderPlaced(true);
//   };

//   return (
//     <div className="payment-container">
//       {!orderPlaced ? (
//         <>
//           <h2 className="payment-title">Select Payment Method</h2>

//           <div className="payment-options">
//             {[
//               { value: "cod", label: "Cash on Delivery (₹40 Delivery Charge)" },
//               { value: "qr", label: "QR Code (UPI/Scan)" },
//               { value: "debit", label: "Debit Card" },
//               { value: "credit", label: "Credit Card" },
//             ].map(({ value, label }) => (
//               <label key={value} className="payment-option">
//                 <input
//                   type="radio"
//                   value={value}
//                   checked={paymentMethod === value}
//                   onChange={() => handlePaymentChange(value)}
//                 />
//                 <span>{label}</span>
//               </label>
//             ))}
//           </div>

//           {paymentMethod === "qr" && (
//             <div className="qr-section">
//               <h4>Scan to Pay</h4>
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/8/88/UPI-QR-code-example.svg"
//                 alt="QR Code"
//                 width="200"
//                 height="200"
//               />
//               <p>Scan with any UPI app</p>
//             </div>
//           )}

//           {(paymentMethod === "debit" || paymentMethod === "credit") && (
//             <div className="card-details">
//               <input type="text" placeholder="Card Number" />
//               <input type="text" placeholder="Card Holder Name" />
//               <input type="text" placeholder="Expiry Date (MM/YY)" />
//               <input type="password" placeholder="CVV" />
//             </div>
//           )}

//           <h3 className="total-amount">Total: ₹{totalAmount}</h3>

//           <button onClick={handleProceed} className="btn-proceed">
//             Proceed to Pay
//           </button>
//         </>
//       ) : (
//         <div className="order-success">
//           <h2>🎉 Order Placed Successfully!</h2>
//           <p>Payment Mode: <strong>{paymentMethod.toUpperCase()}</strong></p>
//           <p>Total Paid: ₹{totalAmount}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaymentSelection;
import React, { useState, useEffect } from "react";
import axios from "axios";
import './PaymentSection.css';

const PaymentSelection = ({ baseAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(baseAmount);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ Always sync totalAmount with baseAmount if no method is selected
  useEffect(() => {
    if (!paymentMethod) {
      setTotalAmount(baseAmount);
    }
  }, [baseAmount, paymentMethod]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    setTotalAmount(method === "cod" ? baseAmount + 40 : baseAmount);
  };

  const handleProceed = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/order/place",
        {}, // You already placed order earlier, so no items needed again
        { withCredentials: true }
      );

      console.log("Order placed:", res.data);
      setOrderPlaced(true);
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="payment-container">
      {!orderPlaced ? (
        <>
          <h2 className="payment-title">Select Payment Method</h2>

          <div className="payment-options">
            {[
              { value: "cod", label: "Cash on Delivery (₹40 Delivery Charge)" },
              { value: "qr", label: "QR Code (UPI/Scan)" },
              { value: "debit", label: "Debit Card" },
              { value: "credit", label: "Credit Card" },
            ].map(({ value, label }) => (
              <label key={value} className="payment-option">
                <input
                  type="radio"
                  value={value}
                  checked={paymentMethod === value}
                  onChange={() => handlePaymentChange(value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>

          {paymentMethod === "qr" && (
            <div className="qr-section">
              <h4>Scan to Pay</h4>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/88/UPI-QR-code-example.svg"
                alt="QR Code"
                width="200"
                height="200"
              />
              <p>Scan with any UPI app</p>
            </div>
          )}

          {(paymentMethod === "debit" || paymentMethod === "credit") && (
            <div className="card-details">
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Card Holder Name" />
              <input type="text" placeholder="Expiry Date (MM/YY)" />
              <input type="password" placeholder="CVV" />
            </div>
          )}

          <h3 className="total-amount">Total: ₹{totalAmount}</h3>

          <button onClick={handleProceed} className="btn-proceed">
            Proceed to Pay
          </button>
        </>
      ) : (
        <div className="order-success">
          <h2>🎉 Order Placed Successfully!</h2>
          <p>Payment Mode: <strong>{paymentMethod.toUpperCase()}</strong></p>
          <p>Total Paid: ₹{totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSelection;
