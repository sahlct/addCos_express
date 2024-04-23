import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Modal({ showModal, closeModal, updateUi , data}) {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");
  const [id, setId] = useState("")

  useEffect(() => {
    if (data) {
      setName(data.name);
      setPlace(data.place);
      setPhone(data.phone);
      setId(data.id);
    }
  }, [data]);
  

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
      updateUi();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const dataChange = async (id) => {
    closeModal()
    const currentId = id;
    console.log("current id : ", currentId);
    try {
      const response = await axios.put(`http://localhost:8000/testapi/${currentId}`,
        {
            name: name,
            place: place,
            phone: phone,
            id: id
        }
    );
      console.log("Updated data:", response.data);
      setName("");
      setPlace("");
      setPhone("");
      // Do something with the updated data, such as updating the UI
      updateUi(); // Assuming updateUi is a function passed as a prop to trigger a UI update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal Title</h5>
            <button type="button" className="close" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="place">Place:</label>
                <input type="text" id="place" name="place" value={place} onChange={(e) => setPlace(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                {data.id ? (
  <button type="button" onClick={()=> dataChange(id)} >Update</button>) : ( <button type="submit" className="btn btn-primary">Submit</button> )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

