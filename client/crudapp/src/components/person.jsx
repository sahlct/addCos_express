import React from 'react';
import './person.css';
import axios from 'axios';

export default function Person(props) {
  console.log("person props is ",props);
  const dataDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/testapi/${id}`);  
      console.log("Id deleted successfully:", response.data);
      props.updateUi()
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }
  
  // const fullData = {
  //   id: props.item.id,
  //   name: props.item.name,
  //   place: props.item.place,
  //   phone: props.item.phone
  // }
  function dataPass(id){
    props.dataUpdate(id)
  }

  
  return (
    <div className='personContainer'>
        <div className="datas">
        <div className="userName">{props.item.name}</div>
        <div className="userNumber">{props.item.place}</div>
        <div className="userPlace">{props.item.phone}</div>
        </div>
        <div className="controls">
            <button className='delete' onClick={() => dataDelete(props.item.id)}>Delete</button>
            <button className='edit' onClick={() => dataPass(props.item.id)}>Edit</button>
        </div>
    </div>
  )
}
