/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { localStr} from '../interface/Auth';
import { Product } from '../interface/Product';
import { Shop } from '../interface/Shop';
import { getProduct } from '../redux/feature/productSlice';
import { follow, getShop, getShops } from '../redux/feature/shopSlice';
import { useAppDispatch, useAppSelector} from '../redux/hooks'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { RootState } from '../redux/store';
import { setFollow, getUser } from '../redux/feature/authSlice';


const ShopUser = ({shop, user, products}: {shop: Shop, user: localStr, products: Product[]}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {check}: {check: boolean} = useAppSelector((state: RootState) => state.auth);
  const [follower, setFollower] = useState({
    title: "",
    state: ""
  })

  useEffect(() => {
    if(check){
      setFollower({
        title: "Unfollow",
        state: "minus"
      })
    }
    else {
      setFollower({
        title: "Follow",
        state: "plus"
      })
    }
  }, [check])



  const handleClick = (id: string, brand: string) => {
    dispatch(getProduct(id));
    dispatch(getShop(brand));
    navigate(`/product/${id}`);
  }

  return (
    <div>
      {shop&&user&& (
        <Card className='load' style={{margin: "2rem"}}>
          <Card.Header style={{backgroundColor: "black", color: "white", fontWeight: "bold"}}>
            {shop['brand']}
            <div style={{position: "absolute", right: "1rem", display: "flex", top: '0.5rem'}}>
              {[1, 2, 3, 4, 5].map((c: number) => {
                if(shop.star>0.5 && shop.star<=1.6){
                  if(c===1){
                    return(
                      <div className='star'
                      >
                        <StarIcon/>
                      </div>
                    )
                  }
                }
                else if(shop.star>1.6 && shop.star <=2.6){
                  if(c===1||c===2){
                    return (
                      <div className='star'
                      >
                        <StarIcon/>
                      </div>
                    )
                  }
                }
                else if(shop.star>2.6 && shop.star<=3.6){
                  if(c===1||c===2||c===3){
                    return (
                      <div className='star'
                      >
                        <StarIcon/>
                      </div>
                    )
                  }
                }
                else if(shop.star>3.6 && shop.star<=4.6){
                  if(c===1||c===2||c===3||c===4){
                    return (
                      <div className='star'
                      >
                        <StarIcon/>
                      </div>
                    )
                  }
                }
                else if(shop.star>4.6 && shop.star<=5 ){
                  return (
                    <div className='star'
                    >
                      <StarIcon/>
                    </div>
                  )
                }
                return(
                  <div className='star'
                  >
                    <StarOutlineIcon/>
                  </div>
                )
              })}
            </div>
          </Card.Header>
          <Card.Body style={{display: "flex"}}>
            <img alt='' style={{borderRadius: "50%", width: "7rem"}} src={shop['avatar']}/>
            <div style={{marginLeft: "1rem", width: "7rem", marginTop: "0.7rem"}}>
              <Button style={{width: "7rem"}} onClick={() => {
                dispatch(getShops());
                dispatch(getUser(user));
                navigate(`/chat/${user.result?._id}`)}
              } variant="danger">Chat</Button>
              <Button onClick={() => {
                if(follower.state==="plus"){
                  dispatch(setFollow(true));
                }
                else {
                  dispatch(setFollow(false));
                }
                dispatch(follow({id: shop['_id'], formValue: {state: `${follower.state}`}}))}
              } style={{width: "7rem", marginTop: "1rem"}} variant="warning">{follower.title}</Button>
            </div>
            
            <div style={{width: "1px", height: "100%", backgroundColor:"rgb(242, 234, 234)", marginLeft: "19rem"}}></div>
            <div style={{marginLeft: "12rem"}}>
              <div style={{display: "flex", margin: "0.6rem"}}>
                  <span>Avaluate: </span>
                  <h6 style={{margin: "0.22rem", color: "red"}}>{shop['conser']['length']}</h6>
              </div>
              <div style={{display: "flex", margin: "0.6rem"}}>
                  <span>Products: </span>
                  <h6 style={{margin: "0.22rem", color: "red"}}>{shop['products']['length']}</h6>
              </div>

            </div>
            <div style={{marginLeft: "2rem"}}>
              <div style={{display: "flex", margin: "0.6rem"}}>
                  <span>Date Created: </span>
                  <h6 style={{margin: "0.20rem", color: "red"}}>{moment(shop['createdAt']).fromNow()}</h6>
              </div>
              <div style={{display: "flex", margin: "0.6rem"}}>
                  <span>Follower: </span>
                  <h6 style={{margin: "0.22rem", color: "red"}}>{shop['follower']['length']}</h6>
              </div>
            </div>
          </Card.Body>

        </Card>
      )}
      <div style={{marginLeft: "2rem", width: "95%"}} className='suggestion'>
        <h3>Your suggestion</h3>
        <div className='sug-item'>
          {shop && products?.map((product: Product) => {
            if(product.brand===shop['_id']){
              return (
                <Card onClick={() => handleClick(product['_id'], product['brand'])} style={{ width: '18rem' }} className='item-sug'>
                    <Card.Img variant="top" src={`${product['review']['image'][0]}`} />
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

export default ShopUser