import React, { useState } from "react";
import './popup.css';
import Form from 'react-bootstrap/Form';
import format from 'date-fns/format'

import Basic from '../Email'

const PopUp = (props) => {

        var startTimeing = format(props.data.start, "yyyy-MM-dd'T'HH:mm");
        var endTimeing = format(props.data.end, "yyyy-MM-dd'T'HH:mm");

    const [startTime, onStartTimeChange] = useState(startTimeing);
    const [endTime, onEndTimeChange] = useState(endTimeing);
    const [description, onDescriptionChange] = useState(props.data.title);
    const [videoConferencing, onVideoConferencingChange] = useState(false);
    const [emails, setEmails] = useState(props.data.contacts);

    function handleClick () {
        props.toggle();
    };
    async function handleSubmit(event) {
        const body = {startTime, endTime, description, emails, videoConferencing}
        props.submit(body);  
    } 

    function handleTitleChange(evt) {
        setEmails(evt);
    }
    const style = {
        'maxWidth': '510px',
        "maxHeight": '180px',
        'marginBottom': '20px',
        'borderRadius': '15px',
        'padding': '10px'
    }

  return (
   <div className="calenderpopup">
        <div className="popupForm">
            <div className="popupContent">
                <span className="close" onClick={handleClick}>&times;    </span>
                    <div className="popup-date">
                        Add Event
                    </div>
                    <div className="starttime">
                        <span>Start Time</span>
                        <span className="starttimepicker">
                            <Form.Group controlId='time'>
                                    <Form.Control type="datetime-local" placeholder="Enter Date" 
                                        required
                                        value={startTime}
                                        onChange={event => {
                                            console.log(event)
                                        onStartTimeChange(event.target.value);}}
                                    />
                            </Form.Group>
                        </span>
                    </div>
                    <div className="endtime">
                        <span>End Time</span>
                        <span className="starttimepicker">
                             <Form.Group controlId='time'>
                                    <Form.Control type="datetime-local" placeholder="Enter Date" 
                                        required
                                        value={endTime}
                                        onChange={event => {
                                        onEndTimeChange(event.target.value);}}
                                    />
                            </Form.Group>
                        </span>
                    </div>
                    <Basic onTitleChange={handleTitleChange} emails={emails}/>
                    <div className="">
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Add Video Conferencing" 
                                value={videoConferencing} 
                                onChange={event => {
                                    onVideoConferencingChange(!videoConferencing);
                                }}
                            />
                            </Form.Group>
                    </div>
                    <div>
                        <h3>Event Description</h3>
                        <textarea style={style} rows="4" cols="100" 
                            value={description} 
                            onChange={event => {
                                    onDescriptionChange(event.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="plan-button">
                        <button onClick={() => {handleSubmit();handleTitleChange()}} >Add Plan</button>
                    </div>
                </div>
        </div>
   </div>
  );
 }

 export default PopUp ;