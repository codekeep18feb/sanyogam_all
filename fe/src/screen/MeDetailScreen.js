import React, { useState } from "react";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
import logo192 from "../images/Vector.jpg"; // Adjust the path based on your project structure

export default function MeDetailScreen({ authData, editMode, SeteditMode }) {
  // Define state variable for edited data
  const [editedData, setEditedData] = useState({
    fname: authData.fname,
    lname: authData.lname,
    image: authData.image, // Include image in the state
  });

  // Function to handle saving data and making the POST request
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to send the data
      const formData = new FormData();
      formData.append("fname", editedData.fname);
      formData.append("lname", editedData.lname);
      formData.append("image", editedData.image); // Add image to the FormData

      // Make the POST request
      // const response = await fetch('http://192.168.1.2:8000/api/update_profile/1', {
      //   method: 'POST',
      //   body: formData,
      // });

      // Rest of your code for handling the response and exiting edit mode...
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Define your form JSX here
  const form = (
    <form>
      {/* Your form fields go here */}
      <input
        type="text"
        placeholder="First Name"
        value={editedData.fname}
        onChange={(e) =>
          setEditedData({ ...editedData, fname: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="Last Name"
        value={editedData.lname}
        onChange={(e) =>
          setEditedData({ ...editedData, lname: e.target.value })
        }
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setEditedData({ ...editedData, image: e.target.files[0] })
        }
      />
      {/* Display the image */}
      {/* <img src={editedData.image} alt="Profile Image" /> */}
      {/* Add other form fields as needed */}
      <button onClick={(e) => handleSave(e)}>Save</button>
    </form>
  );

  // Define your div JSX here
  const div = (
    <div
      style={{
        border: "1px solid grey",
        borderRadius: "50%",
        padding: "20px",
        background: "white",
      }}
    >
      {/* <p>Welcome, {authData.fname} {authData.lname}</p> */}
      {/* Display the image */}
      {/* <img src={`data:image/jpeg;base64, ${authData.image}`} alt="Profile Image" /> */}

      <img src={logo192} alt="Logo" />

      {/* <PhotoCamera /> */}

      {/* <button onClick={() => SeteditMode(true)}>Edit</button> */}
    </div>
  );

  // Render either the form or the div based on the editMode state
  return editMode ? form : div;
}
