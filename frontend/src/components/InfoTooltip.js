import React from "react";
import done from "../images/registDone.png";
import bad from "../images/registError.png";

function InfoTooltip(props) {
  return (
    <section className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__body">
        <button
          className="popup-close button"
          type="button"
          onClick={props.onClose}
        />
        <div className="form">
          <img
            className="regist-img"
            src={props.onError ? bad : done}
            alt="Результат регистрации"
          />
          <p className="regist-caption">
            {props.onError
              ? `Что-то пошло не так! Попробуйте еще раз`
              : `Вы успешно зарегистрировались`}
          </p>
        </div>
      </div>
    </section>
  );
}

export default InfoTooltip;
