import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import FormWithAuth from "./FormWithAuth";
import { autorize, checkToken } from "../utils/UserAuth.js";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    autorize(email, password).then((res) => {
      if (res.status === "ok") {
    
        checkToken(res.data).then((res) => {
          if (res) {
            props.setCurrentUser(res);
            props.setLoggedIn(true);
            props.onInfoToolTip();
            history.push("/");  
          }
        });
      }
    }).catch((err) => {            
      props.onInfoToolTip(err);
      console.log("Ошибка авторизации");

      });
  };

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  return (
    <FormWithAuth
      title="Вход"
      textButton="Войти"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        className="form-auth__input-container form__input-container_email-info"
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        required
        value={email || ""}
        onChange={handleChangeEmail}
      />
      <span id="name-error" className="form__input-error email-error" />
      <input
        className="form-auth__input-container form__input-container_password-info"
        id="password"
        name="password"
        type="password"
        placeholder="Пароль"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        required
        value={password || ""}
        onChange={handleChangePassword}
      />
      <span
        id="prof-info-error"
        className="form__input-error password-info-error"
      />
    </FormWithAuth>
  );
}

export default Login;
