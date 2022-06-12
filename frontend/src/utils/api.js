import { serverUrl } from "./constants";
import { getToken } from "./token";

class Api {
  constructor( address ) {
    this.address = address
  }

  getInitialCards() {
    return fetch(`${this.address}/cards`, {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => this._getResponseData(res))
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: {
        authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this.address}/cards/${id}/likes`, {
      method,
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => this._getResponseData(res))
  }

    deleteCard(id) {
    return fetch(`${this.address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    })
      .then(res => this._getResponseData(res))
  }

  editProfile(data) {
    return fetch(`${this.address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }
    )
      .then(res => this._getResponseData(res))
  }

  editAvatar(data) {
    return fetch(`${this.address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.link
      })
    }
    )
      .then(res => this._getResponseData(res))
  }

  addNewCard(data) {
    return fetch(`${this.address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.place,
        link: data.link
      })
    }
    )
      .then(res => this._getResponseData(res))
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

const api = new Api(serverUrl);

export default api;