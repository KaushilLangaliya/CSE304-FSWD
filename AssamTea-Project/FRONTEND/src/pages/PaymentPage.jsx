// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import PaymentSelection from '../components/PaymentSection.jsx';

// const PaymentPage = () => {
//   const location = useLocation();
//   const totalAmount = location.state?.totalAmount || 0;

//   return (
//     <div>
//       <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Select Payment Method</h2>
//       {/* <PaymentSelection baseAmount={total} /> */}
//        <PaymentSelection baseAmount={totalAmount} /> 
//     </div>
//   );
// };

// export default PaymentPage;

import React from 'react';
import { useLocation } from 'react-router-dom';
import PaymentSelection from '../components/PaymentSection.jsx';

const PaymentPage = () => {
  const location = useLocation();
const totalAmount = location.state?.baseAmount || 0;


  return (
    <div>
      <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Select Payment Method</h2>
      <PaymentSelection baseAmount={totalAmount} />
    </div>
  );
};

export default PaymentPage;
