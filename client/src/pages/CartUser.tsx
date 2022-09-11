/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, Card } from 'react-bootstrap';
import { buy, Cart, User } from '../interface/Auth';
import { buyProduct, rechargeUser, removeToCart } from '../redux/feature/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';

const CartUser = () => {
  const {user}: {user: User | null, loading: boolean} = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [cart, setCart] = useState<Cart[]>();
  const [total, setTotal] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [handle, setHandle] = useState<string[]>([]);
  const [cast, setCast] = useState<boolean>(false);
  const [turn, setTurn] = useState<boolean>(false);
  const [recharge, setRecharge] = useState<boolean>(false);
  const [checkLo, setCheckLo] = useState<boolean>(false);
  const [checkAll, setCheckAll] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    
    if(user){
      setCart(user['result']['cart']);
    }
  }, [user])

  useEffect(() => {
    if(count<1){
      setCheckLo(false);
    }
    else {
      setCheckLo(true);
    }
    console.log(handle);
  }, [count])

  useEffect(() => {
    if(checkAll){
      const checkbox = Array.from(document.getElementsByClassName("checkbox")) as HTMLInputElement[] | null;
      if(checkbox){
        for(let i = 0; i < checkbox.length; i++){
          checkbox[i].checked = true;
        }
      }
      if(cart){
        let b = 0;
        for(let i = 0; i < cart?.length; i++){
          b += cart[i].price*cart[i].amount;
        }
        setTotal(b);
      }
    }
  }, [checkAll])

  const handleClick = () => {
    setCheckAll(true);
    setHandle([]);
    if(cart){
      setCount(cart.length);
      let a: string[] = [];
      for(let i = 0; i < cart?.length!; i++){
        a.push(cart[i].nameProduct);
      }
      setHandle(a);
    }
  }

  return (
    <div className='cartItem'>    
      {cart?.map((c: Cart) => (
        <Card className='cat'>
          <Card.Header style={{backgroundColor: "black", color: "white", fontWeight: "bold"}}>{c.name}</Card.Header>
          <Card.Body style={{display: "flex"}}>
            <input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                
                if(e.target.checked){
                  setCount(count+1);
                  let a = handle;
                  a?.push(c.nameProduct);
                  setHandle(a);
                  const cost = c.amount*c.price;
                  setTotal(total+cost);
                }
                else {
                  setCount(count-1);  
                  let a: string[] | undefined = handle;
                  if(a !== undefined){
                    for(let i = 0; i < a.length; i++){
                      if(a[i]===c.nameProduct){
                        setHandle(a.slice(0, i).concat(a.slice(i+1, a.length)));
                        break;
                      }
                    }
                  }
                  const cost = c.amount*c.price;
                  setTotal(total-cost);
                }
              }}
              className='checkbox'
              type={'checkbox'}
              style={{marginRight: "2rem", backgroundColor: "black"}}
            />
            <img src={c.image} alt=""/>
            <Card.Title style={{color: "red", marginTop: "1rem"}}>{`${c.price}.000vnd`}</Card.Title>
            <div style={{color: "red", marginTop: "1rem", marginLeft: "50rem"}}>
              <span  style={{color: "red", fontSize: "1rem"}}>Amount: </span>
              <input 
                style={{width: "4rem", height: "1rem"}} 
                className='checkbox'
                type='number' 
                value={c.amount}
                min='1' 
                max='100'
              />
            </div>
          </Card.Body>
        </Card>
      ))}
      <div className='banners'>
        <div  className='bans'>
          <div style={{marginTop: "1.2rem", display: "flex", marginLeft: '2rem'}}>
            <div className="c co"
              onClick={handleClick}
            >
              Select All
            </div>
            <div className="c">Chosen Total: {count}</div>
            {checkLo&&(
              <>
                <div className='co'
                  onClick={() => {
                    const formValue = {element: handle};
                    dispatch(removeToCart(formValue));
                    const checkbox = Array.from(document.getElementsByClassName("checkbox")) as HTMLInputElement[] | null;
                    if(checkbox){
                      for(let i = 0; i < checkbox.length; i++){
                        checkbox[i].checked = false;
                      }
                    }
                    setCount(0);
                  }}
                  
                >
                  Delete
                </div>
                <div style={{marginLeft: "8rem", marginTop: "-0.5rem", color: "red", fontSize: "25px"}}>
                  Total: {total>0?`${total}.000vnd`:0}
                </div>
                <Button className='ba' variant='danger' onClick={() => setCast(true)}>Buy</Button>  
              </>
            )}
          </div>
        </div>
      </div>
      {cast&&(
        <div className='cast'>
          <CancelIcon style={{cursor: "pointer"}} onClick={() => setCast(false)}/>
          <div className='scroll'>
            {cart?.map((c: Cart) => {
              for(let i = 0; i < handle.length; i++){
                if(c.nameProduct===handle[i]){
                  return (
                    <div className='bobo'>
                      <img alt='' src={c.image}/>
                      <div>{c.name}</div>
                    </div>
                  )
                }
              }
            })}
            <div style={{marginLeft: "1rem"}}>
              <input/>
              <span className='span' style={{marginLeft: "1rem"}}>Add Discount</span>

            </div>
            <div style={{marginLeft: "1rem", marginTop: "1rem"}}>Total: {total>0?`${total}.000vnd`:0}</div>

          </div>
          {recharge?(
             <Button 
             style={{position: "absolute", left: "0", bottom: "0", width: "100%"}} 
             onClick={() => {
              setCast(false);
              setTurn(true);
             }}
           >
             Recharge
           </Button>
          ):(
            <Button 
              style={{position: "absolute", left: "0", bottom: "0", width: "100%"}} 
              onClick={() => {
                if(user && user['result']['money'] >= total){
                  const formValue ={
                    total,
                    element: handle
                  } as buy;
                  if(formValue){
                    dispatch(buyProduct(formValue));
                  }
                  setCast(false);
                  setTotal(0);
                  setCount(0);
                }
                else{
                  setRecharge(true);
                  toast.error("You must recharge");

                }
              }}
            >
              Cast
            </Button>

          )}
        </div>
      )}
      {turn&&(
        <div className='cast' style={{height: "8rem"}}>
          <CancelIcon style={{cursor: "pointer"}} onClick={() => setTurn(false)}/>
          <div style={{margin: "1rem 14rem"}}>
            <input
              type={'text'}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
              <Button 
              style={{position: "absolute", left: "0", bottom: "0", width: "100%"}} 
              onClick={() => {
                setCast(true);
                setTurn(false);
                setRecharge(false);
                const formValue = {
                  total: Number.parseInt(value)
                }
                dispatch(rechargeUser(formValue));
              }}
            >
              Recharge
            </Button>
        </div>
      )}
    </div>
  )
}

export default CartUser