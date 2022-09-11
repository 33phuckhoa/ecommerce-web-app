import React from 'react'
import { Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Product } from '../interface/Product'
import { getProduct } from '../redux/feature/productSlice'
import { getShop, getShops } from '../redux/feature/shopSlice'
import { useAppDispatch } from '../redux/hooks'

const Tag = ({products}: {products: Product[]}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (id: string, brand: string) => {
    dispatch(getProduct(id));
    dispatch(getShop(brand));
    dispatch(getShops());
    navigate(`/product/${id}`);
  }
  return (
    <div>
      <div className='suggestion'>
        <h3>Your suggestion</h3>
        <div className='sug-item'>
            {products?.map((product: Product) => (
            <Card onClick={() => handleClick(product['_id'], product['brand'])} style={{ width: '18rem' }} className='item-sug'>
                <Card.Img variant="top" src={`${product['review']['image'][0]}`} />
                <Card.Body>
                    <Card.Title style={{color: "black", fontSize: "14px"}}>{product['title']}</Card.Title>
                    <Card.Title style={{fontSize: "13px"}} className={product['sale']>0?'sale':'notSale'}>{product['sale']>0&&`Sale: ${product['sale']}%`}</Card.Title>
                    <Card.Title style={{color: "red"}}>{`${product['price']['discountPrice']}.000 vnd`}</Card.Title>
                </Card.Body>
            </Card>
            ))}
        </div>
    </div>
    </div>
  )
}

export default Tag