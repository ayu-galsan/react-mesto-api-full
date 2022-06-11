class Api {
  constructor({ address, headers }) {
    this.address = address
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this.address}/cards`, {
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  }

  getUserData() {
    return fetch(`${this.address}/users/me`, {
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? 'DELETE' : 'PUT';
    return fetch(`${this.address}/cards/${id}/likes`, {
      method,
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  }

    deleteCard(id) {
    return fetch(`${this.address}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._getResponseData(res))
  }

  editProfile(data) {
    return fetch(`${this.address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
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
      headers: this._headers,
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
      headers: this._headers,
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

const api = new Api({
  address: "http://localhost:3001",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }
})

export default api;