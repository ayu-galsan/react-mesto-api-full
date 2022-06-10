import React from "react";
import PopupWithForm from "./PopupWithForm";
import { pattern } from "../utils/constants";
import { lengthErrorText } from "../utils/constants";
import { adressErrorText } from "../utils/constants";

function AddPlacePopup({onAddPlace, renderLoading, buttonText, isOpen, onClose}) {
  const [place, setPlace] = React.useState('');
  const [link, setlink] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [linkErrorText, setlinkErrorText] = React.useState('');
  
  React.useEffect(() => {
    (place.length < 1 || place.length > 30) ||
    !pattern.test(link) ?
      setIsValid(false) :
      setIsValid(true)
  }, [place, link])

  React.useEffect(() => {
    setPlace('');
    setlink(''); 
    setIsValid(true);
    setErrorText('');
    setlinkErrorText('') 
  }, [isOpen]);

  function showErrorPlace() {
    if (place.length < 1) {
      setErrorText(lengthErrorText)
    } else {
      setErrorText('');
    }
  }

  function showErrorLink() {
    if(!pattern.test(link)) {
      setlinkErrorText(adressErrorText)
    } else {
      setlinkErrorText('')
    }
  }

  function handleChangePlace(evt) {
    setPlace(evt.target.value);
    showErrorPlace();
  }

  function handleChangeLink(evt) {
    setlink(evt.target.value);
    showErrorLink();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      place,
      link,
    }); 
    renderLoading(title => {
      return (buttonText=title);
    })
  } 

  return (
    <PopupWithForm 
      name="add" 
      title="Новое место" 
      isOpen={isOpen}
      onClose={onClose}
      buttonText={buttonText}
      onSubmit={handleSubmit}
    >
      <input
        className={`popup__input popup__input_el_place ${!isValid && 'popup__input_type_error'}`}
        id="place-input" 
        name="place" 
        type="text" 
        value={place||""} 
        required
        placeholder="Название"
        minLength="2" maxLength="30"
        onChange={handleChangePlace} 
      />
      <span
        className={`popup__error ${!isValid && 'popup__error_visible'}`}
        id="place-input-error" 
        value={place.value} 
        onChange={showErrorPlace}>
          {errorText}
      </span>
      <input
        className= {`popup__input popup__input_el_link ${!isValid && 'popup__input_type_error'}`}
        id="url-input" 
        name="link"
        type="url" 
        value={link||""} 
        required
        placeholder="Ссылка на картинку" 
        onChange={handleChangeLink} 
      />
      <span 
        className={`popup__error ${!isValid && 'popup__error_visible'}`}
        id="url-input-error"
        value={link.value} 
        onChange={showErrorLink}> 
          {linkErrorText}
      </span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
