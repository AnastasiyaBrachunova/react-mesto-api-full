import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatarChange"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      textButton="Обновить аватар"
      textHeader="Сохранить"
    >
      <input
        className="form__input-container form__input-container_urlInfo"
        id="avatar"
        name="avatar"
        type="url"
        autoComplete="off"
        placeholder="Ссылка на аватар"
        required
        ref={avatarRef}
      />
      <span id="avatar-error" className="form__input-error avatar-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
