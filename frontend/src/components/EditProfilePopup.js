import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { lengthErrorText } from "../utils/constants";

function EditProfilePopup({
  onUpdateUser,
  renderLoading,
  buttonText,
  isOpen,
  onClose,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isValid, setIsValid] = React.useState(true);
  const [errorTextName, setErrorTextName] = React.useState("");
  const [errorTextDescription, setErrorTextDescription] = React.useState("");

  React.useEffect(() => {
    ((name.length < 1 || name.length > 41) ||
      (description.length < 1 || description.length > 201)) ?
    setIsValid(false) : setIsValid(true)
  }, [name, description])

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  function showErrorName() {
    if (name.length < 1) {
      setErrorTextName(lengthErrorText);
    } else {
      setErrorTextName("");
    }
  }

  function showErrorDescription() {
    if (description.length < 1) {
      setErrorTextDescription(lengthErrorText);
    } else {
      setErrorTextDescription("");
    }
  }

  function handleChangeName(e) {
    setName(e.target.value);
    showErrorName();
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    showErrorDescription();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
    renderLoading((title) => {
      return (buttonText = title);
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    >
      <input
        className={`popup__input popup__input_el_name ${
          !isValid && "popup__input_type_error"
        }`}
        id="name-input"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
        type="text"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />
      <span
        className={`popup__error ${!isValid && "popup__error_visible"}`}
        id="name-input-error"
        value={name.value}
      >
        {errorTextName}
      </span>
      <input
        className={`popup__input popup__input_el_job ${
          !isValid && "popup__input_type_error"
        }`}
        id="job-input"
        name="about"
        value={description || ""}
        onChange={handleChangeDescription}
        type="text"
        required
        placeholder="О себе"
        minLength="2"
        maxLength="200"
      />
      <span
        className={`popup__error ${!isValid && "popup__error_visible"}`}
        id="job-input-error"
        value={description.value}
      >
        {errorTextDescription}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
