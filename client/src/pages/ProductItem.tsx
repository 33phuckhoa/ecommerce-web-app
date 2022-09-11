/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import Brand from './components/Brand';
import Review from './components/Review';
import { addToCart, getUser } from '../redux/feature/authSlice';
import { localStr, User } from '../interface/Auth';

const ProductItem = () => {
  const {product}: {product: any | unknown} = useAppSelector((state: RootState) => state.product);
  const {shop}: {shop: any} = useAppSelector((state: RootState) => state.shop);
  const {users, user}: {users: User[], user: localStr | null} = useAppSelector((state: RootState) => state.auth);
  const [amount, setAmount] = useState<number>(1);
  const [userState, setUserState] = useState<localStr>({});
  const [review, setReview] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(product){
      setReview(`${product['review']['image'][0]}`);
    }
    if(user){
      setUserState(user);
      dispatch(getUser(user));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, user]);    

  const handleNumber = (event:React.ChangeEvent<HTMLInputElement>)=>{
    const value = Number.parseInt(event.target.value);
    setAmount(value);
  }

  const handleClick = (state: string) => {
    if(state==="add"){
      document.querySelector(".f")?.classList.toggle("fly");
      const formValue = {
        nameProduct: product['_id'],
        amount
      }
      dispatch(addToCart(formValue));
    }
    else if(state==="buy"){
      const formValue = {
        nameProduct: product['_id'],
        amount
      }
      dispatch(addToCart(formValue));
      navigate("/cart");
    }
  }

  return (
    <>
      <div className='product'>
        <div className='detail'>
          {product ? (
            <>
              <div className='cover' onClick={() => setReview(product['review']['url'])}></div> 
              <div className='review'>
                <iframe name='review' title='' height="500" width="500" src={review}/>
                <div style={{display: "flex"}}>
                  <iframe 
                    style={{marginRight: "1rem"}}
                    src={product['review']['url']} 
                    height="80" 
                    width="100" 
                    title="description"
                  ></iframe> 
                  {product?.review?.image?.map((img: string) => (
                    <img 
                      style={{marginRight: "1rem"}}   
                      className='img1' 
                      alt='' 
                      src={img}
                      onClick={() => setReview(img)}
                    />
                  ))}
                </div>
              </div>
              <Card className='infor' >
                  <Card.Body>
                      <Card.Title style={{color: "black", fontSize: "23px"}}>{product['title']}</Card.Title>
                      <Card.Title className='price'>
                        {product['price']['cost'] > product['price']['discountPrice']&&
                          <span style={{color: "black", textDecoration: "line-through"}}>{`${product['price']['cost']}.000vnd`}</span>
                        }
                          {` ${product['price']['discountPrice']}.000vnd`}
                        {product['price']['sale'] && <span className='sale1'>{`${product['price']['sale']}%`}</span>}
                      </Card.Title>
                      <Card.Text style={{marginTop: "1rem"}}><span style={{color: "red", fontSize: "2rem"}}>Description:  </span>{product['description']}</Card.Text>
                      <div>
                        {product['amount']&&(
                          <>
                            <span  style={{color: "red", fontSize: "1.4rem"}}>Amount: </span>
                            {product['amount']['remainingStock']<0?
                              "Out of stock"
                              :(
                                <>
                                  <input 
                                    value={amount}
                                    onChange={handleNumber}
                                    style={{width: "4rem"}} 
                                    type='number' 
                                    min='1' 
                                    max={product['amount']['remainingStock']} 
                                  />
                                  <div style={{display: "flex", marginTop: "2rem"}}>
                                    <Button className='f' onClick={() => handleClick("add")} style={{width: "10rem", border: "0.5px solid orange", marginRight: "1rem"}} variant="light">
                                        Add to Cart 
                                    </Button>
                                    <Button onClick={() => handleClick("buy")} style={{width: "10rem"}} variant="warning">Buy</Button>
                                  </div>
                                </>
                              )
                            }
                          </>
                        )}
                      </div>
                  </Card.Body>
              </Card>
            </>
          ): null}
        </div>
        {user&&(
          <Brand shop={shop} user={userState}/>  
        )}
        <Review users={users} product={product}/>
      </div>
    </>
  )
}

export default ProductItem;