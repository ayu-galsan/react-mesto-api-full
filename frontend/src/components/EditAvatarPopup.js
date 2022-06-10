import React from "react";
import PopupWithForm from "./PopupWithForm";
import { pattern } from "../utils/constants";
import { adressErrorText } from "../utils/constants";

function EditAvatarPopup({onUpdateAvatar, isOpen, onClose, renderLoading, buttonText}) {
  const linkRef = React.useRef();
  const [value, setValue] = React.useState();
  const [isValid, setIsValid] = React.useState(false);
  const [linkErrorText, setLinkErrorText] = React.useState('');

  React.useEffect(() => {
    !pattern.test(value) ? setIsValid(false) : setIsValid(true)
  }, [value])

  React.useEffect(()=>{
    linkRef.current.value = '';
    setIsValid(true);
  },[isOpen]);

  function showErrorLink() {
    if(!pattern.test(value)) {
      setLinkErrorText(adressErrorText)
    } else {
      setLinkErrorText('')
    }
  }

  function handleChange(evt) {
    setValue(evt.target.value);
    showErrorLink()
  } 

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      link: linkRef.current.value
    });
    renderLoading(title => {
      return (buttonText=title)})
  } 

  return (
    <PopupWithForm 
      name="avatar" 
      title="Обновить аватар" 
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={buttonText}
    > 
      <input 
        className={`popup__input popup__input_el_link ${!isValid && 'popup__input_type_error'}`}
        value={value||''} 
        id="avatar-input" 
        name="link" 
        type="url" 
        required
        placeholder="Ссылка на картинку"  
        ref={linkRef} 
        onChange={handleChange} 
      />
      <span 
        className={`popup__error ${!isValid && 'popup__error_visible'}`}
        id="avatar-input-error"
        value={linkRef.value}>
        {linkErrorText}
      </span>
   </PopupWithForm>
)
}

export default EditAvatarPopup;