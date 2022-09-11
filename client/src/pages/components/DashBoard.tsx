/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react'
import { Button, Card, Offcanvas } from 'react-bootstrap'
import { Product } from '../../interface/Product'
import { Shop } from '../../interface/Shop'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../redux/hooks';
import { deleteProduct, getShop, getShops } from '../../redux/feature/shopSlice';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../../redux/feature/productSlice';

const DashBoard = ({shop, products}: {shop: Shop, products: Product[]}) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShops());
    dispatch(getProducts());

  }, [products])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div style={{width: "63rem", marginTop: "0"}} className='suggestion'>
        <h3>DashBoard</h3>
        <div className='sug-item'>
          {shop && products?.map((product: Product) => {
            if(product.brand===shop['_id']){
              return (
                <Card style={{ width: '100%' }} className='item-sug'>
                    <div style={{position: "absolute", right: "0"}}>
                      <>
                        <DeleteIcon onClick={handleShow} style={{color: "#d69393", fontSize: "2.5rem"}}/>

                        <Offcanvas show={show} onHide={handleClose}>
                          <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Do you want to delete this product?</Offcanvas.Title>
                          </Offcanvas.Header>
                          <Offcanvas.Body>
                            <Button onClick={() => {
                              dispatch(deleteProduct(product._id));
                              dispatch(getShop(product.brand));
                              dispatch(getShops());
                              handleClose();
                            }} variant='warning'>Delete</Button>
                            <Button style={{marginTop: "2rem"}} onClick={handleClose}>Exit</Button>
                          </Offcanvas.Body>
                        </Offcanvas>
                      </> 
                      <EditIcon onClick={() => navigate(`/account/format/${product._id}`)} style={{color: "#6d6d96", fontSize: "2.5rem"}}/>
                    </div>
                    <Card.Img variant="top" style={{height: "20rem"}} src={`${product['review']['image'][0]}`} />
                    <Card.Body>
                        <Card.Title style={{color: "black", fontSize: "14px"}}>{product['title']}</Card.Title>
                        <Card.Title style={{fontSize: "13px"}} className={product['sale']>0?'sale':'notSale'}>{product['sale']>0&&`Sale: ${product['sale']}%`}</Card.Title>
                        <Card.Title style={{color: "red"}}>{`${product['price']['discountPrice']}.000 vnd`}</Card.Title>
                    </Card.Body>
                </Card>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default DashBoard