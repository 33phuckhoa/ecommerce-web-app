import React, { useState, ChangeEvent } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { localStr, User } from '../../interface/Auth';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Shop } from '../../interface/Shop';
import { createShops, getShops } from '../../redux/feature/shopSlice';
import { getAll, getSearchUser, getUser, updateRoleLu} from '../../redux/feature/authSlice';
import { getProducts } from '../../redux/feature/productSlice';


const YourShop = ({user, shop, users, searchUser}: {user: localStr, shop: Shop, users: User[], searchUser: User[]}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [formValue, setFormValue] = useState({
    name: "",
    avatar: ""
  })
  const {name, avatar} = formValue;
  const handleChange = (
  e: ChangeEvent<{ value: string, name: string }>
  ) => setFormValue({...formValue, [e.currentTarget.name]: e.currentTarget.value}); 
  return (
    <div className='a crash'>
      <div className='home'>
        <h1 style={{color: "black"}}>Your Shop</h1>
        <hr style={{width: "56rem", fontWeight: "bold"}}/>
        <div>
          {user.result?.idBrand?(
            <div>
              <Card className='load' style={{margin: "0rem"}}>
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
                </div>
                
                <div style={{width: "1px", height: "100%", backgroundColor:"rgb(242, 234, 234)", marginLeft: "19rem"}}></div>
                <div style={{marginLeft: "rem"}}>
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
            <div style={{marginTop: "3rem", height: "10rem"}} className='post'>
              <Card className='load' style={{margin: "0rem"}}>
                <Card.Header style={{backgroundColor: "black", color: "white", fontWeight: "bold"}}>
                  {"Admin"} 
                </Card.Header>
                <Card.Body style={{height: "12rem", overflowY: "scroll"}}>
                  <Form.Group style={{width: "40rem", margin: "0", display: "flex"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                    <Button variant='warning' style={{width: "10rem", height: "2rem"}}>Search</Button>
                    <Form.Control value={search} onChange={(e) => {
                      setSearch(e.target.value);
                      const searchQuery = search;
                      dispatch(getSearchUser(searchQuery));
                    }} style={{width: "20rem", height: "2rem", marginLeft: "2rem"}} type="text" placeholder="" />
                  </Form.Group>
                  <div style={{display: "flex", marginTop: "-17rem", flexWrap: "wrap"}}>
                    {searchUser?.map((user: User) => (
                      <Card className='cat' style={{width: "12rem", marginRight: "1rem"}}>
                      <Card.Header style={{display: "flex",backgroundColor: "black", color: "white", fontWeight: "bold"}}>
                        {user.name}
                      </Card.Header>
                      <Card.Body className='as' style={{display: "flex"}}>
                        <img style={{width: "3rem", height: "3rem", borderRadius: "50%"}} alt='' src={user.avatar}/>
                        <Button onClick={() => {
                          const id = user._id;
                          if(id){
                            dispatch(updateRoleLu(id));
                            dispatch(getAll());
                            setSearch("");
                            
                          }
                        }}>Add </Button>
                      </Card.Body>
                    </Card>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </div>
            </div>
          ):(
            <div>
              <Card className='load' style={{margin: "0rem", height: "20rem"}}>
                <Card.Header style={{backgroundColor: "black", color: "white", fontWeight: "bold"}}>
                {"Post Product"} 
                </Card.Header>
                <Card.Body style={{marginTop: "17rem"}}>
                  <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="2">
                      Name
                      </Form.Label>
                      <Col sm="10">
                      <Form.Control onChange={handleChange} name='name' value={name} type="text" placeholder="Name" />
                      </Col>
                  </Form.Group>
                  <Form.Group style={{width: "40rem", margin: "0", marginTop: "-15rem"}} as={Row} className="mb-3" controlId="formPlaintextPassword">
                      <Form.Label column sm="2">
                      Avatar
                      </Form.Label>
                      <Col sm="10">
                      <Form.Control name='avatar' value={avatar} onChange={handleChange} type="text" placeholder="Avatar" />
                      </Col>
                  </Form.Group>
                  <Button onClick={() => {
                    const formValue1 = {
                      brand: formValue.name,
                      avatar: formValue.avatar
                    }

                    dispatch(createShops(formValue1));
                    dispatch(getShops());
                    dispatch(getProducts());
                  }} style={{position: "absolute", top: "17rem"}}>Create Your Brand</Button>
                
                </Card.Body>    
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default YourShop