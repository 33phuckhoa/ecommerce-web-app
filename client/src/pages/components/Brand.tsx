import React from 'react'
import { Button } from 'react-bootstrap'
import { Shop } from '../../interface/Shop'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { localStr } from '../../interface/Auth';
import { useAppDispatch } from '../../redux/hooks';
import { getUser, setFollow } from '../../redux/feature/authSlice';
import { getShops } from '../../redux/feature/shopSlice';

interface propsBrand {
  shop: Shop,
  user: localStr
}

const Brand = ({shop, user}: propsBrand) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className='brand'>
      <div className='scale'>
        {shop && (
          <>
            <img alt='' src={shop['avatar']}/>
            <div style={{marginLeft: "1rem"}}>
              <h6 style={{color: "black", fontWeight: "bold"}}>{shop['brand']}</h6>
              <div>
                  <Button  onClick={() => {
                    
                    dispatch(getUser(user));
                    dispatch(getShops());
                    navigate(`/chat/${user.result?._id}`)
                  
                  }}  style={{width: "7em", border: "0.5px solid orange", marginRight: "1rem"}} variant="light">Chat</Button>
                  <Button style={{width: "7rem"}} variant="warning" onClick={() => {
                    if(shop.follower.length===0){
                      setFollow(false);
                    }
                    else {
                      for(let i = 0; i < shop.follower.length; i++){
                        if(shop.follower[i]===user.result?._id){
                          dispatch(setFollow(true));
                          break;
                        }
                        else {
                          dispatch(setFollow(false));
                        }
                      }
                    }
                    navigate("/shopUser")
                  }}>Watch Shop</Button>
              </div>
            </div>
            <div style={{width: "1px", height: "100%", backgroundColor:"rgb(242, 234, 234)", marginLeft: "19rem"}}></div>
            <div style={{marginLeft: "7rem"}}>
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
          </>
        )}
      </div>
    </div>
  )
}

export default Brand