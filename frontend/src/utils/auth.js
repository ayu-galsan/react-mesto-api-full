export const BASE_URL = "https://api.domenname.students.nomoreparties.sbs";

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then(checkResponse)
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
    .then(checkResponse)
}

export function getContent(token) {
  return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(checkResponse)
}