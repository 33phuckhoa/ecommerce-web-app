import React, { ChangeEvent, useEffect, useState } from 'react' 
import { Button, Form } from 'react-bootstrap';
import { localStr } from '../../interface/Auth';
import { updateUser } from '../../redux/feature/authSlice';
import { useAppDispatch } from '../../redux/hooks';
// import FileBase from 'react-file-base64';

const Profile = ({user}: {user: localStr}) => {
  const [formValue, setFormValue] = useState({
    name: user.result?.name,
    email: user.result?.email,
    avatar: user.result?.avatar
  })
  const dispatch = useAppDispatch();
  
  const handleChange = (
    e: ChangeEvent<{ value: string, name: string }>
  ) => setFormValue({...formValue, [e.currentTarget.name]: e.currentTarget.value}); 

  useEffect(() => {
    console.log(formValue); 
  }, [formValue])

  const {name, email, avatar} = formValue;
  return (
    <div className='a crash'>
      
      <div className='home'>
        <h1 style={{color: "black"}}>Profile</h1>
        <hr style={{width: "56rem", fontWeight: "bold"}}/>
        <div>
          <div className='information'>
            <div style={{margin: '2rem 0'}}>
              <span>Your account name: </span>
              <Form.Control name='name' onChange={handleChange} value={name} style={{width: "17rem", marginLeft: "0.4rem", marginTop: "-0.2rem"}} type="text" placeholder="Normal text" />
            </div>
            <div style={{margin: '2rem 0'}}>
              <span>Your account name: </span>
              <Form.Control name='email' onChange={handleChange} value={email} style={{width: "17rem", marginLeft: "0.4rem", marginTop: "-0.2rem"}} type="text" placeholder="Normal text" />
            </div>
          </div>
          <div className='separated'></div>
          <div className="avatar">
            <img style={{borderRadius: "50%", width: "7rem", height: "7rem"}} width={'120'} alt='' src={avatar}/>
            <Form.Control name='avatar' onChange={handleChange} value={avatar} style={{width: "17rem", marginLeft: "0.4rem", marginTop: "-0.2rem"}} type="text" placeholder="Normal text" />
          </div>
        </div>
        <Button 
          onClick={() => {
            if(name && email && avatar){
              dispatch(updateUser({name, email, avatar}));
            }
          }} 
          style={{marginTop: "6rem"}}
        >
          Save
        </Button>
      </div>
    </div>
  )
}

export default Profile