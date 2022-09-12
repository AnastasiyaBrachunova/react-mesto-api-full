class Api {
  constructor(config) {
    this.headers = config.headers;
    this.baseUrl = config.baseUrl;
  }

  _fetch(url, opt = {}) {
    return fetch(this.baseUrl + url, { headers: this.headers, ...opt }).then(
      (res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    );
  }

  setInitialCard(name, link) {
    return this._fetch(`/cards`, {
      method: `POST`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }
  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  // getInitialCards() {
  //   return this._fetch(`/cards`, {
  //     Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  //   });
    
  // }

  getInitialCards() {
    return this._fetch(`/cards`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
      }, method: 'GET'
    });
    
  }

  getUserInfo() { //получить данные
    return this._fetch(`/users/me`,{
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    });
  }

  setUserInfo(name, about) { //отправить данные
    return this._fetch(`/users/me`, {
      method: `PATCH`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  setUserAvatar(avatar) {
    return this._fetch(`/users/me/avatar`, {
      method: `PATCH`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
  }

  delInitialCards(del) {
    return this._fetch(`/cards/${del}`, {
      method: `DELETE`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        _id: del,
      }),
    });
  }

  changeLikeCardStatus( id, isLiked) {
    return this._fetch(`/cards/${id}/likes`, {
      method: `${isLiked ? "DELETE" : "PUT"}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
  }
}

export const api = new Api({
  baseUrl: "https://api.abrachunova.front.nomoredomains.sbs",
  headers: {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    "Content-Type": "application/json",
  },
});
