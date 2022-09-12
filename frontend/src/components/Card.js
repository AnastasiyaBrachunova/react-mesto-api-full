import React, { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(props) {
  const handleCardClick = () => {
    props.onCardClick(props.card);
  };

  const handleLikeClick  = () => {
    props.onCardLike(props.card);
  };

  const handleDeleteClick = () =>{
    props.onCardDelete(props.card)
  }
  
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const cardDeleteButtonClassName =
    `card__delete button ${isOwn ? "card__delete" : "card__delete_hidden"}`;

  const isLiked = props.card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `button-like button ${
    isLiked ? "button-like_active" : "button-like"
  }`;

  return (
    <li className="card">
      <img
        className="card__pic card_smallPic  button"
        src={props.card.link}
        alt={props.card.name}
        name="cardPic"
        onClick={() => handleCardClick()}
      />

      <button
        className={cardDeleteButtonClassName} 
        id="card__delete"
        type="button"
        onClick={()=>handleDeleteClick()}
      />

      <div className="card__item">
        <h2 className="card__caption card_description" id="card__caption">
          {props.card.name}
        </h2>

        <div className="card__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={() => handleLikeClick()}
          />

          <p className="card__count-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
