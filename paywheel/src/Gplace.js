// import React, { useState, useRef } from "react";
// import Form from 'react-bootstrap/Form';

// let autoComplete;
//       async function handleScriptLoad(updateQuery, autoCompleteRef) {
//         autoComplete = new window.google.maps.places.Autocomplete(
//           autoCompleteRef.current,
//           { types: ["(cities)"] }
//         );
//         autoComplete.setFields(["address_components", "formatted_address"]);
//         await autoComplete.addListener("place_changed", () =>
//         handlePlaceSelect(updateQuery)
//         );
//       }

    
//       const loadScript = (url, callback) => {
//       let script = document.createElement("script");
//       script.type = "text/javascript";
//       if (script.readyState) {
//         script.onreadystatechange = function() {
//           if (script.readyState === "loaded" || script.readyState === "complete") {
//             script.onreadystatechange = null;
//             callback();
//           }
//         };
//       } else {
//         script.onload = () => callback();
//       }
//       script.src = url;
//       document.getElementsByTagName("head")[0].appendChild(script);
//     };
//     async function handlePlaceSelect(updateQuery) {
//         const addressObject = autoComplete.getPlace();
//         const query = addressObject.formatted_address;
//         updateQuery(query);
//         var location = query; 
//         localStorage.setItem('user', JSON.stringify(addressObject.formatted_address));
//       }

// function SearchLocationInput(props) {

//   if(props.location) {
//     var location = props.location
//   } else {
//     location = '';
//   }
//   const [query, setQuery] = useState(location);
//   const autoCompleteRef = useRef(null);
  
//   React.useEffect(() => {
//     loadScript(
//         `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfEY58fa-cccuUHF9QQyxToZPqeWELJ4s&libraries=places`,
//         () => {handleScriptLoad(setQuery, autoCompleteRef);
//           props.onLocationChange(JSON.parse(localStorage.getItem('user')));

//         }
//       );
//     },[]
//   );

//   return (
//     <div className="search-location-input">
//     <Form.Group controlId='time'>
//         <Form.Control type="text"
//             ref={autoCompleteRef}
//             onChange={event => { setQuery(event.target.value);}}
//             placeholder="Enter a City"
//             value={query}
//         />
//      </Form.Group>
//     </div>
//   );
// }

// export default SearchLocationInput;

import React, { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
  console.log(addressObject);
}

function SearchLocationInput() {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBfEY58fa-cccuUHF9QQyxToZPqeWELJ4s&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  return (
    <div className="search-location-input">
     <Form.Group controlId='location'>
        <Form.Control type="text"
            ref={autoCompleteRef}
            onChange={event => { setQuery(event.target.value);}}
            placeholder="Enter a City"
            value={query}
        />
     </Form.Group>
    </div>
  );
}

export default SearchLocationInput;