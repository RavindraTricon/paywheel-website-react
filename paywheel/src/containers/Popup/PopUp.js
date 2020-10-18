import React, { useState } from "react";
import './popup.css';
import Form from 'react-bootstrap/Form';
import format from 'date-fns/format'
import Basic from '../../Email'
import SearchLocationInput from '../../Gplace'


const PopUp = (props) => {
    if( props.data.action) {
        var addPlan = true;
        var link = 'https://video.stringmatrix.com/' + Math.random().toString(36).substring(7);
        var titlee = ''
    } else {
        addPlan = false;
        link = props.data.videoLink;
        titlee = props.data.title;
    }

    var startTimeing = format(props.data.start, "yyyy-MM-dd'T'HH:mm");
    var endTimeing = format(props.data.end, "yyyy-MM-dd'T'HH:mm");

    const [startTime, onStartTimeChange] = useState(startTimeing);
    const [endTime, onEndTimeChange] = useState(endTimeing);
    const [description, onDescriptionChange] = useState(props.data.description);
    const [videoConferencing, onVideoConferencingChange] = useState(props.data.videoCall);
    const [emails, setEmails] = useState(props.data.contacts);
    const [title, setTitle] = useState(titlee);
    const [videoLink] = useState(link);
    const [location, setLocation] = useState(props.data.location);

    function handleClick () {
        props.toggle();
    };
    async function handleSubmit(event) {
        if (startTime && endTime && title && description && emails && videoConferencing && videoLink) {
            const body = {startTime, endTime, title, description, emails, videoConferencing, videoLink ,location}
            props.submit(body);  
        } else {
            
            window.alert('Please provide required Field for Event');
        }
         
    } 
     async function handleUpdate(event) {
        const body = {startTime, endTime, title, description, emails, videoConferencing, videoLink, location}
        props.update(body,props.data.id);  
    } 

    function handleTitleChange(evt) {
        setEmails(evt);
    }
    function handleLocationChange(evt) {
        setLocation(evt);
    }
    
    function handleDelete() {
        props.delete(props.data.id);
    }

    const style = {
        'maxWidth': '420px',
        "maxHeight": '180px',
        'marginBottom': '20px',
        'borderRadius': '15px',
        'padding': '10px',
        'borderColor': 'lightgrey'
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
                        <strong>Title</strong>
                        <span className="starttimepicker">
                            <Form.Group>
                                    <Form.Control type="text" placeholder="Enter Title" 
                                        required
                                        value={title}
                                        onChange={event => {
                                        setTitle(event.target.value);}}
                                    />
                            </Form.Group>
                        </span>
                    </div>
                    <div className="starttime">
                        <strong>Start Time</strong>
                        <span className="starttimepicker">
                            <Form.Group controlId='time'>
                                    <Form.Control type="datetime-local" placeholder="Enter Date" 
                                        required
                                        value={startTime}
                                        onChange={event => {
                                        onStartTimeChange(event.target.value);}}
                                    />
                            </Form.Group>
                        </span>
                    </div>                        

                    <div className="starttime">
                        <strong>End Time</strong>
                        <span className="starttimepicker">
                             <Form.Group controlId='time'>
                                    <Form.Control type="datetime-local" placeholder="Enter Date" 
                                        required
                                        value={endTime}
                                        onChange={event => {
                                        onEndTimeChange(event.target.value);}}
                                        min={startTime}
                                    />
                            </Form.Group>
                        </span>
                    </div>
                    {/* <div className="starttime">
                        <strong>Location</strong>
                        <span className="starttimepicker">
                            <SearchLocationInput onLocationChange={handleLocationChange} location={location}/>
                        </span>
                    </div> */}
                    <Basic onTitleChange={handleTitleChange} emails={emails}/>
                    <div className="">
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Add Video Conferencing" 
                                value={videoConferencing} 
                                checked={props.data.videoCall}
                                onChange={event => {
                                    onVideoConferencingChange(!videoConferencing);
                                }}
                            />
                            </Form.Group>
                          
                            { videoConferencing ? 
                                <div>
                                    <a href={videoLink} rel="noopener noreferrer" target="_blank">{videoLink}</a>
                                </div>
                                : 
                                <div></div>
                            }
                    </div>
                    <div>
                        <h4>Event Description</h4>
                        <textarea style={style} rows="2" cols="100" 
                            value={description} 
                            required
                            onChange={event => {
                                    onDescriptionChange(event.target.value);
                            }}
                        ></textarea>
                    </div>
                    <div className="plan-button-popup">


                        { addPlan ? 
                            <div>
                                <button onClick={() => {handleSubmit();handleTitleChange()}} >Add Plan</button>
                            </div>
                            : 
                            <div>
                            <button onClick={() => {handleDelete();}} >Delete</button>
                            <button onClick={() => {handleUpdate();handleTitleChange()}} >Update</button>
                            </div>
                        }
                    </div>
                </div>
        </div>
   </div>
  );
 }

 export default PopUp ;


 