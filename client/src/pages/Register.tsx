import React, { ChangeEvent, useState } from 'react'
import { Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../redux/feature/authSlice';
import { useAppDispatch } from '../redux/hooks'

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [pass, setPass] = useState("");

  const {name, email, password} = formValue;

  const handleChange = (
    e: ChangeEvent<{ value: string, name: string }>
  ) => setFormValue({...formValue, [e.currentTarget.name]: e.currentTarget.value}); 

  const handleSubmit = () => {
    
    if(email && password) {
      if(password === pass){
        const res= {
          formValue,
          navigate
        }
        dispatch(register(res));
      }
      else {
        toast.error("Information is not matched");
      }
    }
  }

  return (
    <div className='login'>
      <div>
        <Card className='form' style={{top: "0.5rem"}}>
        <h1 className='h1 primary'>Register</h1>
        <Card.Body>
          <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control name="name" value={name} onChange={handleChange} type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control name="email" value={email} onChange={handleChange} type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" value={password} onChange={handleChange} type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        </Card.Body>
        <Card.Footer onClick={handleSubmit} style={{cursor: "pointer", backgroundColor: "rgb(117, 145, 180)",display: "flex", textAlign: "center"}}>
            <h4 style={{textAlign: "center"}}>Register</h4>
        </Card.Footer>
      </Card>
      </div>
    </div>
  )
}

export default Register