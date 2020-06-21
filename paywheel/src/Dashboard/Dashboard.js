import React from 'react';
import './Dashboard.scss';
function Dashboard() {
  return (
      <div className="dashboard">
          <div className="frame">
          <img className='attendance' src={ require('../assest/attendance.png') } />
          </div>
      </div>
  );
}

export default Dashboard;
