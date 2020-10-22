import React from 'react';
import Image from 'react-bootstrap/Image'
import "./style.css"

/**
* @author
* @function Layout
**/

const Layout = (props) => {
  console.log(props, 'lay')
  return(
    <div className="loginContainer">
        <div className="card1">
            { 
              (props.children.props.className === 'login') ?
              
                    <Image className="image-filter"src={require('../../ASSETS/img2.png')} fluid /> :
                 
               
                      <Image className="image-filter"src={require('../../ASSETS/signup1.png')} fluid />
                 
            }
            <div className="image-overlay">
              <div>
                <Image  src={require('../../ASSETS/img10.png')} fluid />   
              </div>
              <div className="rewiring">
                Rewiring Work
              </div>
            </div > 
        </div>
        <div className="card2">
          {props.children}
        </div>     
    </div>
  )
}

export default Layout