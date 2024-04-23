// import React, { useState } from 'react';
import Modal from './components/modal'; // Assuming the Modal component is in the same directory

export default function MyModal({updateUi, setShowModal, showModal, data, setData}) {


  const openModal = () => {
    setShowModal(true);
    setData("")
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>Add Costomer</button>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        updateUi={updateUi}
        data={data}
      />
    </div>
  );
}

