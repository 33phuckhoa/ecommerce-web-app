import React, { useEffect, useState } from 'react'
import { Container, Form, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getUser, setLogout, setVisited } from '../../redux/feature/authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { localStr, Notifi } from '../../interface/Auth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EjectIcon from '@mui/icons-material/Eject';
import { getProduct, getProducts, getSearchProduct, setSearch } from '../../redux/feature/productSlice';
import { getShop } from '../../redux/feature/shopSlice';


const Header = () => {
  const {user, visited}: {user: localStr | null, visited: string | unknown} = useAppSelector((state: RootState) => state.auth);
  const {search}: {search: string} = useAppSelector((state: RootState) => state.product)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userLoc, setUserloc] = useState<localStr>({});
  
  useEffect(() => {
    if(user){
      setUserloc(user)
    }
  }, [user])

  return (
    <>
      
      <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand style={{marginLeft: "-3rem", cursor: "pointer"}} onClick={() =>{ 
                navigate("/")
                dispatch(setVisited("Home"));
              }} 
              className='mt-0 d-flex' 
            >
              <img
                alt=""
                src="https://cdn.dribbble.com/users/2948332/screenshots/5926397/4.jpg"
                width="50"
                height="50"
                className="d-inline-block align-top"
              />{'    '}
              <h1 style={{marginLeft: "1rem"}}>ShopLand</h1>
            </Navbar.Brand>
            {(visited === "Home") && (
              <Form style={{display: "flex", marginLeft: "6rem"}}>
                <Form.Control
                  style={{width: "30rem"}}
                  type="text"
                  value={search}
                  onChange={(e) => {
                    dispatch(setSearch(e.target.value));
                    dispatch(getSearchProduct(search));
                  }}
                />
                <div style={{backgroundColor: "blue", borderRadius: "0.3rem", color: "white", width: "4rem", height: "2.4rem", marginLeft: "1rem"}}>
                  <SearchIcon 
                    style={{fontSize: "10x", marginLeft: "1.2rem", marginTop: "0.4rem", cursor: "pointer"}}
                  />
                </div>
              </Form>
            )}
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end"/>
            {user ? (
              <div className='cc'>
                {userLoc.result&&(
                  <div className='notifi'>
                    <EjectIcon style={{marginTop: "-3rem", color: "white", marginLeft: "18.7rem"}}/>
                    <div style={{marginLeft: "1rem", marginRight: "1rem"}}>
                      <h3 style={{color: "yellow"}}>Notification</h3>
                      <hr/>
                      {userLoc.result!.notification?.map((n: Notifi) => (
                        <>
                          <div onClick={() => {
                            dispatch(getProduct(n.idProduct));
                            navigate(`/product/${n.idProduct}`)
                          }} style={{color: "red"}}>{`${n.nameShop} had posted a new product`}</div>
                        </>
                      ))}
                      <hr/>
                    </div>
                  </div>

                )}
                <Navbar.Collapse id="justify-content-end cc" style={{position: "absolute", right: "-10rem", cursor: "pointer"}}>
                  <Nav className="me-auto">
                    <div className='noti' 
                      onClick={() => {
                        document.querySelector(".notifi")?.classList.toggle("add");
                      }}
                    >
                      <NotificationsIcon className='noti' style={{color: "white", fontSize: "2.2rem", position: "absolute", left:"-3rem", top: "0.3rem"}} />
                      <small style={{marginLeft: "-3rem"}} className='cart'>{userLoc.result?.notification?.length}</small>
                    </div>
                    <ShoppingCartIcon onClick={() => navigate("/cart")} style={{color: "white", fontSize: "2.2rem", marginTop: "0.4rem", marginRight: "1rem"}}/>
                    <small className='cart'>{userLoc.result?.cart?.length}</small>
                    <Image style={{width: "2rem", height: "2rem", right: "-1.6rem", top: "0.3rem", position: "absolute", borderRadius: "50%"}} src={userLoc.result?.avatar}/>
                    <NavDropdown title={userLoc.result?.name} id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={() => {
                        navigate('/account')
                        dispatch(getUser(user));
                        dispatch(getShop(userLoc.result?.idBrand!));
                        dispatch(getProducts());
                      }}>Account</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item 
                        onClick={() => {
                          navigate("/login");
                          dispatch(setLogout());
                        }}
                      >
                        Log out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            ): (
              <Nav className='me-auto justify-content-end' style={{position: "absolute", right: "1.8rem"}}>
                <Nav.Link onClick={() => {
                  navigate("/login")
                  dispatch(setVisited("Login"));
                }}>Login</Nav.Link>
                <Nav.Link>|</Nav.Link>
                <Nav.Link onClick={() => {
                  navigate("/register")
                  dispatch(setVisited("Register"));
                }}>Register</Nav.Link>
              </Nav>
            )}
          </Container>
          
        </Navbar>
    </>
  )
}

export default Header