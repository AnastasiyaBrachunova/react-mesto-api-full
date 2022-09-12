import logo from "../images/logo.svg";
import { Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место" />
      <Route exact path="/">
        <div className="box-switch">
          <p className="box-switch_user-email">{`${props.email}`}</p>
          <button
            className="button box-switch_button"
            onClick={() => {
                props.setCurrentUser();

                localStorage.removeItem("jwt");
              
            }}
          >
            <Link className="box-switch_button" to="signin">
              Выйти
            </Link>
          </button>
        </div>
      </Route>
      <Route path="/signup">
        <Link className="box-switch_button" to="signin">
          Войти
        </Link>
      </Route>
      <Route path="/signin">
        <Link className="box-switch_button" to="signup">
          Регистрация
        </Link>
      </Route>
    </header>
  );
}

export default Header;
