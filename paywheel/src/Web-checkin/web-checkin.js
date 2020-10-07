import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './web-checkin.scss';
function Webcheckin() {
  const [webDetails, setDetails] = useState([]);
  // const [requestError, setRequestErrors] = useState();
  const accessToken = 'x7L-Pxb9kWXfUNOPg92n5jku1BShWhXIgvst7LVWpUAhxqNNo_Qotjyl5jkouY5mN4peD-zhLCmcvBltJCL5YXbPWGPaABilzXWdA3evg0QcSEF9u6JSHTo2Lj5h1yTgdY3EbE1J9LB5nO5rw2DbYIHLiiAPYRW9GKdMOsHkujQYrAxJLbRdK3PipmmddHyjlN3TBY7ZQdgm0Lc5ySWYgbjxvYWUex0XJQ1VEakkZPTJkdkyHRQmyV1VpztTj5PZPfSlQabLy3GrQf5HLJNoDdYqBkdiND5xTQM6xny0CGjPo2jL5P6v4acgKFcyO5PKM8kfuiWdE9J9nj_ft9wU_QeBEl6NtUaVgJJjZ-sZWMQ24cmaaYZThY_cEAx_YWY9qNw7aqKleudjG87cmtXG4Zh724G60y0OED27oD2x8hE-kIju2WwizyrpME-1_cLInZx6c5z_qAzI8HVzyJDBp2F_SXfiCk0A1GJvGNjM0s9Cae_yjCEdqfOVcXqV_ehE2Xijit88qz2fOjBiPZ1E9OXgbgt1T5chEKLu36cyVB4gfxBUJESKtLV_THR4vG86hcIXjGUfRl02lNsnhUkBvwwHw_bYLM1qIiD1xSq685DZiMePNlnd3DbncwyOV7Wc9buADxluutwX7RmcViH4zOrRQljv5kDFqtXB69iONojzGfiwxXAlwTyiWQ20AZqbGt_d3ynCE6Gh84bBpxA-B55f1iWTBubTUlS08Mc3zK1k7K3pkO1q4IwEZevWTTmozJCQNx625Eua2VVZeR1TBg';
  const apiUrl = 'http://172.16.16.27:4040/api/calendar';
  const empcode = '1324';
  
  axios.interceptors.request.use(
    config => {
      config.headers.authorization = `Bearer ${accessToken}`;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  )
  useEffect(() => {
    checkInHandler();
  }, []);

  const [status, setStatus] = useState(false);

  const checkInHandler = (e) => {
     axios
    .post(apiUrl+'/webCheckInEntryDetails', { "EmpCode": empcode})
    .then(response => {
      setDetails(response.data)
      if(response.data[0]?.IsChekedinOrout[0].flag === 0) {
        setStatus(false)
      } else if (response.data[0]?.IsChekedinOrout[0].flag === 1) {
        setStatus(true)
      }
    })
    .catch(error =>{
      console.log(error);
    })
  }


const checkInStatus = (e) => {
  if( status === true) {
    const body = {  
      EntryType: 0,
      EmpCode:  empcode,
      CompId: 1
    }
    axios
    .post(apiUrl+'/attendanceWebCheckinStatus', body)
    .then(response => {
      setStatus(false);
      checkInHandler();
    })
    .catch(error =>{
      console.log(error);
    })
  } else {
    const body = {  
      EntryType: 1,
      EmpCode:  empcode,
      CompId: 1
    }
    axios
    .post(apiUrl+'/attendanceWebCheckinStatus', body)
    .then(response => {
      setStatus(true);
      checkInHandler();
    })
    .catch(error =>{
      console.log(error);
    })
  }
}

  const [CurrentTime, setCheckinTime] = useState(new Date().toLocaleString('en-GB'));


  setInterval(() => {
    setCheckinTime(new Date().toLocaleString('en-GB'))
  }, 1000);
  
  return (
    <div className="webcheckin">
      <div className="web-heading">
         web checkin
      </div>
      <div className="web-time">
        <span>
          Current Time :  {CurrentTime.split(',')[1]}
        </span>
        {status ? <span className="web-button">
          <button onClick={checkInStatus}>checkOut</button>
        </span> : <span className="web-button">
          <button onClick={checkInStatus}>checkin</button>
        </span> }
      </div>
      { webDetails !== '' ? 
      <div>
      <div className="web-checkin">
        <span>         
          Total Web Check in time
        </span>
        <span className="time">
        {webDetails[0]?.totalWorkingHours}
        </span>
      </div>
      { 
      status ? 
      <div className="web-checkin">
        <span>         
          Last Web Check in time
        </span>
        <span className="time">
          {webDetails[0]?.LastCheckedIn}
        </span>
      </div> 
      : 
      <div className="web-checkout">
        <span>         
            Last Web Check out time
        </span>
        <span className="time">
        {webDetails[0]?.LastChekedOut}
        </span>
      </div>
      } 
      </div>
      :
      <div></div>
      }
    </div>
  );
}

export default Webcheckin;
