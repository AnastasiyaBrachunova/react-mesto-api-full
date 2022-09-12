import React, { useEffect } from "react";

function PopupWithForm(props) {
  useEffect(() => {
    if (!props.isOpen) return;
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [props]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      props.onClose();
    }
  };

  return (
    <section
      className={`popup popup_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={handleOverlay}
    >
      <div className="popup__body">
        <button
          className="popup-close button"
          type="button"
          onClick={props.onClose}
        ></button>
        <form className="form" name={`${props.name}`} onSubmit={props.onSubmit}>
          <h2 className="form__heading">{`${props.textHeader}`}</h2>

          <>{props.children}</>
          <button
            className="form__button-submit button"
            type="submit"
            value="Сохранить"
          >
           {`${props.textButton}`}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
