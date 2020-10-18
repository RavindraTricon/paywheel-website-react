import React, { useState } from 'react'
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import { signin } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

/**
* @author
* @function LoginPage
**/

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  const userLogin = (e) => {
    e.preventDefault();

    if(email === ""){
      alert("Email is required");
      return;
    }
    if(password === ""){
      alert("Password is required");
      return;
    }

    dispatch(signin({ email, password }));

  }


  if(auth.authenticated){
    return <Redirect to={`/`} />
  }



  return(
    <Layout>
      <div className="loginContainer">
        <Card>
          <h3>Login</h3>
          <form onSubmit={userLogin}>
          <Form.Group controlId='time'>
              <Form.Control  name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

          </Form.Group>
          <Form.Group controlId='time'>
              <Form.Control  nname="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
            <div>
              <button>Login</button>
            </div>

          </form>
        </Card>
      </div>
    </Layout>
   )

 }

export default LoginPage