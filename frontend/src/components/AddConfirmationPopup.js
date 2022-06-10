import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddConfirmationPopup({ onUpdateConfirmation, card, onClose, isOpen }) {
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateConfirmation(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      onClose={onClose}
      isOpen={isOpen}
      buttonText="Да"
      onSubmit={handleSubmit}>
    </PopupWithForm>
  );
}

export default AddConfirmationPopup;
