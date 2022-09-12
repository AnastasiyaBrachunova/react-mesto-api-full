/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";


function FormWithAuth(props) {
  const location = window.location.pathname;
  return (
    <form className="form-auth" onSubmit={props.onSubmit}>
      <h2 className="form-auth__heading">{`${props.title}`}</h2>
      <>{props.children}</>
      <button
        className="form-auth__button-submit button"
        type="submit"
        value="Зарегистрироваться"
      >{`${props.textButton}`}</button>
      <p
        className={`form-auth__caption  ${
          location === '/signin' ? "form-auth__caption_hidden" : ""
        }`}
      >
        Уже зарегистрированы?{" "}
        <Link to="/signin" className={`form-auth__link  ${
          location === '/signin' ? "form-auth__link_hidden" : ""
        }`}>
          Войти
        </Link>
      </p>
    </form>
  );
}

export default FormWithAuth;

