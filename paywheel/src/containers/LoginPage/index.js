import React, { useState } from 'react'
import Layout from '../../components/Layout';
import { signin } from '../../actions';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image'
import { NavLink } from 'react-router-dom';

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
        <div className="login">
          <div className="icon-heading">
            <Image src={require('../../ASSETS/logoblack.png')} fluid />  
          </div>
          <h3 className="login-heading">Login</h3>
          <form onSubmit={userLogin}>
          <Form.Group controlId='Email'>
              <label className="label">Email address</label>
              <Form.Control  name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId='password'>
              <label className="label">Password</label>
              <Form.Control  nname="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Form.Group>
            <div>
              <button className="login-btn">Login</button>
            </div>
          </form>
          <div className="LoginWith">Login With</div>
          <div className="Loginicon">
            <Image className="icon" src={require('../../ASSETS/img4.png')} fluid />   
            <Image  className="icon" src={require('../../ASSETS/img7.png')} fluid />  
            <Image className="icon" src={require('../../ASSETS/github1.png')} fluid />   
            <Image  className="icon" src={require('../../ASSETS/linkedin.png')} fluid />  
          </div>
          <div className="signupheading">
            To create a new account <span className="signup"><NavLink to={'/signup'}>Sign up</NavLink></span>
          </div>
        </div>     
    </Layout>
   )

 }

export default LoginPage