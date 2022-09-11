import React, {useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShopIcon from '@mui/icons-material/Shop';
import { localStr } from '../interface/Auth';
import { Shop } from '../interface/Shop';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useAppDispatch } from '../redux/hooks';

const Account = ({user, shop}: {user: localStr, shop: Shop}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
  }, [])

  return (
    <>
      {(
        <div className='acc'>
            <div className='navRow'>
              <div className='hover' onClick={() => navigate('/account')}>
                <AccountBoxIcon style={{marginRight: "1.2rem"}}/>
                <span>Profile</span>
              </div>
              <div className='hover' onClick={() => navigate('/account/avaluate')}>
                <AddCommentIcon style={{marginRight: "1.2rem"}}/>
                <span>Avaluate</span>
              </div>
              <div className='hover' onClick={() => navigate('/account/shop')}>
                <ShopIcon style={{marginRight: "1.2rem"}}/>
                <span>Your Shop</span>
              </div>  
              <div style={{fontSize: "0.6rem", marginLeft: "7rem", marginTop: "-2rem"}} className='hover' onClick={() => navigate('/account/format')}>
                {user.result?.idBrand&&(
                  <>
                    <div>
                      <FiberNewIcon style={{marginRight: "1.2rem"}}/>
                      <span>Add and Edit</span>
                    </div>
                  </>
                )}

              </div>  
              <div style={{fontSize: "0.6rem", marginLeft: "7rem", marginTop: "-2rem"}} className='hover' onClick={() => navigate('/account/dashboard')}>
                {user.result?.idBrand&&(
                  <>
                    <div>
                      <DashboardIcon style={{marginRight: "1.2rem"}}/>
                      <span>Dashboard</span>
                    </div>
                  </>
                )}
                
              </div>  
            </div>
            <div style={{overflowY: "scroll"}}>
              <Outlet/>
            </div>
        </div>

      )}
    </>
  )
}

export default Account