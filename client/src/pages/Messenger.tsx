/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { Conservation, Shop } from '../interface/Shop';
import { useAppDispatch } from '../redux/hooks';
import { chatWithShop, getShops } from '../redux/feature/shopSlice';

const Messenger = ({mess, state, shops}: {mess: Conservation[], state:string, shops: Shop[]}) => {
  const [index, setIndex] = useState<number>(-1);
  const [conser, setConser] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [id, setId] = useState<string>("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(mess&&index!==-1){
      setConser([]);
      for(let i = 0; i < mess.length; i++){
        if(i===index){
          for(let j = 0; j < mess[i].userChat.length; j++){
            setConser([...conser, mess[i].userChat[j]]);
          }
          for(let j = 0; j < mess[i].adChat.length; j++){
            setConser([...conser, mess[i].adChat[j]]);
          }
          break;
        }
      }
    } 
  }, [index])

  useEffect(() => {
    dispatch(getShops());
  }, [shops])

  const handleClick = () => {
    if(state==="client"){
      const formValue = {
        mess: value
      }
      dispatch(chatWithShop({id, formValue}));
    }
    else if(state==="manager"){
      
    }
  }

  return ( 
    <div className='mess'>
      <div className='listShop'>
        <div style={{marginLeft: "1rem"}}>
          <h2>Chat</h2>
          <div style={{display: "flex"}}>
            <Form.Control type="text" placeholder="Search" />
            <SearchIcon style={{width: "2rem", height: "2rem", marginTop: "0.4rem", cursor: "pointer"}}/>
          </div>
        </div>
        <hr/>
        <div style={{marginLeft: "1rem"}}>
          {mess?.map((m: Conservation, i: number) => (
            <>
              <div style={{cursor: "pointer"}} >
                {shops.map((s: Shop) => {
                  if(s._id===m.shopId){
                    return (
                      <div onClick={() => {
                        setId(m.shopId)
                        setIndex(i);
                        console.log("click: " + i);
                      }}>
                        <img style={{width: "3rem", borderRadius: "50%"}} alt='' src={s.avatar}/>
                        <span style={{marginLeft: "1rem", fontWeight: "bold"}}>{s.brand}</span>
                      </div>
                    )
                  }
                })}
              </div>
              <hr/>
            </>
          ))}
        </div>
      </div>
      <div className='talk'>
        <div className='board'>
            {conser.map((c: string, i: number) => (
              <>
                {mess[index].userChat.map((m: string) => (
                  <div style={{width: "10rem", backgroundColor: "white", marginBottom: "3rem", marginLeft:"50rem", borderRadius: "5px"}}>
                    <div>{m}</div>
                  </div>
                ))}
                {mess[index].adChat.map((m: string) => (
                  <div style={{width: "10rem", backgroundColor: "white", marginTop: "3rem", marginBottom: "3rem", marginLeft:"1rem", borderRadius: "5px"}}>
                    <div>{m}</div>
                  </div>
                ))}
              </>
            ))}
        </div>
        <div className='typing'>
          <div style={{display: "flex"}}>
            <Form.Control name='mess' value={value} onChange={(e) => setValue(e.target.value)} style={{height: "2rem"}} type="text" placeholder="Content..." />
            <SendIcon onClick={handleClick} style={{width: "2rem", height: "2rem", marginTop: "0.4rem", cursor: "pointer"}}/>
          </div>         
        </div>
      </div>
    </div>
  )
}

export default Messenger