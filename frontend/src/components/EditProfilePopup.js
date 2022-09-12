import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext.js";


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

 useEffect(() => { //подгружает данные с сервера сразу в фоорму
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

const handleSubmit =(event)=>{
  event.preventDefault();
  props.onUpdateUser({
    name,
    about: description,
  })
}

function handleChangeName(e) {
  setName(e.target.value);
}
function handleChangeDescription(e) {
  setDescription(e.target.value);
}
  return (
    <PopupWithForm
      name="profile"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      textButton = "Сохранить"
      textHeader = "Редактирвать профиль"
    >
      <input
        className="form__input-container form__input-container_name-info"
        id="name"
        type="text"
        name="userName"
        placeholder="Ваше имя"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
        value={name || ""}
        onChange={handleChangeName}

      />
      <span id="name-error" className="form__input-error name-error"/>
      <input
        className="form__input-container form__input-container_prof-info"
        id="prof-info"
        name="profInfo"
        type="text"
        placeholder="Род деятельности"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleChangeDescription}

      />
      <span
        id="prof-info-error"
        className="form__input-error prof-info-error"
      />
      
    </PopupWithForm>
  );
}

export default EditProfilePopup;
