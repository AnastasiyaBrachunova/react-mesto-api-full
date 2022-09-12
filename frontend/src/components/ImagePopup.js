import React from "react";

function ImagePopup(props) {
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
        props.onClose();
    }
  }
  //Модальное окно увеличения картинки
  return (
    <div
      className={`popup popup_dark-background ${
        props.isOpen ? "popup_opened" : ""
      }`}
      id="zoomPic"
      onClick={handleOverlay}

    >
      <div className="popup__pic">
        <div className="popup__body">
          <button
            className="popup-close popup-close_pic button"
            id="closePic"
            type="button"
            onClick={() => props.onClose()}
          />
          <img className="popup__zoom-pic" src={props.card.link} alt={props.card.name} />
        </div>
        <p className="popup__capture">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
