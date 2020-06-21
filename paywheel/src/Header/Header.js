import React from 'react';
import './header.scss';
function header() {
  return (
    <div className="header">
        <div className="top">
            <div className="topleft">
                <h3 className="heading">Tricon Infotech</h3>
            </div>
            <div className="topright">
                <div className="images rounded-circle profileicon">
                    <span className="text-In-Image">RN</span>
                </div>
            </div>
        </div>
        <div class="content">
            <h2 class="greeting">Hello,</h2>
            <h2 class="username">Ravindra Nath</h2>
            <p class="header-date">30 May, 2020</p>
        </div>
    </div>
  );
}

export default header;
