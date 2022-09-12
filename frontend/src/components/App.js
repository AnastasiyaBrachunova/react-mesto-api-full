import React, { useEffect, useState } from "react";
import "../index.css";
import { api } from "../utils/Api";
import { Route, Switch, useHistory } from "react-router-dom";

import InfoTooltip from "./InfoTooltip.js";
import Header from "./Header.js";

import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import PopupCardDelete from "./PopupCardDelete";
import Login from "./Login.js";
import Register from "./Register.js";
import PageNotFound from "./PageNotFound.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { checkToken, register } from "../utils/UserAuth.js";

import { CurrentUserContext } from "../context/CurrentUserContext.js";

function App() {
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoToolTip, setIsInfoToolTip] = useState(false); //открытие модалки ответа решистрации
  const [errorInfoToolTip, setErrorInfoToolTip] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  useEffect(() => {

  const token = localStorage.getItem("jwt");
    token && checkToken(token).then((res) => {
        if (res) {
          setCurrentUser(res);
          setLoggedIn(true);
          history.push("/");
        } else {
          history.push("/singin");
        }
      }).catch((err) => console.log("Ошибка получения токена"));

  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (loggedIn) {
      // api
      //   .getUserInfo(token)
      //   .then((res) => {
      //     setCurrentUser(res);
      //   })
      //   .catch((err) => console.log("Ошибка получения данных пользователя"));

      api
        .getInitialCards(token)
        .then((cardsData) => {
          setCards(cardsData);
        })
        .catch((err) => console.log("Ошибка получения массива карточек"));
    }
  }, [loggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const openInfoToolTip = (err) => {
    setIsInfoToolTip(true);
    setErrorInfoToolTip(err);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
    setIsInfoToolTip(false);
  };

  const handleUpdateUser = (infoUser) => {
    api
      .setUserInfo(infoUser.name, infoUser.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка получения данных пользователя"));
  };

  const handleAddPlaceSubmit = (image) => {
    api
      .setInitialCard(image.name, image.link)
      .then((newCard) => {
        if (newCard) {
          setCards([newCard, ...cards]);
          closeAllPopups();
        }
      })
      .catch((err) => console.log("Ошибка добавления карточки"));
  };

  const handleUpdateAvatar = (infoAvatar) => {
    api
      .setUserAvatar(infoAvatar.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log("Ошибка получения аватара"));
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log("Ошибка получения состояния лайка"));
  }

  function handleCardDelete(card) {
    api
      .delInitialCards(card._id) // удаляю карточку на сервере
      .then(() => {
        setCards(
          (cards) => cards.filter((c) => c._id !== card._id) // рисую новый массив методом фильтр
        );
      })
      .catch((err) => console.log("Ошибка удаления карточки"));
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          email={currentUser.email}
          setCurrentUser={() => setCurrentUser({})}
        />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            setIsEditProfilePopupOpen={() => handleEditProfileClick()}
            setIsAddPlacePopupOpen={() => handleAddPlaceClick()}
            setIsEditAvatarPopupOpen={() => handleEditAvatarClick()}
            onCardClick={(dataCard) => {
              setSelectedCard({ name: dataCard.name, link: dataCard.link });
            }}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/signin">
            <Login
              setLoggedIn={(value) => setLoggedIn(value)}
              setCurrentUser={(value) => setCurrentUser(value)}
              onInfoToolTip={openInfoToolTip}
            />
          </Route>

          <Route path="/signup">
            <Register onInfoToolTip={openInfoToolTip} />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>

        <Footer />

        <ImagePopup
          card={selectedCard}
          isOpen={selectedCard.link.length > 0}
          onClose={() => closeAllPopups()}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={() => closeAllPopups()}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={() => closeAllPopups()}
          onUpdatePlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={() => closeAllPopups()}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoToolTip}
          onClose={() => closeAllPopups()}
          onError={errorInfoToolTip}
        />
        <PopupCardDelete />
        {/* <PopupRegist/> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
