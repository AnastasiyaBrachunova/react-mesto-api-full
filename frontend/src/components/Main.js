import React, { useContext } from "react";
import editAvatar from "../images/editAvatar.svg";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext.js";


function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="container">
      <section className="profile">
        <div
          className="profile__avatar-box"
          onClick={props.setIsEditAvatarPopupOpen}
        >
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <div className="profile__overlay">
            <div className="profile__overlay-background"></div>
            <img
              src={editAvatar}
              className="profile__change-avatar"
              alt="Фото профиля"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{`${currentUser.name}`}</h1>
          <button
            type="button"
            className="edit-button button"
            onClick={props.setIsEditProfilePopupOpen}
          />
          <p className="profile__job">{`${currentUser.about}`}</p>
        </div>
        <button
          type="button"
          className="add-button button"
          onClick={props.setIsAddPlacePopupOpen}
        />
      </section>
      <ul className="grid-gallery" id="grid-gallery">
        {props.cards && props.cards.length > 0 && props.cards.map((card) => (

          card && <Card
            key={card._id}
            card={card}
            onCardClick={(dataCard) => props.onCardClick(dataCard)}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </ul>
    </main>
  );
}

export default Main;
