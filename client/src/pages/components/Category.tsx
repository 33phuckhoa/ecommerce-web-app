import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getTag } from '../../redux/feature/productSlice';
import { useAppDispatch } from '../../redux/hooks';

const Category = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = (tag: string) => {
        dispatch(getTag(tag));
        navigate(`/tag/${tag}`);
    }

    return (
        <div className='category'>
            <h3>Category</h3>
            <div className='block'>
                <div className='item'
                    onClick={() => handleClick("men'sfashion")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/687f3967b7c2fe6a134a2c11894eea4b_tn'/>
                    <div>Men's fashion</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("phone&ac")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/31234a27876fb89cd522d7e3db1ba5ca_tn'/>
                    <div>Phones and Accessories</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("elecDevice")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/978b9e4cb61c611aaaf58664fae133c5_tn'/>
                    <div>Electronic device</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("com&lap")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/c3f3edfaa9f6dafc4825b77d8449999d_tn'/>
                    <div>Computer and Laptop</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("ca&cam")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/ec14dd4fc238e676e43be2a911414d4d_tn'/>
                    <div>Camera and Camcorder</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("clock")}
                >
                    
                    <img alt="" src='https://cf.shopee.vn/file/86c294aae72ca1db5f541790f7796260_tn'/>
                    <div>Clock</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("men'sshoes")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/74ca517e1fa74dc4d974e5d03c3139de_tn'/>
                    <div>Men's shoes</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("houAppli")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/7abfbfee3c4844652b4a8245e473d857_tn'/>
                    <div>Household appliances</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("spo&tra")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/6cb7e633f8b63757463b676bd19a50e4_tn'/>
                    <div>Sport and Travel</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("moto&bi")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/3fb459e3449905545701b418e8220334_tn'/>
                    <div>Motorcycles and Bicycles</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("women'sfashion")}
                >
                    
                    <img alt="" src='https://cf.shopee.vn/file/75ea42f9eca124e9cb3cde744c060e4d_tn'/>
                    <div>Women's fashion</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("mo&ba")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/099edde1ab31df35bc255912bab54a5e_tn'/>
                    <div>Mother and Baby</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("hou&li")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/24b194a695ea59d384768b7b471d563f_tn'/>
                    <div>House and Life</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("beauty")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/ef1f336ecc6f97b790d5aae9916dcb72_tn'/>
                    <div>Beauty</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("healthy")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/49119e891a44fa135f5f6f5fd4cfc747_tn'/>
                    <div>Healthy</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("women'sshoes")}
                >
                    
                    <img alt="" src='https://cf.shopee.vn/file/48630b7c76a7b62bc070c9e227097847_tn'/>
                    <div>Women's shoes</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("women'spurse")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/fa6ada2555e8e51f369718bbc92ccc52_tn'/>
                    <div>Women's purse</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("wo'sac")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/8e71245b9659ea72c1b4e737be5cf42e_tn'/>
                    <div>Women's accessories</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("ondepart")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/c432168ee788f903f1ea024487f2c889_tn'/>
                    <div>Online department</div>
                </div>
                <div className='item'
                    onClick={() => handleClick("onBook")}
                >
                    <img alt="" src='https://cf.shopee.vn/file/36013311815c55d303b0e6c62d6a8139_tn'/>
                    <div>Online bookstore</div>
                </div>
            </div>
        </div>
    )
}

export default Category