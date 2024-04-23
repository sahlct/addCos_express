import React, { useState } from 'react';
import './homepage.css';
import axios from 'axios';

export default function Homepage(props) {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:8000/testapi", {
        name: name,
        place: place,
        phone: phone
      });
      
      console.log("Form data submitted successfully:", response.data);
      setName("");
      setPlace("");
      setPhone("");
      props.updateUi();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  function dataUpdate(){
    console.log("helo");
  }

  return (
    <div className="container">
      <h2>Responsive Form</h2>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="place">Place:</label>
          <input type="text" id="place" name="place" placeholder="Enter your place" value={place} onChange={(e) => setPlace(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <small>Format: 10 digits</small>
        </div>
        <button type="submit" className="btn-submit">Submit</button>
        <button className='updateButton' onClick={() => dataUpdate()}>Update</button>
      </form>
    </div>
  );
}
