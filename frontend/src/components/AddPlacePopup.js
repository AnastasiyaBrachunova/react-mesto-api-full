import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [nameCard, setNameCard] = useState("");
  const [urlCard, setUrlCard] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onUpdatePlace({
      name: nameCard,
      link: urlCard,
    });
  };

  function handleChangeName(e) {
    setNameCard(e.target.value);
  }
  function handleChangeUrl(e) {
    setUrlCard(e.target.value);
  }

  useEffect(() => {
    setNameCard("");
    setUrlCard("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="travel"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      textButton="Новое место"
      textHeader="Создать"
    >
      <input
        className="form__input-container form__input-container_cardInfo"
        id="cardInfo"
        name="name"
        type="text"
        autoComplete="off"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={nameCard || ""}
        onChange={handleChangeName}
      />
      <span id="cardInfo-error" className="form__input-error cardInfo-error" />
      <input
        className="form__input-container form__input-container_urlInfo"
        id="urlInfo"
        name="link"
        type="url"
        autoComplete="off"
        placeholder="Ссылка на картинку"
        required
        value={urlCard || ""}
        onChange={handleChangeUrl}
      />
      <span id="urlInfo-error" className="form__input-error urlInfo-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
