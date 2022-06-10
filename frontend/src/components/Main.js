import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Footer from "./Footer.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  cards,
  onCardClick,
  onCardLike,
  onCardConfirmation,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
            onClick={onEditAvatar}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            onClick={onEditProfile}
            type="button"
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          onClick={onAddPlace}
          type="button"
        ></button>
      </section>

      <div className="elements">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardConfirmation={onCardConfirmation}
          />
        ))}
      </div>
    </main>
    <Footer />
    </>
  );
}
export default Main;
