import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardConfirmation}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete" : "element__delete_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : "element__like"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleAddConfirmation() {
    onCardConfirmation();
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleAddConfirmation}
        type="button">
      </button>
      <div className="element__container">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__likegroup">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button">
          </button>
          <p className="element__likesCount">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
