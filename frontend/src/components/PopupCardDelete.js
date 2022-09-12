import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupCardDelete(props) {
  return (
      <PopupWithForm
        name="cardDelete"
        title="Вы уверены?"
        textButton="Да"
        onClose={props.onClose}
        isOpen={props.isOpen}
      />
  );
}

export default PopupCardDelete;




