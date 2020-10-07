import React from 'react';
import './header.scss';
import { Link } from "react-router-dom";
function header() {
  return (
    <div className="_header">
        <div className="top">
            <Link to="/">
                <div className="topleft">
                    <h3 className="heading">Home</h3>
                </div>
            </Link>
            {/* <Link to="/planner">
                <div className="topleft">
                    <h3 className="heading">Planner</h3>
                </div>
            </Link>
            <Link to="/web">
                <div className="topleft">
                    <h3 className="heading">WebCheck In</h3>
                </div>
            </Link> */}
            <Link to="/schedular">
                <div className="topleft">
                    <h3 className="heading">Task Schedular</h3>
                </div>
            </Link>
            <div className="topright">
                <div className="images rounded-circle profileicon">
                    <span className="text-In-Image">RN</span>
                </div>
            </div>
        </div>
    </div>
  );
}

export default header;
