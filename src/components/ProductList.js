import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import { addToCart } from '../store/actions/cartActions';
import { Button, Card } from 'react-bootstrap';
import './ProductList.css';

const ProductList = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-list">
      {productState.loading ? (
        <h2>Loading...</h2>
      ) : productState.error ? (
        <h2>{productState.error}</h2>
      ) : (
        productState.products.map((product) => (
          <Card key={product.id} style={{ width: '18rem', marginBottom: '10px', padding: '10px' }} className='product-item'>
            <Card.Body>
            <Card.Img variant='top' src={product.image} alt={product.title} style={{width: '100%', height:'200px', objectFit:'cover', borderRadius: '15px'}} />
            <Card.Title style={{textAlign:'left', fontWeight: 'bolder'}}>{product.title}</Card.Title>
            <Card.Text style={{textAlign:'Justify'}}>{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</Card.Text>
              <Card.Text style={{ fontWeight: 'bolder', textAlign: 'left' }}>${product.price}</Card.Text>
            </Card.Body>
            <Card.Footer className='justify-content-center'>
              <Button style={{padding:'10px', borderRadius:'10px', border:'0px'}} onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </Card.Footer>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProductList;