function ImagePopup({ card, onClose }) {
  if (!card) return null;
  return (
    <div className={`popup ${card && "popup_opened popup_type_card"}`}>
      <figure className="popup__view-card">
        <button
          className="popup__close"
          onClick={onClose}
          type="button">
        </button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
