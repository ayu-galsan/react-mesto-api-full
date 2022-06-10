import React, { useCallback } from "react";

function PopupWithForm({
  isOpen,
  name,
  onClose,
  title,
  children,
  onSubmit,
  buttonText = "Сохранить",
}) {
  
  const handleEscClose = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.addEventListener("keyup", handleEscClose);
    } else {
      document.removeEventListener("keyup", handleEscClose);
    }
  }, [handleEscClose, isOpen]);

  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          onClick={onClose}
          type="button"
        ></button>
        <h2 className="popup__heading">{title}</h2>
        <form
          className={`popup__form popup__form_type-${name}`}
          name={`information-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className="popup__submit-button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
