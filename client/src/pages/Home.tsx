import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../interface/Product';
import { getProduct } from '../redux/feature/productSlice';
import { getShop, getShops } from '../redux/feature/shopSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import Category from './components/Category';
import ProductSlice from './components/ProductSlice';
import Suggestion from './components/Suggestion';

function Home() {
  const {products, searchProducts, search}: {products: Product[], searchProducts: Product[], search: string} = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = (id: string, brand: string) => {
    dispatch(getProduct(id));
    dispatch(getShop(brand));
    dispatch(getShops());
    navigate(`/product/${id}`);
  }
  
  return (
    <div className='home'>
      {search===""?(
        <>
          <ProductSlice/>
          <Category/>
          <Suggestion products={products} handleClick={handleClick}/>
        </>
      ): (
        <Suggestion products={searchProducts} handleClick={handleClick}/>
      )}
    </div>
  )
}

export default Home