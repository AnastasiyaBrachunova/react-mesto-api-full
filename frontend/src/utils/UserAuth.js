export const BaseUrl = "https://api.abrachunova.front.nomoredomains.sbs";

const chekResponse = (res) => {
  if (res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BaseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ email, password }),
  }).then(chekResponse) 
};

export const autorize = (email, password) => {
  return fetch(`${BaseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ email, password }),
  })
  .then(chekResponse)
    .then((data) => {
      
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return {status: 'ok', data: data.token};
      } else {
        return;
      }
    })
 
};

export const checkToken = (token) => {
  return fetch(`${BaseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then(chekResponse)
    .then((data) => {return data})

};
