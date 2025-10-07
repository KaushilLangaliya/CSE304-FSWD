// // src/components/ProductDisplay.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './ProductShop.css'; // Custom styles

// // Import images
// import blackTeaImage from '../assets/images/Black-tea.jpg';
// import greenTeaImage from '../assets/images/green-tea.jpg';
// import herbalTeaImage from '../assets/images/hurble-tea.jpg'; // Make sure filename is correct

// const products = [
//   {
//     id: 1,
//     name: 'Black Tea',
//     image: blackTeaImage,
//     price: '₹ 200 Per Kg / Pack',
//     description: 'Fully oxidized Camellia sinensis leaves, resulting in a robust, bold flavor and higher caffeine.',
//   },
//   {
//     id: 2,
//     name: 'Green Tea',
//     image: greenTeaImage,
//     price: '₹ 150 Per Kg / Pack',
//     description: 'Minimally processed Camellia sinensis leaves, retaining fresh, light flavor & high antioxidants.',
//   },
//   {
//     id: 3,
//     name: 'Herbal Tea',
//     image: herbalTeaImage,
//     price: '₹ 200 Per Kg / Pack',
//     description: 'Infusions made from various plants, offering diverse flavors and generally caffeine-free.',
//   },
// ];

// const ProductDisplay = () => {
//   return (
//     <div className='main-product'>
//       <div className='heading'> <h1> Our Product </h1> </div>
//       <div className='product-container'>
//           {products.map((product) => (
//           <div className='card' key={product.id}>
//             <div className='card-img'>
//               <Link to="/product/:id" state={{ product }}>
//                 <img src={product.image} alt={product.name} className="product-image" />
//               </Link>
//             </div>
//             <div className='card-detail'>
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <h1>{product.price}</h1>
//               <Link to="/product/:id" state={{ product }}>
//                 <button id='card-btn'>Buy Now</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className='heading'> <h1> TOP SELLING </h1> </div>

//       <div className='product-container'>
//           {products.map((product) => (
//           <div className='card' key={product.id}>
//             <div className='card-img'>
//               <Link to="/product/:id" state={{ product }}>
//                 <img src={product.image} alt={product.name} className="product-image" />
//               </Link>
//             </div>
//             <div className='card-detail'>
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <h1>{product.price}</h1>
//               <Link to="/product/:id" state={{ product }}>
//                 <button id='card-btn'>Buy Now</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className='product-container'>
//           {products.map((product) => (
//           <div className='card' key={product.id}>
//             <div className='card-img'>
//               <Link to="/product/:id" state={{ product }}>
//                 <img src={product.image} alt={product.name} className="product-image" />
//               </Link>
//             </div>
//             <div className='card-detail'>
//               <h3>{product.name}</h3>
//               <p>{product.description}</p>
//               <h1>{product.price}</h1>
//               <Link to="/product/:id" state={{ product }}>
//                 <button id='card-btn'>Buy Now</button>
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductDisplay;


import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProductShop.css'; // Custom styles
import { PRODUCT_API_END_POINT } from './utils/constant.js';

const ProductDisplay = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState('');

  useEffect(()=>{
    const fetchProducts = async()=>{
try {
  
  // const res = await axios.get('http://localhost:5000/api/product');
  const res = await axios.get(`${PRODUCT_API_END_POINT}`)
  setProducts(res.data.products);
  setLoading(false);

} catch (error) {
  setError('Failed to load products');
        setLoading(false);
}
    };

    fetchProducts();
  },[]);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;


  return (
    <div className='main-product'>
      <div className='heading'> <h1> Our Product </h1> </div>
      <div className='product-container'>
          {products.map((product) => (

          <div className='card' key={product._id}>
            <div className='card-img'>
              <Link to={`/product/${product._id}`}>

                <img src={product.image} alt={product.name} className="product-image" />
              </Link>
            </div>
            <div className='card-detail'>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <h1>₹{product.price}Per Kg / Pack</h1>
              {/* <Link to={`/product/${product._id}`}>

                <button id='card-btn'>Buy Now</button>
              </Link> */}

               <Link to="/product/:id" state={{ product }}>
                 <button id='card-btn'>Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className='heading'> <h1> TOP SELLING </h1> </div>

      <div className='product-container'>
          {products.map((product) => (

          <div className='card' key={product._id}>
            <div className='card-img'>
              <Link to={`/product/${product._id}`}>

                <img src={product.image} alt={product.name} className="product-image" />
              </Link>
            </div>
            <div className='card-detail'>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <h1>₹{product.price}Per Kg / Pack</h1>
              {/* <Link to="/product" state={{ product }}> */}
               <Link to="/product/:id" state={{ product }}>
                 <button id='card-btn'>Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className='product-container'>
          {products.map((product) => (

          <div className='card' key={product._id}>
            <div className='card-img'>
             <Link to={`/product/${product._id}`}>

                <img src={product.image} alt={product.name} className="product-image" />
              </Link>
            </div>
            <div className='card-detail'>
              <h3>{product.name}</h3>
              <p>{product.description}</p>

              <h1>₹{product.price}Per Kg / Pack</h1>
               <Link to="/product/:id" state={{ product }}>
                 <button id='card-btn'>Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;
