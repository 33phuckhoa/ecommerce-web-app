import React, { ChangeEvent, useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useNavigate } from 'react-router-dom';
import { login, signInGoogle } from '../redux/feature/authSlice';
import { useAppDispatch } from '../redux/hooks';
import GoogleLogin from 'react-google-login';
import { googleAuthInt } from '../interface/Auth';
import { toast } from 'react-toastify';



function Login() {
  const dispatch = useAppDispatch();;
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
  });

  const {email, password} = formValue;

  const handleChange = (
    e: ChangeEvent<{ value: string, name: string }>
  ) => setFormValue({...formValue, [e.currentTarget.name]: e.currentTarget.value}); 

  const handleSubmit = () => {
    if(email && password) {
      const res= {
        formValue,
        navigate
      }
      dispatch(login(res));
    }
  }


  const googleSuccess = async(resp: googleAuthInt): Promise<void> => {
    const email = resp?.profileObj?.email;
    const name = resp?.profileObj?.name;
    const token = resp?.tokenId;
    const googleId = resp?.googleId;
    const res = { email, name, token, googleId };
    console.log(res);
    dispatch(signInGoogle({ formValue: res, navigate}));
    
  };
  const googleFailure = (error: any) => {
    toast.error(error);
  };


  return (
    <div className='login'>
      <div>
        <Card className='form' >
        <h1 className='h1 primary'>Log in</h1>
        <Card.Body>
          <Form noValidate >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email} 
              type="email" 
              name="email"
              placeholder="Enter email" 
              onChange={handleChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              value={password} 
              name="password"
              type="password" 
              placeholder="Password" 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          
          <Button variant="secondary" className='btn'  onClick={handleSubmit}>
            Login
          </Button>
        </Form>
        </Card.Body>
        <Card.Footer style={{display: "flex"}}>
            <GoogleLogin
              clientId="1075517526665-3ects4hh83ces26c1c0il3dembpogel4.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button variant='warning' className='bn'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <GoogleIcon/> Google
                </Button>
              )}
              
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
              responseType='code,token' 
            />
            <Button className='bn' type='button'>
              <FacebookIcon/> Facebook
            </Button>
        </Card.Footer>
      </Card>
      </div>
    </div>
  )
}

export default Login