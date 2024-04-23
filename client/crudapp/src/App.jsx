import { useState, useEffect } from "react";
// import Homepage from "./components/homepage";
import Person from "./components/person";
import axios from "axios";
import "./App.css";
// import Main from "./modalcalling";
import MyModal from "./modalcalling";

function App() {
  const [apiResponse, setApiResponse] = useState("");
  const [updateui,setUpdateUi] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState("");

  const updateUi = ()=>{
    setUpdateUi(!updateui);
  }

  const callAPI = () => {
    axios
      .get("http://localhost:8000/testapi")
      .then((response) => {
        console.log("Response:", response); 
        setApiResponse(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const dataUpdate = async (id) => {
    const currentId = id;
    console.log("current id : ", currentId);
    try {
      const response = await axios.get(`http://localhost:8000/testapi/${currentId}`);
      console.log("Update data:", response.data);
      setData(response.data)
      setShowModal(true)
      // Do something with the updated data, such as updating the UI
      updateUi(); // Assuming updateUi is a function passed as a prop to trigger a UI update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

  useEffect(() => {
    callAPI();
  }, [updateui]);

  console.log("response is", apiResponse);

  return (
    <div className="App">
        <MyModal updateUi={updateUi} setShowModal={setShowModal} showModal={showModal} data={data} setData={setData}/>
      {/* <Homepage updateUi={updateUi} /> */}
      <div className="secondContainer">
      {Array.isArray(apiResponse) && apiResponse.map((item) => {
        return <Person key={item.id} item={item} updateUi={updateUi} dataUpdate={dataUpdate}/>;
      })}
      </div>
    
    </div>
  );
  
}

export default App;
