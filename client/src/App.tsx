/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Header from './pages/components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer} from 'react-toastify';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { localStr, User } from './interface/Auth';
import { getAll, getUser, setVisited } from './redux/feature/authSlice';
import { getProduct, getProducts } from './redux/feature/productSlice';
import Tag from './pages/Tag';
import CartUser from './pages/CartUser';
import Product from './pages/ProductItem';
import Account from './pages/Account';
import Profile from './pages/components/Profile';
import YourShop from './pages/components/YourShop';
import Avaluate from './pages/components/Avaluate';
import { RootState } from './redux/store';
import ShopUser from './pages/ShopUser';
import { Conservation, Shop } from './interface/Shop';
import Messenger from './pages/Messenger';  
import { getShop, getShops } from './redux/feature/shopSlice';
import AddEditPage from './pages/components/AddEditPage';
import DashBoard from './pages/components/DashBoard';
import Suggestion from './pages/components/Suggestion';

function App() {
  const dispatch = useAppDispatch();
  const {user, users, searchUser}: {user: localStr | null, users: User[], searchUser: User[]} = useAppSelector((state: RootState) => state.auth); 
  const {shop, shops}: {shop: Shop | null, shops: Shop[]} = useAppSelector((state: RootState) => state.shop)
  const {products, searchProducts} = useAppSelector((state: RootState) => state.product); 
  const [userState, setUserState] = useState<localStr>({});
  const [avaluate, setValuate] = useState<string[]>([]);
  const [mess, setMess] = useState<Conservation[]>([]);
  const [shopOff, setShopOff] = useState<Shop>();

  useEffect(() => {
    const user: localStr = JSON.parse(localStorage?.getItem("profile")!);
    dispatch(getUser(user));
    dispatch(setVisited("Home"));
    dispatch(getProducts());  
    dispatch(getAll());
    dispatch(getShops())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    if(user && shops && shop){
      setUserState(user);
      setValuate(user['result']['waitingLine']);
      setShopOff(shop);
    }
  }, [user, shop]);

  useEffect(() => {
    if(shops){
      for(let i = 0 ; i < shops.length; i++){
        for(let j = 0; j < shops[i].conser.length; j++){
          if(shops[i].conser[j].userId===userState.result?._id){
            let check: boolean = false;
            for(let z = 0; z < mess.length; z++){
              if(mess[z].shopId===shops[i].conser[j].shopId){
                check = true;        
                break;
              }
              else {
                check = false;
              }
            }
            if(!check){
              setMess([...mess, shops[i].conser[j]]);
            }
          }
        }
      }
    }
  }, [shops, user, shop])

  return (
    <div className='app'>
      <Router>
        <Header/>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/tag/:tag' element={<Tag products={searchProducts}/>}/>
          <Route path='/product/:id' element={<Product/>}/>
          <Route path='/shopUser' element={<ShopUser user={userState} shop={shopOff!} products={products}/>}/>
          <Route path='/cart' element={<CartUser/>}/>
          <Route path='/chat/:id' element={<Messenger mess={mess} state={"client"} shops={shops}/>}/>
          <Route path='/account' element={<Account user={userState} shop={shopOff!}/>}>
            <Route index element={<Profile user={userState}/>}/>
            <Route path='' element={<Profile user={userState}/>}/>
            <Route path='dashboard' element={<DashBoard shop={shopOff!} products={products}/>}/>
            <Route path='format/*' element={<AddEditPage shop={shopOff!} products={products}/>}/>
            <Route path='avaluate' element={<Avaluate avaluate={avaluate} products={products}/>}/>
            <Route path='shop' element={<YourShop user={userState} shop={shopOff!} users={users} searchUser={searchUser}/>}/>
          </Route>
        </Routes>
        <ToastContainer/>
      </Router>
    </div>
  );
}

export default App;
